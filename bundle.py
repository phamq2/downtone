#!/usr/bin/env python3
"""Bundle src/ into a single self-contained index.html at the repo root.

Inlines:
- CSS files into <style> blocks (with font url(...) refs replaced by base64 data URIs)
- JSX files into <script type="text/babel"> blocks (with asset refs swapped to data URIs)
- Logo SVG and referenced images as base64 data URIs (posters-collage downscaled via sips)
- Concept PDF as base64 (so the "Concept Deck" link works in a fully self-contained file)
"""
import base64
import mimetypes
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "index.html"

# Cache for compressed image versions so we don't re-encode per call site.
_compressed_cache = {}
JSX_FILES = ["data.jsx", "hero.jsx", "sections-mid.jsx", "sections-bottom.jsx", "page.jsx"]


def downscale_jpeg(src_path, max_dim):
    """Use macOS sips to produce a downscaled JPEG in /tmp. Returns the new Path."""
    key = (str(src_path), max_dim)
    if key in _compressed_cache:
        return _compressed_cache[key]
    tmp = Path(tempfile.mkstemp(suffix=".jpg")[1])
    subprocess.run(
        ["sips", "--resampleHeightWidthMax", str(max_dim),
         "-s", "format", "jpeg", "-s", "formatOptions", "82",
         str(src_path), "--out", str(tmp)],
        check=True, capture_output=True
    )
    _compressed_cache[key] = tmp
    return tmp


# rel path -> (mime, optional max-dim for downscaling). PDFs and SVGs use their raw bytes.
# Downscaling only happens if the source jpeg is > 2MB; otherwise the re-encode bloats it.
INLINE_ASSETS = {
    "assets/Downtone-logo-white.svg":      ("image/svg+xml",   None),
    "assets/photos/venue-frontage.jpg":    ("image/jpeg",      None),
    "assets/map-nyc.jpg":                  ("image/jpeg",      None),
    "assets/posters-collage.jpg":          ("image/jpeg",      2400),
    "assets/Downtone-Concept.pdf":         ("application/pdf", None),
}


def b64_data_uri(path, mime=None):
    mime = mime or mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def resolve_asset(rel):
    """Return (path, mime) for an inlined asset, downscaling jpegs when configured."""
    mime, max_dim = INLINE_ASSETS[rel]
    raw = SRC / rel
    if max_dim and raw.suffix.lower() in (".jpg", ".jpeg"):
        return downscale_jpeg(raw, max_dim), mime
    return raw, mime


def inline_font_urls(css):
    def repl(match):
        rel = match.group(1)
        font_path = SRC / rel
        if not font_path.exists():
            return match.group(0)
        return f"url('{b64_data_uri(font_path)}')"
    return re.sub(r"url\(['\"]?(fonts/[^'\")]+)['\"]?\)", repl, css)


def inline_asset_urls(text):
    """Replace url('assets/X') with data URI for assets in INLINE_ASSETS."""
    def repl(match):
        quote = match.group(1)
        rel = match.group(2)
        if rel not in INLINE_ASSETS:
            return match.group(0)
        path, mime = resolve_asset(rel)
        return f"url({quote}{b64_data_uri(path, mime)}{quote})"
    return re.sub(r"url\((['\"]?)(assets/[^'\")]+)\1\)", repl, text)


def inline_href_assets(text):
    """Replace href="assets/X" with a JS expression that reads from a global asset
    table, so duplicate references (multiple hero variants) don't bloat the bundle."""
    def repl(match):
        rel = match.group(1)
        if rel not in INLINE_ASSETS:
            return match.group(0)
        return f'href={{window.__DT_ASSETS["{rel}"]}}'
    return re.sub(r'href="(assets/[^"]+)"', repl, text)


def build_asset_table_script():
    """Emit one <script> that defines window.__DT_ASSETS once, but only for assets
    referenced via href in the JSX (currently the Concept PDF, referenced in two
    hero variants). url(...) refs continue to inline directly — they tend to be
    unique per file, so deduping them isn't worth the string-concat gymnastics."""
    href_used = set()
    for jsx_name in JSX_FILES:
        text = (SRC / jsx_name).read_text()
        for rel in re.findall(r'href="(assets/[^"]+)"', text):
            if rel in INLINE_ASSETS:
                href_used.add(rel)
    entries = []
    for rel in href_used:
        mime, _ = INLINE_ASSETS[rel]
        path, _ = resolve_asset(rel)
        uri = b64_data_uri(path, mime)
        entries.append(f'"{rel}":"{uri}"')
    return "<script>window.__DT_ASSETS={" + ",".join(entries) + "};</script>"


def read_css(name):
    raw = (SRC / name).read_text()
    return inline_asset_urls(inline_font_urls(raw))


def read_jsx(name):
    raw = (SRC / name).read_text()
    return inline_href_assets(inline_asset_urls(raw))


# Build the HTML
parts = []
parts.append("""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Downtone — Investor Brief</title>
<style>
html, body { margin: 0; padding: 0; height: 100%; background: #0F0F0F; }
body { font-family: 'Outfit', system-ui, sans-serif; color: #F5F1EA; overflow: hidden; }
#root { width: 100vw; height: 100vh; }
</style>""")

for css_name in ["colors_and_type.css", "page.css"]:
    parts.append(f"<style>\n{read_css(css_name)}\n</style>")

parts.append("""<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin></script>
</head>
<body>
<div id="root"></div>""")

parts.append(build_asset_table_script())

for jsx_name in JSX_FILES:
    parts.append(f'<script type="text/babel" data-presets="env,react">\n{read_jsx(jsx_name)}\n</script>')

parts.append("""<script type="text/babel" data-presets="env,react">
ReactDOM.createRoot(document.getElementById("root")).render(
  <DTPage variant="editorial" colorPair="black-amber" />
);
</script>
</body>
</html>""")

OUT.write_text("\n".join(parts))
print(f"Wrote {OUT} ({OUT.stat().st_size / 1024 / 1024:.1f} MB)")
