"""Ghép ảnh bìa README (docs/banner.png) từ ảnh chụp màn hình prototype."""
import sys
from pathlib import Path

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
S = ROOT / "07_UIUX/screens"


def fit(name, h):
    im = Image.open(S / name).convert("RGB")
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)


c = Image.new("RGB", (2400, 1100), (239, 236, 231))
kds = fit("SCR-07_kds.png", 620)
c.paste(kds, (60, 60))
bill = fit("SCR-11_bill-thanh-toan.png", 380)
c.paste(bill, (60, 700))
rep = fit("SCR-15_bao-cao.png", 380)
c.paste(rep.crop((0, 0, min(rep.width, kds.width - bill.width - 40), 380)), (60 + bill.width + 40, 700))
x = 60 + kds.width + 60
p1, p2 = fit("SCR-02_so-do-ban.png", 980), fit("SCR-04_chi-tiet-mon.png", 980)
c.paste(p1, (x, 60))
c.paste(p2, (x + p1.width + 40, 60))
c = c.crop((0, 0, min(2400, x + p1.width + 40 + p2.width + 60), 1100))
(ROOT / "docs").mkdir(exist_ok=True)
c.save(ROOT / "docs/banner.png", optimize=True)
print(f"docs/banner.png {c.size}")
