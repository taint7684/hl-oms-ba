"""Sinh Use Case Diagram (cấp 1–3) và 7 Activity Diagram vào 05_Use_Case_Activity/diagrams/."""
import sys
from pathlib import Path

from uml_kit import Activity, activity_svg, ucd

sys.stdout.reconfigure(encoding="utf-8")
OUT = Path(__file__).resolve().parent.parent / "05_Use_Case_Activity/diagrams"

L = [("WTR", "Phục vụ"), ("COOK", "Bếp"), ("CHF", "Bếp trưởng")]
R = [("CSH", "Thu ngân"), ("MGR", "Quản lý"), ("ADM", "Admin")]
UCDS = []

UCDS.append(("UCD_L1", *ucd("Use Case Diagram — Cấp 1 (mục tiêu)", "HL-OMS", L, R, [
    ("G1", "Phục vụ khách tại bàn và mang về"), ("G2", "Chế biến món"), ("G3", "Thanh toán"),
    ("G4", "Quản lý nhà hàng"), ("G5", "Quản trị và vận hành hệ thống")],
    [("WTR", "G1"), ("CSH", "G1"), ("COOK", "G2"), ("CHF", "G2"), ("CSH", "G3"), ("MGR", "G3"), ("MGR", "G4"),
     ("ADM", "G5")], cols=1, uc_w=300, gap_y=30)))

LEFT_UC = [("UC-07", "Quản lý bàn"), ("UC-01", "Tạo đơn"), ("UC-02", "Gửi đơn tới bếp"),
           ("UC-09", "Nhận thông báo, phục vụ món"), ("UC-08", "Hủy món"), ("UC-20", "Vận hành khi mất mạng"),
           ("UC-03", "Cập nhật trạng thái món"), ("UC-11", "Xem tổng hợp bếp"), ("UC-04", "Báo hết món"),
           ("UC-19", "Đăng nhập bằng PIN")]
RIGHT_UC = [("UC-10", "Tạo đơn mang về"), ("UC-05", "Thanh toán"), ("UC-06", "Tách bill"), ("UC-16", "Chốt ca"),
            ("UC-12", "Duyệt yêu cầu"), ("UC-13", "Quản lý menu"), ("UC-14", "Thiết lập ngày lễ, phụ thu"),
            ("UC-15", "Xem báo cáo"), ("UC-17", "Quản lý tài khoản, vai trò"), ("UC-18", "Xem nhật ký thao tác")]
UCDS.append(("UCD_L2", *ucd("Use Case Diagram — Cấp 2 (use case hệ thống)", "HL-OMS", L, R,
    [x for pair in zip(LEFT_UC, RIGHT_UC) for x in pair],
    [("WTR", "UC-07"), ("WTR", "UC-01"), ("WTR", "UC-02"), ("WTR", "UC-09"), ("WTR", "UC-08"), ("WTR", "UC-20"),
     ("COOK", "UC-03"), ("COOK", "UC-20"), ("CHF", "UC-03"), ("CHF", "UC-11"), ("CHF", "UC-04"),
     ("CSH", "UC-10"), ("CSH", "UC-05"), ("CSH", "UC-06"), ("CSH", "UC-16"), ("MGR", "UC-12"), ("MGR", "UC-13"),
     ("MGR", "UC-14"), ("MGR", "UC-15"), ("ADM", "UC-17"), ("ADM", "UC-18")],
    cols=2, uc_w=230, uc_h=52, gap_x=90, gap_y=18)))

