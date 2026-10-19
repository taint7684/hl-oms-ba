"""Chạy thử prototype end-to-end bằng Chrome headless và chụp ảnh 19 màn hình vào 07_UIUX/screens/.
Thoát ≠ 0 nếu có lỗi JavaScript hoặc một bước kiểm không đạt."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
URL = (ROOT / "07_UIUX/prototype/index.html").as_uri()
OUT = ROOT / "07_UIUX/screens"
OUT.mkdir(parents=True, exist_ok=True)
errors, checks = [], []


def check(name, ok):
    checks.append((name, bool(ok)))
    print(("PASS " if ok else "FAIL ") + name)


def shot(pg, name, sel=".stage > div"):
    pg.wait_for_timeout(250)
    pg.evaluate("document.getElementById('toasts').innerHTML=''")
    pg.locator(sel).first.screenshot(path=str(OUT / f"{name}.png"))


def login(pg, app, user):
    pg.goto(f"{URL}#/{app}/")
    pg.wait_for_selector(".pin")
    pg.click(f'[data-act="pickuser"][data-u="{user}"]')
    for k in "1234":
        pg.click(f'.pin [data-k="{k}"]')
    pg.wait_for_timeout(200)


with sync_playwright() as p:
    br = p.chromium.launch(channel="chrome")
    pg = br.new_page(viewport={"width": 1440, "height": 980}, device_scale_factor=1.5)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("dialog", lambda d: d.accept("Khách test") if d.type == "prompt" else d.accept())
    pg.goto(URL)
    pg.evaluate("localStorage.clear()")
    pg.goto(URL + "#/waiter/tables")
    shot(pg, "SCR-01_dang-nhap")

    # Phục vụ: mở bàn, gọi món, khai báo dị ứng, gửi bếp
    login(pg, "waiter", "minh.dang")
    pg.goto(URL + "#/waiter/tables")
    shot(pg, "SCR-02_so-do-ban")
    pg.click('[data-act="table"][data-t="T01"]')
    pg.click('[data-act="open"]')
    pg.wait_for_selector('[data-in="q"]')
    pg.fill('[data-in="q"]', "pho bo")
    check("Tìm không dấu 'pho bo' ra Phở bò", pg.locator(".dish").count() >= 2)
    pg.click('[data-act="dish"][data-m="M17"] >> nth=0')
    pg.click('[data-act="sheet-add"]')
    check("Thiếu tùy chọn bắt buộc bị chặn (EF-02)", pg.locator(".sheetwrap").count() == 1)
    pg.click('[data-act="mod"][data-g="SIZE"][data-k="1"]')
    pg.click('[data-act="alg"][data-a="PEA"]')
    pg.fill("#note", "Ít hành")
    shot(pg, "SCR-04_chi-tiet-mon")
    pg.click('[data-act="sheet-add"]')
    pg.fill('[data-in="q"]', "")
    pg.click('[data-act="cat"][data-c="C9"]')
    pg.click('[data-act="quick"][data-m="M66"]')
    pg.click('[data-act="quick"][data-m="M66"]')
    shot(pg, "SCR-03_goi-mon")
    pg.click(".dock a")
    shot(pg, "SCR-05_don-cua-ban")
    pg.click('[data-act="send"]')
    st = pg.evaluate("Object.values(S.orders).find(o=>o.table==='T01').items.map(i=>i.status)")
    check("Gửi bếp: mọi món chuyển Chờ nấu", st and all(s == "QUEUED" for s in st))

    # Bếp: dị ứng chặn nấu, xác nhận, chuyển trạng thái
    login(pg, "kds", "khoa.le")
    pg.goto(URL + "#/kds/HOT")
    oid = pg.evaluate("Object.values(S.orders).find(o=>o.table==='T01').id")
    iid = pg.evaluate(f"S.orders['{oid}'].items.find(i=>i.menuId==='M17').id")
    pg.click(f'[data-act="kitem"][data-i="{iid}"]')
    check("BR-04: chưa đọc dị ứng thì không nấu được",
          pg.evaluate(f"S.orders['{oid}'].items.find(i=>i.id==='{iid}').status") == "QUEUED")
    shot(pg, "SCR-07_kds")
    pg.click(f'[data-act="ack"][data-i="{iid}"]')
    pg.click(f'[data-act="kitem"][data-i="{iid}"]')
    pg.click(f'[data-act="kitem"][data-i="{iid}"]')
    check("Món chuyển Sẵn sàng", pg.evaluate(f"S.orders['{oid}'].items.find(i=>i.id==='{iid}').status") == "READY")
    check("Phục vụ nhận thông báo món sẵn sàng",
          pg.evaluate("S.notes.some(n=>n.to==='minh.dang' && n.table==='T01' && !n.done)"))
    pg.goto(URL + "#/waiter/notify")
    shot(pg, "SCR-06_thong-bao")

    # Bếp trưởng: tổng hợp, báo hết món
    pg.goto(URL + "#/kds/HOT")
    pg.click('[data-act="lock"]')
    login(pg, "kds", "hung.tran")
    pg.goto(URL + "#/kds/chef")
    shot(pg, "SCR-08_tong-hop-bep")
    pg.click('[data-act="soldout-set"][data-m="M18"]')
    check("BR-01: món Hết bị chặn", pg.evaluate("!canOrder('M18')"))

    # Quản lý: duyệt hủy món T14
    login(pg, "manager", "linh.nguyen")
    pg.goto(URL + "#/manager/approvals")
    shot(pg, "SCR-14_duyet-yeu-cau")
    pg.click('[data-act="appr"][data-d="APPROVED"] >> nth=0')
    check("Duyệt hủy: món T14 → Đã hủy",
          pg.evaluate("Object.values(S.orders).find(o=>o.table==='T14').items.some(i=>i.menuId==='M54' && i.status==='CANCELLED')"))
    for v, n in [("menu", "SCR-13_quan-ly-menu"), ("reports", "SCR-15_bao-cao"), ("settings", "SCR-18_cau-hinh")]:
        pg.goto(URL + f"#/manager/{v}")
        shot(pg, n)
    pg.goto(URL + "#/manager/menu")
    pg.click('[data-act="medit"][data-m="M17"]')
    pg.wait_for_selector(".mbox")
    shot(pg, "SCR-13b_sua-mon", ".mbox")
    pg.click('[data-act="mclose"]')

    # Thu ngân: ngày lễ, giảm giá cần duyệt, tách bill chia đều, tiền mặt
    login(pg, "cashier", "thu.bui")
    t07 = pg.evaluate("S.tables.T07.order")
    pg.goto(URL + f"#/cashier/bill/{t07}")
    pg.click('[data-act="tg"][data-k="holiday"]')
    c = pg.evaluate(f"calc(S.orders['{t07}'])")
    check("BR-10: phụ thu 15% trên (tạm tính − giảm giá)", c["sur"] == round(c["sub"] * 0.15))
    check("BR-09: GST = Tổng ÷ 11", c["gst"] == round(c["total"] / 11))
    shot(pg, "SCR-11_bill-thanh-toan")
    pg.click('[data-act="disc"]')
    pg.select_option("#dt", "PCT")
    pg.fill("#dv", "15")
    pg.click('[data-act="disc-do"]')
    check("BR-11: giảm 15% chờ Quản lý duyệt", pg.evaluate(f"S.orders['{t07}'].discount.status") == "PENDING")
    pg.click('[data-act="disc"]')
    pg.click('[data-act="disc-clear"]')
    pg.click('[data-act="disc"]')
    pg.fill("#dv", "10")
    pg.click('[data-act="disc-do"]')
    check("BR-11: giảm 10% áp ngay", pg.evaluate(f"S.orders['{t07}'].discount.status") == "APPLIED")
    pg.goto(URL + f"#/cashier/split/{t07}")
    pg.click('[data-act="smode"][data-m="EQUAL"]')
    pg.click('[data-act="sn"][data-d="1"]')
    parts = pg.evaluate(f"splitAmounts(S.orders['{t07}']).map(p=>p.total)")
    total = pg.evaluate(f"calc(S.orders['{t07}']).total")
    check("BR-14: tổng 3 phần = tổng bill, phần cuối nhận số lẻ", sum(parts) == total and len(parts) == 3)
    shot(pg, "SCR-10_tach-bill")
    for k in range(3):
        pg.click(f'[data-act="paypart"][data-k="{k}"]')
        pg.click('[data-act="pm"][data-m="CASH"]')
        pg.click('[data-act="quickcash"][data-v="50"]')
        if k == 2:
            shot(pg, "SCR-11b_thu-tien-mat", ".mbox")
        pg.click('[data-act="paydo"]')
        if k == 2:
            shot(pg, "SCR-11c_hoa-don", ".mbox")
        pg.click('[data-act="mclose"]')
    check("Thanh toán đủ 3 phần → bàn T07 Cần dọn (BR-17)", pg.evaluate("S.tables.T07.status") == "CLEANING")
    pg.goto(URL + f"#/cashier/tables")
    shot(pg, "SCR-09_ban-cho-thanh-toan")
    pg.goto(URL + "#/cashier/shift")
    shot(pg, "SCR-12_chot-ca")
    pg.goto(URL + "#/cashier/takeaway")
    pg.click('[data-act="ta-new"]')
    pg.click('[data-act="cat"][data-c="C3"]')
    pg.click('[data-act="ta-add"][data-m="M20"]')
    shot(pg, "SCR-19_don-mang-ve")
    pg.click('[data-act="pay"]')
    pg.click('[data-act="paydo"]')
    pg.click('[data-act="mclose"]')
    check("BR-13: đơn mang về gửi bếp sau khi thanh toán",
          pg.evaluate("Object.values(S.orders).filter(o=>o.type==='TA').sort((a,b)=>b.createdAt-a.createdAt)[0].items.every(i=>i.status==='QUEUED')"))

    # Admin
    pg.goto(URL + "#/manager/approvals")
    pg.click('[data-act="lock"]')
    login(pg, "manager", "admin")
    for v, n in [("users", "SCR-16_nguoi-dung"), ("audit", "SCR-17_nhat-ky")]:
        pg.goto(URL + f"#/manager/{v}")
        shot(pg, n)
    check("BR-19: nhật ký có thao tác hủy/giảm giá/thanh toán",
          pg.evaluate("['Duyệt hủy món','Giảm giá','Thanh toán','Báo hết món'].every(a=>S.audit.some(x=>x.action===a))"))

    # Mất mạng
    pg.click('[data-act="tg"][data-k="offline"]')
    check("Offline: banner hiển thị", pg.locator(".banner.off").count() == 1)
    pg.click('[data-act="tg"][data-k="offline"]')

    # Điện thoại hẹp
    m = br.new_page(viewport={"width": 390, "height": 844})
    m.on("pageerror", lambda e: errors.append(str(e)))
    m.goto(URL + "?as=waiter:minh.dang#/waiter/tables")
    check("Bề rộng 390px không cuộn ngang", m.evaluate("document.documentElement.scrollWidth <= 390"))
    br.close()

print(f"\n{sum(ok for _, ok in checks)}/{len(checks)} kiểm đạt · {len(errors)} lỗi JS")
for e in errors:
    print("JS:", e)
sys.exit(0 if all(ok for _, ok in checks) and not errors else 1)
