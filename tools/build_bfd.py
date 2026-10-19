"""Sinh Business Function Diagram (SVG + PNG) từ bảng Function & Feature List."""
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from bpmn_kit import ACC, ACC_SOFT, FONT, INK, LINE, _wrap

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "06_Function_Feature_State/01_Function-Feature-List.md"
OUT = ROOT / "06_Function_Feature_State/diagrams"

tree = []
for line in SRC.read_text(encoding="utf-8").splitlines():
    m = re.match(r"\| (F-\d\d(?:\.\d)?) \| ([^|]+) \|", line)
    if not m:
        continue
    fid, name = m[1], m[2].replace("**", "").strip()
    if "." in fid:
        tree[-1][2].append((fid, name))
    else:
        tree.append((fid, name, []))

CW, GAP, PH, CH, VG = 176, 18, 58, 46, 12
W = len(tree) * CW + (len(tree) + 1) * GAP
top_y, par_y = 30, 130
rows = max(len(c) for _, _, c in tree)
H = par_y + PH + 30 + rows * (CH + VG) + 30
s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{FONT}">',
     f'<rect width="{W}" height="{H}" fill="#fff"/>']
rw = 260
rx = (W - rw) / 2
s.append(f'<rect x="{rx}" y="{top_y}" width="{rw}" height="56" rx="8" fill="{INK}"/>')
s.append(f'<text x="{W / 2}" y="{top_y + 25}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">HL-OMS</text>')
s.append(f'<text x="{W / 2}" y="{top_y + 44}" text-anchor="middle" font-size="11" fill="#d1d5db">Order Management System</text>')
bus_y = par_y - 22
first_cx = GAP + CW / 2
last_cx = GAP + (len(tree) - 1) * (CW + GAP) + CW / 2
s.append(f'<line x1="{W / 2}" y1="{top_y + 56}" x2="{W / 2}" y2="{bus_y}" stroke="{INK}" stroke-width="1.4"/>')
s.append(f'<line x1="{first_cx}" y1="{bus_y}" x2="{last_cx}" y2="{bus_y}" stroke="{INK}" stroke-width="1.4"/>')
for i, (fid, name, children) in enumerate(tree):
    x = GAP + i * (CW + GAP)
    cx = x + CW / 2
    s.append(f'<line x1="{cx}" y1="{bus_y}" x2="{cx}" y2="{par_y}" stroke="{INK}" stroke-width="1.4"/>')
    s.append(f'<rect x="{x}" y="{par_y}" width="{CW}" height="{PH}" rx="7" fill="{ACC}"/>')
    s.append(f'<text x="{cx}" y="{par_y + 22}" text-anchor="middle" font-size="10" font-weight="700" fill="#fde7dd">{fid}</text>')
    s.append(f'<text x="{cx}" y="{par_y + 41}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#fff">{escape(name)}</text>')
    rail = x + 14
    y = par_y + PH + 22
    s.append(f'<line x1="{rail}" y1="{par_y + PH}" x2="{rail}" y2="{y + (len(children) - 1) * (CH + VG) + CH / 2}" stroke="{LINE}" stroke-width="1.6"/>')
    for cid, cname in children:
        bx = rail + 12
        bw = CW - (bx - x)
        s.append(f'<line x1="{rail}" y1="{y + CH / 2}" x2="{bx}" y2="{y + CH / 2}" stroke="{LINE}" stroke-width="1.6"/>')
        s.append(f'<rect x="{bx}" y="{y}" width="{bw}" height="{CH}" rx="6" fill="{ACC_SOFT}" stroke="#f1c8b8"/>')
        lines = _wrap(cname, 22)
        s.append(f'<text x="{bx + 8}" y="{y + 13}" font-size="9" font-weight="700" fill="{ACC}">{cid}</text>')
        for j, ln in enumerate(lines[:2]):
            s.append(f'<text x="{bx + 8}" y="{y + 27 + j * 12}" font-size="10.5" fill="{INK}">{escape(ln)}</text>')
        y += CH + VG
s.append("</svg>")
svg = "\n".join(s)
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "BFD.svg").write_text(svg, encoding="utf-8", newline="\n")

from playwright.sync_api import sync_playwright  # noqa: E402

with sync_playwright() as pw:
    br = pw.chromium.launch(channel="chrome")
    pg = br.new_page(viewport={"width": int(W), "height": int(H)}, device_scale_factor=2)
    pg.set_content(f"<body style='margin:0'>{svg}</body>")
    pg.locator("svg").screenshot(path=str(OUT / "BFD.png"))
    br.close()
print(f"BFD: {len(tree)} cha, {sum(len(c) for _, _, c in tree)} con")
