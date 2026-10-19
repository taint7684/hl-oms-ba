"""Định nghĩa 7 quy trình BPMN của HL-OMS và sinh .bpmn / .svg / .png vào 04_Business_Process/diagrams/."""
import sys
from pathlib import Path

from bpmn_kit import Process

sys.stdout.reconfigure(encoding="utf-8")
OUT = Path(__file__).resolve().parent.parent / "04_Business_Process/diagrams"

K, W, B, C, S, CH, M = ("K", "Khách"), ("W", "Phục vụ"), ("B", "Bếp"), ("C", "Thu ngân"), \
    ("S", "HL-OMS"), ("CH", "Bếp trưởng"), ("M", "Quản lý")

P = []

# BP1 As-Is — gọi món bằng phiếu giấy
P.append(Process("BP1_AsIs", "BP1 As-Is · Gọi món tại bàn (phiếu giấy)", [K, W, B, C], [
    ("s", "start", "K", 0, "Khách ngồi vào bàn"),
    ("k1", "task", "K", 1, "Gọi món"),
    ("w1", "task", "W", 2, "Ghi phiếu giấy 2 liên", {"pain": 1}),
    ("g1", "xor", "W", 3, "Khách có dị ứng?"),
    ("w2", "task", "W", 4, "Ghi chú ở lề phiếu", {"row": 1, "pain": 2}),
    ("g2", "xor", "W", 5, ""),
    ("g3", "and", "W", 6, ""),
    ("w3", "task", "W", 7, "Mang liên 1 vào bếp (2–3 phút)", {"pain": 3}),
    ("c1", "task", "C", 7, "Kẹp liên 2 chờ tính bill", {"pain": 4}),
    ("e2", "end", "C", 8, "Chờ thanh toán (BP3)"),
    ("b1", "task", "B", 8, "Phiếu chờ trên móc (TB 3 phút)", {"pain": 5}),
    ("b2", "task", "B", 9, "Bếp trưởng đọc to, chia trạm"),
    ("g4", "xor", "B", 10, "Còn món?"),
    ("b3", "task", "B", 11, "Chế biến"),
    ("e1", "end", "B", 12, "Sang BP2"),
    ("b4", "task", "B", 11, "Báo miệng cho phục vụ", {"row": 1, "pain": 6}),
    ("w4", "task", "W", 12, "Báo khách chọn món khác"),
], [("s", "k1", ""), ("k1", "w1", ""), ("w1", "g1", ""), ("g1", "w2", "Có"), ("g1", "g2", "Không"),
    ("w2", "g2", ""), ("g2", "g3", ""), ("g3", "w3", ""), ("g3", "c1", ""), ("c1", "e2", ""), ("w3", "b1", ""),
    ("b1", "b2", ""), ("b2", "g4", ""), ("g4", "b3", "Còn"), ("g4", "b4", "Hết"), ("b3", "e1", ""),
    ("b4", "w4", ""), ("w4", "k1", "Gọi lại")]))

# BP1 To-Be — gọi món trên HL-OMS
P.append(Process("BP1_ToBe", "BP1 To-Be · Gọi món tại bàn (HL-OMS)", [K, W, S, B], [
    ("s", "start", "K", 0, "Khách ngồi vào bàn"),
    ("w1", "task", "W", 1, "Mở bàn, nhập số khách"),
    ("k1", "task", "K", 2, "Gọi món"),
    ("w2", "task", "W", 3, "Chọn món, tùy chọn, ghi chú"),
    ("s1", "sys", "S", 4, "Kiểm tra còn món, số phần (BR-01)"),
    ("g1", "xor", "S", 5, "Còn món?"),
    ("w3", "task", "W", 6, "Khai báo dị ứng (nếu có)"),
    ("w5", "task", "W", 5, "Báo khách chọn món khác", {"row": 1}),
    ("w4", "task", "W", 7, "Bấm Gửi bếp"),
    ("s2", "sys", "S", 8, "Chia món theo trạm, trừ số phần (BR-03, BR-07)"),
    ("b1", "task", "B", 9, "Nhận đơn trên KDS ≤ 2 giây"),
    ("e1", "end", "B", 10, "Sang BP2"),
], [("s", "w1", ""), ("w1", "k1", ""), ("k1", "w2", ""), ("w2", "s1", ""), ("s1", "g1", ""),
    ("g1", "w3", "Còn"), ("g1", "w5", "Hết"), ("w5", "k1", "Gọi lại"), ("w3", "w4", ""), ("w4", "s2", ""),
    ("s2", "b1", ""), ("b1", "e1", "")]))

