"""Sinh User Story Map (HTML + PNG) từ 03_User_Story/01_Product-Backlog.md.
Hàng ngang = Epic theo hành trình nghiệp vụ; hàng dọc = Release (MVP Must · MVP Should · V2)."""
import html
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "03_User_Story/01_Product-Backlog.md"
OUT_HTML = ROOT / "03_User_Story/02_User-Story-Map.html"
OUT_PNG = ROOT / "03_User_Story/02_User-Story-Map.png"
JOURNEY = ["EP-07", "EP-01", "EP-02", "EP-04", "EP-05", "EP-03", "EP-06", "EP-08", "EP-09", "EP-10"]
LANES = [("MVP · Must", lambda r: r["rel"] == "MVP" and r["pri"] == "Must"),
         ("MVP · Should", lambda r: r["rel"] == "MVP" and r["pri"] == "Should"),
         ("V2", lambda r: r["rel"] == "V2")]

text = SRC.read_text(encoding="utf-8")
epics = {}
for line in text.splitlines():
    m = re.match(r"\| (EP-\d\d) \| ([^|]+) \| ([^|]+) \|", line)
    if m:
        epics[m[1]] = (m[2].strip(), m[3].strip())
stories = []
for line in text.splitlines():
    if re.match(r"\| US-\d\d \|", line):
        c = [x.strip() for x in line.split("|")[1:-1]]
        stories.append(dict(id=c[0], role=c[1], want=c[2], epic=c[4], sub=c[5], pri=c[8], rel=c[9],
                            sprint=c[10]))

cols = "".join(f'<div class="ep"><b>{e}</b>{html.escape(epics[e][0])}<small>{html.escape(epics[e][1])}</small></div>'
               for e in JOURNEY)
rows = ""
for name, pick in LANES:
    cells = ""
    for e in JOURNEY:
        cards = "".join(
            f'<div class="us {"v2" if s["rel"] == "V2" else ""}"><b>{s["id"]}</b>{html.escape(s["want"])}'
            f'<small>{html.escape(s["role"])}{" · " + s["sprint"] if s["sprint"] != "—" else ""}</small></div>'
            for s in stories if s["epic"] == e and pick(s))
        cells += f'<div class="cell">{cards}</div>'
    rows += f'<div class="lane"><div class="ln">{name}</div>{cells}</div>'

page = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>User Story Map — HL-OMS</title>
<style>
:root{{--ink:#1f2937;--muted:#6b7280;--line:#e5e7eb;--soft:#f6f4f1;--acc:#b4451f;--accs:#fbeee8}}
body{{margin:0;background:#fff;color:var(--ink);font:12px/1.35 "Segoe UI",system-ui,sans-serif}}
.wrap{{padding:28px;width:max-content}}
h1{{font-size:22px;margin:0 0 4px}} p{{margin:0 0 18px;color:var(--muted)}}
.grid{{display:grid;grid-template-columns:110px repeat({len(JOURNEY)},170px);gap:8px}}
.ep{{background:var(--ink);color:#fff;border-radius:6px;padding:8px 10px;font-weight:600}}
.ep b{{display:block;font-size:10px;opacity:.7}} .ep small{{display:block;font-weight:400;opacity:.75;margin-top:2px}}
.lane{{display:contents}} .ln{{font-weight:700;color:var(--acc);padding-top:8px;border-top:2px solid var(--acc)}}
.cell{{border-top:2px solid var(--line);padding-top:8px;display:flex;flex-direction:column;gap:6px}}
.us{{background:var(--accs);border-left:3px solid var(--acc);border-radius:4px;padding:6px 8px}}
.us.v2{{background:var(--soft);border-left-color:#9ca3af}}
.us b{{display:block;font-size:10px;color:var(--acc)}} .us.v2 b{{color:var(--muted)}}
.us small{{display:block;color:var(--muted);margin-top:3px}}
</style></head><body><div class="wrap">
<h1>User Story Map — HL-OMS</h1>
<p>Hành trình nghiệp vụ từ trái sang phải · Release từ trên xuống · Nguồn: Product Backlog 1.0 (10/11/2026)</p>
<div class="grid"><div></div>{cols}{rows}</div></div></body></html>"""
OUT_HTML.write_text(page, encoding="utf-8", newline="\n")

from playwright.sync_api import sync_playwright  # noqa: E402

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome")
    pg = b.new_page(viewport={"width": 1960, "height": 900}, device_scale_factor=1.5)
    pg.goto(OUT_HTML.as_uri())
    pg.locator(".wrap").screenshot(path=str(OUT_PNG))
    b.close()
print(f"Đã ghi {OUT_HTML.name}, {OUT_PNG.name}: {len(stories)} story")
