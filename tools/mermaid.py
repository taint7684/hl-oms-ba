"""Render sơ đồ Mermaid (.mmd) ra SVG + PNG bằng Chrome headless và mermaid@11.4.1.
Dùng: python tools/mermaid.py <thư mục hoặc file .mmd> ..."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
CDN = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"
CONFIG = """{startOnLoad:false, theme:'base', fontFamily:'Segoe UI, Arial, sans-serif',
 themeVariables:{primaryColor:'#fbeee8', primaryBorderColor:'#b4451f', primaryTextColor:'#1f2937',
 lineColor:'#1f2937', secondaryColor:'#f6f4f1', tertiaryColor:'#ffffff', fontSize:'15px',
 noteBkgColor:'#f6f4f1', noteBorderColor:'#d1d5db'},
 state:{nodeSpacing:46, rankSpacing:52}, flowchart:{nodeSpacing:36, rankSpacing:48, curve:'basis'}}"""


def render_all(files):
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome")
        pg = br.new_page(device_scale_factor=2)
        pg.set_content(f"<body style='margin:0;background:#fff'><div id=o></div><script src='{CDN}'></script></body>")
        pg.wait_for_function("typeof window.mermaid !== 'undefined'")
        pg.evaluate(f"mermaid.initialize({CONFIG})")
        for f in files:
            code = f.read_text(encoding="utf-8")
            svg = pg.evaluate("async c => (await mermaid.render('g' + Date.now(), c)).svg", code)
            f.with_suffix(".svg").write_text(svg, encoding="utf-8", newline="\n")
            pg.evaluate("s => { document.getElementById('o').innerHTML = s }", svg)
            pg.set_viewport_size({"width": 2400, "height": 1600})
            pg.locator("#o svg").screenshot(path=str(f.with_suffix(".png")))
            print(f"{f.name} → svg, png")
        br.close()


if __name__ == "__main__":
    targets = []
    for a in sys.argv[1:]:
        p = Path(a)
        targets += sorted(p.glob("*.mmd")) if p.is_dir() else [p]
    render_all(targets)