# BP2 To-Be — chế biến và lên món
P.append(Process("BP2_ToBe", "BP2 To-Be · Chế biến và lên món", [B, CH, S, W, K], [
    ("s", "start", "S", 0, "Đơn tới trạm"),
    ("b1", "task", "B", 1, "Xem phiếu theo thứ tự thời gian"),
    ("g1", "xor", "B", 2, "Có dị ứng?"),
    ("b2", "task", "B", 3, "Đọc và xác nhận dị ứng (BR-04)", {"row": 1}),
    ("g2", "xor", "B", 4, ""),
    ("b3", "task", "B", 5, "Bắt đầu nấu"),
    ("s1", "sys", "S", 6, "Đếm thời gian, đổi màu khi quá ngưỡng (BR-06)"),
    ("g3", "xor", "CH", 7, "Món trễ?"),
    ("ch1", "task", "CH", 8, "Ưu tiên, điều phối người"),
    ("b4", "task", "B", 9, "Bấm Sẵn sàng"),
    ("s2", "sys", "S", 10, "Thông báo phục vụ phụ trách bàn"),
    ("w1", "task", "W", 11, "Nhận thông báo, lấy món"),
    ("w2", "task", "W", 12, "Mang ra, xác nhận Đã phục vụ"),
    ("k1", "task", "K", 13, "Nhận món"),
    ("e", "end", "K", 14, "Món đã lên bàn"),
], [("s", "b1", ""), ("b1", "g1", ""), ("g1", "b2", "Có"), ("g1", "g2", "Không"), ("b2", "g2", ""),
    ("g2", "b3", ""), ("b3", "s1", ""), ("s1", "g3", ""), ("g3", "ch1", "Có"), ("g3", "b4", "Không"),
    ("ch1", "b4", ""), ("b4", "s2", ""), ("s2", "w1", ""), ("w1", "w2", ""), ("w2", "k1", ""), ("k1", "e", "")]))

# BP3 As-Is — thanh toán thủ công
P.append(Process("BP3_AsIs", "BP3 As-Is · Thanh toán (cộng tay)", [K, W, C], [
    ("s", "start", "K", 0, "Khách xin tính tiền"),
    ("w1", "task", "W", 1, "Báo thu ngân số bàn"),
    ("c1", "task", "C", 2, "Tìm liên 2, cộng theo bảng giá", {"pain": 1}),
    ("g1", "xor", "C", 3, "Ngày lễ?"),
    ("c2", "task", "C", 4, "Cộng phụ thu (hay quên)", {"row": 1, "pain": 2}),
    ("g2", "xor", "C", 5, ""),
    ("c3", "task", "C", 6, "Viết bill tay (không ghi GST)", {"pain": 3}),
    ("k1", "task", "K", 7, "Kiểm tra bill"),
    ("g3", "xor", "K", 8, "Đúng?"),
    ("c4", "task", "C", 9, "Cộng lại, viết lại bill", {"row": 1}),
    ("k2", "task", "K", 10, "Trả EFTPOS / tiền mặt"),
    ("c5", "task", "C", 11, "Thu tiền, thối tiền"),
    ("e", "end", "C", 12, "Khách rời bàn"),
], [("s", "w1", ""), ("w1", "c1", ""), ("c1", "g1", ""), ("g1", "c2", "Có"), ("g1", "g2", "Không"),
    ("c2", "g2", ""), ("g2", "c3", ""), ("c3", "k1", ""), ("k1", "g3", ""), ("g3", "k2", "Đúng"),
    ("g3", "c4", "Sai"), ("c4", "k1", "Kiểm tra lại"), ("k2", "c5", ""), ("c5", "e", "")]))

# BP3 To-Be — thanh toán trên HL-OMS
P.append(Process("BP3_ToBe", "BP3 To-Be · Thanh toán (HL-OMS)", [K, C, S, M], [
    ("s", "start", "K", 0, "Khách xin tính tiền"),
    ("c1", "task", "C", 1, "Mở bill của bàn"),
    ("s1", "sys", "S", 2, "Tính tạm tính, phụ thu lễ, GST (BR-09, BR-10)"),
    ("g1", "xor", "C", 3, "Tách bill?"),
    ("c2", "task", "C", 4, "Tách theo món hoặc chia đều (BR-14)", {"row": 1}),
    ("g2", "xor", "C", 5, ""),
    ("g3", "xor", "C", 6, "Giảm giá?"),
    ("g4", "xor", "C", 7, "Vượt 10%?", {"row": 1}),
    ("c3", "task", "C", 8, "Áp giảm giá", {"row": 1}),
    ("m1", "task", "M", 8, "Duyệt giảm giá (BR-11)"),
    ("g5", "xor", "C", 9, ""),
    ("k1", "task", "K", 10, "Xác nhận bill"),
    ("k2", "task", "K", 11, "Thanh toán EFTPOS / tiền mặt"),
    ("c4", "task", "C", 12, "Ghi nhận phương thức, số tiền, in hóa đơn"),
    ("s2", "sys", "S", 13, "Đóng bill, bàn chuyển Cần dọn (BR-17)"),
    ("e", "end", "S", 14, "Đã thanh toán"),
], [("s", "c1", ""), ("c1", "s1", ""), ("s1", "g1", ""), ("g1", "c2", "Có"), ("g1", "g2", "Không"),
    ("c2", "g2", ""), ("g2", "g3", ""), ("g3", "g4", "Có"), ("g3", "g5", "Không"), ("g4", "c3", "≤ 10%"),
    ("g4", "m1", "> 10%"), ("c3", "g5", ""), ("m1", "g5", ""), ("g5", "k1", ""), ("k1", "k2", ""),
    ("k2", "c4", ""), ("c4", "s2", ""), ("s2", "e", "")]))