UCDS.append(("UCD_L3_UC01", *ucd("Use Case Diagram — Cấp 3: UC-01 Tạo đơn", "HL-OMS · Gọi món", [("WTR", "Phục vụ")], [], [
    ("UC-01.1", "Chọn món theo danh mục / tìm kiếm"), ("UC-01", "Tạo đơn"), ("UC-01.2", "Chọn tùy chọn, ghi chú"),
    ("UC-01.4", "Kiểm tra còn món"), ("UC-01.5", "Báo món hết, gợi ý thay thế"), ("UC-01.3", "Khai báo chất gây dị ứng")],
    [("WTR", "UC-01")],
    [("UC-01", "UC-01.1", "include"), ("UC-01.2", "UC-01", "extend"), ("UC-01.3", "UC-01", "extend"),
     ("UC-01.1", "UC-01.4", "include"), ("UC-01.5", "UC-01.4", "extend")], cols=3, uc_w=210, gap_x=80, gap_y=70)))

UCDS.append(("UCD_L3_UC05", *ucd("Use Case Diagram — Cấp 3: UC-05 Thanh toán", "HL-OMS · Thanh toán", [("CSH", "Thu ngân")],
                                 [("MGR", "Quản lý")], [
    ("UC-05.1", "Tính bill (GST, phụ thu)"), ("UC-05", "Thanh toán"), ("UC-05.3", "Áp giảm giá"),
    ("UC-05.2", "Ghi nhận phương thức, số tiền"), ("UC-06", "Tách bill"), ("UC-12", "Duyệt giảm giá > 10%"),
    ("UC-05.4", "In hóa đơn / tax invoice")],
    [("CSH", "UC-05"), ("MGR", "UC-12")],
    [("UC-05", "UC-05.1", "include"), ("UC-05", "UC-05.2", "include"), ("UC-05.3", "UC-05", "extend"),
     ("UC-06", "UC-05", "extend"), ("UC-12", "UC-05.3", "extend"), ("UC-05.4", "UC-05.2", "extend")],
    cols=3, uc_w=210, gap_x=80, gap_y=70)))

W, S, B, M, C, CH = ("W", "Phục vụ"), ("S", "HL-OMS"), ("B", "Bếp (KDS)"), ("M", "Quản lý"), ("C", "Thu ngân"), \
    ("CH", "Bếp trưởng")