# BP4 To-Be — hết món, đổi món, hủy món
P.append(Process("BP4_ToBe", "BP4 To-Be · Hết món, đổi món, hủy món", [CH, S, W, M], [
    ("s", "start", "CH", 0, "Nguyên liệu sắp hết"),
    ("ch1", "task", "CH", 1, "Đặt số phần còn lại hoặc bấm Hết"),
    ("s1", "sys", "S", 2, "Chặn món trên mọi app ≤ 2 giây (BR-01)"),
    ("g1", "xor", "S", 3, "Có món đang chờ bị ảnh hưởng?"),
    ("e1", "end", "S", 4, "Kết thúc"),
    ("s2", "sys", "S", 4, "Báo phục vụ bàn liên quan", {"row": 1}),
    ("w1", "task", "W", 5, "Báo khách, hỏi đổi món hay hủy"),
    ("g2", "xor", "W", 6, "Khách chọn?"),
    ("w2", "task", "W", 7, "Hủy món cũ, gọi món thay thế"),
    ("e2", "end", "W", 8, "Đã đổi món"),
    ("w3", "task", "W", 7, "Gửi yêu cầu hủy, chọn lý do", {"row": 1}),
    ("g3", "xor", "S", 9, "Món đã bắt đầu nấu?", {"row": 1}),
    ("s3", "sys", "S", 10, "Hủy ngay, trả số phần (BR-07)", {"row": 1}),
    ("m1", "task", "M", 10, "Duyệt hoặc từ chối (BR-05)"),
    ("s4", "sys", "S", 11, "Cập nhật món, ghi nhật ký (BR-19)", {"row": 1}),
    ("e3", "end", "S", 12, "Đã xử lý", {"row": 1}),
], [("s", "ch1", ""), ("ch1", "s1", ""), ("s1", "g1", ""), ("g1", "e1", "Không"), ("g1", "s2", "Có"),
    ("s2", "w1", ""), ("w1", "g2", ""), ("g2", "w2", "Đổi món"), ("g2", "w3", "Hủy"), ("w2", "e2", ""),
    ("w3", "g3", ""), ("g3", "s3", "Chưa"), ("g3", "m1", "Rồi"), ("s3", "s4", ""), ("m1", "s4", ""),
    ("s4", "e3", "")]))

# BP5 To-Be — cập nhật menu
P.append(Process("BP5_ToBe", "BP5 To-Be · Cập nhật menu", [M, S, CH], [
    ("s", "start", "M", 0, "Có thay đổi món hoặc giá"),
    ("m1", "task", "M", 1, "Thêm/sửa món, giá, khung giờ, trạm, dị ứng"),
    ("s1", "sys", "S", 2, "Kiểm tra dữ liệu bắt buộc"),
    ("g1", "xor", "S", 3, "Hợp lệ?"),
    ("m2", "task", "M", 4, "Sửa thông tin"),
    ("ch1", "task", "CH", 4, "Xác nhận chất gây dị ứng và trạm"),
    ("s2", "sys", "S", 5, "Lưu, ghi nhật ký; giá mới áp cho món gọi mới (BR-08)"),
    ("s3", "sys", "S", 6, "Đẩy menu mới tới mọi app"),
    ("e", "end", "S", 7, "Menu đã cập nhật"),
], [("s", "m1", ""), ("m1", "s1", ""), ("s1", "g1", ""), ("g1", "m2", "Không"), ("m2", "s1", "Gửi lại"),
    ("g1", "ch1", "Có"), ("ch1", "s2", ""), ("s2", "s3", ""), ("s3", "e", "")]))

if __name__ == "__main__":
    from playwright.sync_api import sync_playwright
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome")
        for pr in P:
            (OUT / f"{pr.pid}.bpmn").write_text(pr.bpmn(), encoding="utf-8", newline="\n")
            svg = pr.svg()
            (OUT / f"{pr.pid}.svg").write_text(svg, encoding="utf-8", newline="\n")
            pg = br.new_page(viewport={"width": pr.width, "height": pr.height}, device_scale_factor=2)
            pg.set_content(f"<body style='margin:0'>{svg}</body>")
            pg.locator("svg").screenshot(path=str(OUT / f"{pr.pid}.png"))
            pg.close()
            print(f"{pr.pid}: {len(pr.nodes)} nút, {len(pr.flows)} luồng")
        br.close()