ACTS = [
    Activity("ACT_UC01", "ACT-01 · UC-01 Tạo đơn", [W, S], [
        ("s", "start", "W", 0, ""), ("w1", "task", "W", 1, "Chọn bàn đang có khách"),
        ("s1", "sys", "S", 2, "Hiện đơn và menu theo khung giờ"), ("w2", "task", "W", 3, "Chọn món"),
        ("s2", "sys", "S", 4, "Kiểm tra còn món, số phần"), ("x1", "xor", "S", 5, "Còn món?"),
        ("s3", "sys", "S", 6, "Báo Hết, gợi ý món cùng danh mục", {"row": 1}),
        ("w3", "task", "W", 6, "Chọn tùy chọn, ghi chú, dị ứng"),
        ("s4", "sys", "S", 7, "Kiểm tra tùy chọn bắt buộc, cảnh báo dị ứng"), ("x2", "xor", "S", 8, "Hợp lệ?"),
        ("s5", "sys", "S", 9, "Thêm món (Mới), cập nhật tạm tính"), ("x3", "xor", "W", 10, "Thêm món khác?"),
        ("e", "end", "W", 11, "Sẵn sàng gửi bếp (UC-02)")],
        [("s", "w1", ""), ("w1", "s1", ""), ("s1", "w2", ""), ("w2", "s2", ""), ("s2", "x1", ""), ("x1", "w3", "Còn"),
         ("x1", "s3", "Hết"), ("s3", "w2", "Chọn lại"), ("w3", "s4", ""), ("s4", "x2", ""), ("x2", "s5", "Đúng"),
         ("x2", "w3", "Thiếu"), ("s5", "x3", ""), ("x3", "w2", "Có"), ("x3", "e", "Không")]),
    Activity("ACT_UC02", "ACT-02 · UC-02 Gửi đơn tới bếp", [W, S, B], [
        ("s", "start", "W", 0, ""), ("w1", "task", "W", 1, "Bấm Gửi bếp"),
        ("s1", "sys", "S", 2, "Kiểm tra đơn có ≥ 1 món Mới"), ("x1", "xor", "S", 3, "Hợp lệ?"),
        ("s2", "sys", "S", 4, "Báo không có món mới", {"row": 1}), ("e2", "end", "S", 4, "Dừng", {"row": 2}),
        ("s3", "sys", "S", 4, "Kiểm tra lại số phần còn"), ("x2", "xor", "S", 5, "Đủ phần?"),
        ("s4", "sys", "S", 6, "Gỡ món thiếu phần, báo phục vụ", {"row": 1}), ("e3", "end", "S", 6, "Quay lại UC-01", {"row": 2}),
        ("s5", "sys", "S", 6, "Lưu lượt gửi, trừ số phần (BR-07)"), ("f", "and", "S", 7, ""),
        ("b1", "task", "B", 8, "Hiện phiếu trên đúng trạm (BR-03)"),
        ("s6", "sys", "S", 8, "Món → Chờ nấu, đơn → Submitted"), ("j", "and", "S", 9, ""),
        ("w2", "task", "W", 10, "Thấy món ở trạng thái Chờ nấu"), ("e", "end", "W", 11, "")],
        [("s", "w1", ""), ("w1", "s1", ""), ("s1", "x1", ""), ("x1", "s3", "Có"), ("x1", "s2", "Không"),
         ("s2", "e2", ""), ("s3", "x2", ""), ("x2", "s5", "Đủ"), ("x2", "s4", "Thiếu"), ("s4", "e3", ""),
         ("s5", "f", ""), ("f", "s6", ""), ("f", "b1", ""), ("s6", "j", ""), ("b1", "j", ""), ("j", "w2", ""),
         ("w2", "e", "")]),
    Activity("ACT_UC03", "ACT-03 · UC-03 Cập nhật trạng thái món", [B, S, W], [
        ("s", "start", "B", 0, ""), ("b1", "task", "B", 1, "Chọn trạm, xem phiếu"),
        ("b2", "task", "B", 2, "Chạm món Chờ nấu"), ("s1", "sys", "S", 3, "Kiểm tra dị ứng chưa xác nhận"),
        ("x1", "xor", "S", 4, "Cần xác nhận?"), ("b3", "task", "B", 5, "Đọc, bấm Đã đọc dị ứng", {"row": 1}),
        ("s2", "sys", "S", 6, "Món → Đang nấu, ghi giờ"), ("b4", "task", "B", 7, "Nấu xong, chạm Sẵn sàng"),
        ("s3", "sys", "S", 8, "Món → Sẵn sàng, ghi giờ"), ("s4", "sys", "S", 9, "Thông báo phục vụ phụ trách bàn"),
        ("w1", "task", "W", 10, "Nhận thông báo"), ("e", "end", "W", 11, "")],
        [("s", "b1", ""), ("b1", "b2", ""), ("b2", "s1", ""), ("s1", "x1", ""), ("x1", "b3", "Có"),
         ("x1", "s2", "Không"), ("b3", "s2", ""), ("s2", "b4", ""), ("b4", "s3", ""), ("s3", "s4", ""),
         ("s4", "w1", ""), ("w1", "e", "")]),
    Activity("ACT_UC04", "ACT-04 · UC-04 Báo hết món", [CH, S, W], [
        ("s", "start", "CH", 0, ""), ("c1", "task", "CH", 1, "Mở danh sách món của trạm"),
        ("c2", "task", "CH", 2, "Chọn món"), ("x1", "xor", "CH", 3, "Thao tác?"),
        ("c3", "task", "CH", 4, "Nhập số phần còn lại", {"row": 1}),
        ("s1", "sys", "S", 4, "Món → Hết, số phần = 0"), ("s2", "sys", "S", 5, "Lưu số phần; = 0 thì → Hết", {"row": 1}),
        ("m", "xor", "S", 6, ""), ("s3", "sys", "S", 7, "Cập nhật mọi app ≤ 2 giây"),
        ("x2", "xor", "S", 8, "Món chờ bị ảnh hưởng?"), ("e2", "end", "S", 9, ""),
        ("s4", "sys", "S", 9, "Báo phục vụ bàn liên quan", {"row": 1}),
        ("w1", "task", "W", 10, "Báo khách đổi/hủy (UC-08)"), ("e1", "end", "W", 11, "")],
        [("s", "c1", ""), ("c1", "c2", ""), ("c2", "x1", ""), ("x1", "s1", "Hết"), ("x1", "c3", "Đặt số phần"),
         ("c3", "s2", ""), ("s1", "m", ""), ("s2", "m", ""), ("m", "s3", ""), ("s3", "x2", ""),
         ("x2", "e2", "Không"), ("x2", "s4", "Có"), ("s4", "w1", ""), ("w1", "e1", "")]),
    Activity("ACT_UC05", "ACT-05 · UC-05 Thanh toán", [C, S, M], [
        ("s", "start", "C", 0, ""), ("c1", "task", "C", 1, "Chọn bàn Chờ thanh toán"),
        ("s1", "sys", "S", 2, "Kiểm tra món Đã phục vụ / Đã hủy (BR-12)"), ("x1", "xor", "S", 3, "Đạt?"),
        ("s2", "sys", "S", 4, "Báo món chưa phục vụ", {"row": 1}), ("e2", "end", "S", 5, "Dừng", {"row": 1}),
        ("s3", "sys", "S", 4, "Tính tạm tính, phụ thu, GST"), ("x2", "xor", "C", 5, "Giảm giá?"),
        ("c2", "task", "C", 6, "Nhập giảm giá, lý do", {"row": 1}), ("x3", "xor", "S", 7, "Vượt 10%?", {"row": 1}),
        ("m1", "task", "M", 8, "Duyệt / từ chối (UC-12)"), ("s4", "sys", "S", 8, "Áp giảm giá, tính lại", {"row": 1}),
        ("mg", "xor", "C", 9, ""), ("c3", "task", "C", 10, "Xác nhận bill, chọn phương thức"),
        ("x4", "xor", "C", 11, "Tiền mặt?"), ("c4", "task", "C", 12, "Nhập tiền khách đưa", {"row": 1}),
        ("s5", "sys", "S", 13, "Làm tròn 5 cent, tính tiền thừa (BR-15)", {"row": 1}),
        ("c5", "task", "C", 12, "Xác nhận đã quẹt EFTPOS"), ("mg2", "xor", "C", 14, ""),
        ("s6", "sys", "S", 15, "Đóng bill, bàn → Cần dọn, in hóa đơn"), ("e", "end", "S", 16, "")],
        [("s", "c1", ""), ("c1", "s1", ""), ("s1", "x1", ""), ("x1", "s3", "Có"), ("x1", "s2", "Không"),
         ("s2", "e2", ""), ("s3", "x2", ""), ("x2", "mg", "Không"), ("x2", "c2", "Có"), ("c2", "x3", ""),
         ("x3", "s4", "≤ 10%"), ("x3", "m1", "> 10%"), ("m1", "s4", ""), ("s4", "mg", ""), ("mg", "c3", ""),
         ("c3", "x4", ""), ("x4", "c5", "Không"), ("x4", "c4", "Có"), ("c4", "s5", ""), ("s5", "mg2", ""),
         ("c5", "mg2", ""), ("mg2", "s6", ""), ("s6", "e", "")]),
    Activity("ACT_UC06", "ACT-06 · UC-06 Tách bill", [C, S], [
        ("s", "start", "C", 0, ""), ("c1", "task", "C", 1, "Mở bill, chọn Tách bill"),
        ("x1", "xor", "C", 2, "Cách tách?"), ("c2", "task", "C", 3, "Tạo n phần, gán món vào từng phần"),
        ("c3", "task", "C", 3, "Nhập số phần (2–10)", {"row": 1}),
        ("s1", "sys", "S", 4, "Kiểm tra mọi món đã gán"), ("x2", "xor", "S", 5, "Đủ?"),
        ("s2", "sys", "S", 4, "Chia đều, phần cuối nhận số lẻ", {"row": 1}),
        ("mg", "xor", "S", 7, ""), ("s3", "sys", "S", 8, "Tính tổng, GST từng phần"),
        ("c4", "task", "C", 9, "Thu tiền từng phần (UC-05)"), ("x3", "xor", "C", 10, "Còn phần chưa trả?"),
        ("s4", "sys", "S", 11, "Đóng bill"), ("e", "end", "S", 12, "")],
        [("s", "c1", ""), ("c1", "x1", ""), ("x1", "c2", "Theo món"), ("x1", "c3", "Chia đều"), ("c2", "s1", ""),
         ("s1", "x2", ""), ("x2", "mg", "Đủ"), ("x2", "c2", "Thiếu"), ("c3", "s2", ""), ("s2", "mg", ""),
         ("mg", "s3", ""), ("s3", "c4", ""), ("c4", "x3", ""), ("x3", "c4", "Còn"), ("x3", "s4", "Hết"),
         ("s4", "e", "")]),
    Activity("ACT_UC08", "ACT-08 · UC-08 Hủy món", [W, S, M], [
        ("s", "start", "W", 0, ""), ("w1", "task", "W", 1, "Chọn món trong đơn, bấm Hủy"),
        ("s1", "sys", "S", 2, "Kiểm tra trạng thái món"), ("x1", "xor", "S", 3, "Trạng thái?"),
        ("s2", "sys", "S", 4, "Hủy món, trả số phần, báo KDS"),
        ("w2", "task", "W", 4, "Chọn lý do, gửi yêu cầu hủy"),
        ("s3", "sys", "S", 5, "Món → Chờ duyệt hủy, báo Quản lý", {"row": 1}),
        ("m1", "task", "M", 6, "Xem yêu cầu"), ("x2", "xor", "M", 7, "Duyệt?"),
        ("s4", "sys", "S", 8, "Món → Đã hủy, bỏ khỏi bill", {"row": 1}),
        ("s5", "sys", "S", 9, "Trả món về trạng thái cũ, báo phục vụ", {"row": 1}),
        ("s6", "sys", "S", 10, "Ghi nhật ký (BR-19)"), ("e", "end", "S", 11, "")],
        [("s", "w1", ""), ("w1", "s1", ""), ("s1", "x1", ""), ("x1", "s2", "Chờ nấu"),
         ("x1", "w2", "Đang nấu / Sẵn sàng / Đã phục vụ"), ("w2", "s3", ""), ("s3", "m1", ""), ("m1", "x2", ""),
         ("x2", "s4", "Duyệt"), ("x2", "s5", "Từ chối"), ("s2", "s6", ""), ("s4", "s6", ""), ("s5", "s6", ""),
         ("s6", "e", "")]),
]

if __name__ == "__main__":
    from playwright.sync_api import sync_playwright
    OUT.mkdir(parents=True, exist_ok=True)
    items = [(n, svg, w, h) for n, svg, w, h in UCDS] + [(a.pid, activity_svg(a), a.width, a.height) for a in ACTS]
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome")
        for name, svg, w, h in items:
            (OUT / f"{name}.svg").write_text(svg, encoding="utf-8", newline="\n")
            pg = br.new_page(viewport={"width": int(w), "height": int(h)}, device_scale_factor=2)
            pg.set_content(f"<body style='margin:0'>{svg}</body>")
            pg.locator("svg").screenshot(path=str(OUT / f"{name}.png"))
            pg.close()
            print(name)
        br.close()
