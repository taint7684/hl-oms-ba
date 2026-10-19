"""Sinh slide họp 1: 01_BACCM_Elicitation/Meeting-01/02_HL-OMS_Meeting-01.pptx
Nội dung khớp 01_Meeting-01-Pack.md (bản gửi khách trước họp, dựa trên giả định)."""
import sys
from pathlib import Path

from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches

from deck_kit import (ACCENT, ACCENT_SOFT, CW, H, INK, MUTED, MX, SOFT, W, WHITE, card, header,
                      new_deck, rect, table, text, _blank)

sys.stdout.reconfigure(encoding="utf-8")
OUT = Path(__file__).resolve().parent.parent / "01_BACCM_Elicitation/Meeting-01/02_HL-OMS_Meeting-01.pptx"
TOTAL = 10
TOP = Inches(1.75)

prs = new_deck()

# 1. Tiêu đề
s = _blank(prs)
rect(s, 0, 0, Inches(4.6), H, fill=ACCENT)
text(s, Inches(0.6), Inches(0.7), Inches(3.6), Inches(0.4), "HL RESTAURANT", 14, True, WHITE)
text(s, Inches(0.6), Inches(6.3), Inches(3.6), Inches(0.6), ["Sydney CBD · NSW"], 12, color=WHITE)
text(s, Inches(5.3), Inches(2.0), Inches(7.4), Inches(0.4), "HỌP KHỞI ĐỘNG", 13, True, ACCENT)
text(s, Inches(5.3), Inches(2.45), Inches(7.6), Inches(1.6),
     ["Hệ thống quản lý gọi món", "HL-OMS"], 36, True)
text(s, Inches(5.3), Inches(4.35), Inches(7.4), Inches(0.9),
     "Hiểu bài toán · Đề xuất giải pháp · Thống nhất bước tiếp theo", 15, color=MUTED)
text(s, Inches(5.3), Inches(5.9), Inches(7.4), Inches(0.8),
     ["Thứ Ba 03/11/2026 · 14:30–16:30", "Trình bày: Business Analyst"], 12, color=MUTED)

# 2. Về chúng tôi + chương trình
s = header(prs, "Giới thiệu", "Đội dự án và chương trình hôm nay", 2, TOTAL)
half = (CW - Inches(0.4)) / 2
table(s, MX, TOP, half, [
    ["Vai trò", "Phụ trách"],
    ["Project Manager", "Kế hoạch, tiến độ, hợp đồng"],
    ["Business Analyst", "Yêu cầu, quy trình, tài liệu, UAT"],
    ["Dev Team (2 FE, 1 BE)", "Xây dựng web app, KDS"],
    ["QA", "Kiểm thử hệ thống"],
], col_w=[1, 1.6], size=12, head_size=13, row_h=Inches(0.55))
table(s, MX + half + Inches(0.4), TOP, half, [
    ["#", "Nội dung", "Phút"],
    ["1", "Mục tiêu buổi họp", "10"],
    ["2", "Hiểu biết ban đầu và giải pháp đề xuất", "25"],
    ["3", "Hỏi đáp theo 6 nhóm câu hỏi", "70"],
    ["4", "Thống nhất bước tiếp theo", "15"],
], col_w=[0.3, 2.4, 0.5], size=12, head_size=13, row_h=Inches(0.55))
text(s, MX, Inches(5.1), CW, Inches(0.8),
     "Mục tiêu: xác nhận nhu cầu, phạm vi MVP, ràng buộc vận hành và thương mại — "
     "đủ để bắt đầu giai đoạn Discovery.", 14, color=MUTED)

# 3. Hiểu về HL
s = header(prs, "Bối cảnh", "Chúng tôi hiểu về HL Restaurant", 3, TOTAL)
stats = [("15–20", "bàn, 1 khu trong nhà"), ("6–10", "nhân viên mỗi ca"),
         ("Giấy", "phiếu gọi món chuyển tay"), ("AUD", "giá đã gồm GST 10%")]
cw = (CW - Inches(0.3) * 3) / 4
for i, (big, small) in enumerate(stats):
    x = MX + (cw + Inches(0.3)) * i
    rect(s, x, TOP, cw, Inches(1.5), fill=SOFT)
    text(s, x + Inches(0.2), TOP + Inches(0.15), cw, Inches(0.7), big, 30, True, ACCENT)
    text(s, x + Inches(0.2), TOP + Inches(0.9), cw - Inches(0.3), Inches(0.5), small, 12, color=MUTED)
text(s, MX, Inches(3.6), CW, Inches(2.2), [
    "• Nhà hàng Việt tại Sydney CBD, cao điểm tối thứ Sáu – thứ Bảy",
    "• Phục vụ mang phiếu vào bếp; bếp gọi to khi món xong; thu ngân cộng bill bằng tay",
    "• Nhân sự luân ca, nhiều nhân viên bán thời gian",
    "• Đặc thù Úc: GST 10%, phụ thu ngày lễ, thông tin dị ứng bắt buộc khi khách hỏi",
], 15)
rect(s, MX, Inches(5.85), CW, Inches(0.5), fill=ACCENT_SOFT)
text(s, MX + Inches(0.2), Inches(5.85), CW, Inches(0.5),
     "Số liệu trên là giả định — cần anh/chị xác nhận hôm nay (Assumption Log A-01 → A-25)",
     12, True, ACCENT, anchor=MSO_ANCHOR.MIDDLE)

# 4. Vấn đề
s = header(prs, "Vấn đề", "Từ phiếu giấy đến đơn số", 4, TOTAL)
table(s, MX, TOP, CW, [
    ["Hiện tại (As-Is)", "Đề xuất (To-Be)"],
    ["Ghi sai món, chữ khó đọc, ghi tắt", "Chọn món từ menu chuẩn trên điện thoại"],
    ["Phục vụ chạy vào bếp đưa phiếu", "Đơn tới đúng trạm bếp theo thời gian thực"],
    ["Không biết món nào đang nấu, món nào trễ", "Trạng thái từng món, cảnh báo món trễ"],
    ["Hết món nhưng vẫn nhận order", "Bếp báo hết món, hệ thống chặn ngay"],
    ["Ghi chú dị ứng dễ sót", "Chọn chất gây dị ứng, cảnh báo đỏ trên màn bếp"],
    ["Cộng bill thủ công, quên phụ thu", "Tự tính tổng, GST, phụ thu; tách bill"],
], col_w=[1, 1], size=14, head_size=13, row_h=Inches(0.58))

# 5. BACCM
s = header(prs, "BACCM", "Bài toán trên một trang", 5, TOTAL)
items = [
    ("Need", "Vận hành nhanh, chính xác, an toàn dị ứng; ít sai món, bill đúng"),
    ("Change", "Gọi món giấy → đơn số; chạy phiếu → đơn tự tới bếp; cộng tay → bill tự tính"),
    ("Solution", "HL-OMS: app phục vụ · màn hình bếp (KDS) · quầy thu ngân · trang quản lý"),
    ("Stakeholder", "Chủ NH · Quản lý · Bếp trưởng · Bếp · Phục vụ · Thu ngân · Khách"),
    ("Value", "Giảm sai món, rút ngắn thời gian lên món, tăng quay vòng bàn"),
    ("Context", "Sydney CBD, cao điểm đông, nhân sự luân ca, quy định GST/ACCC/FSANZ"),
]
cw, ch = (CW - Inches(0.3) * 2) / 3, Inches(2.15)
for i, (t, b) in enumerate(items):
    x = MX + (cw + Inches(0.3)) * (i % 3)
    y = TOP + (ch + Inches(0.3)) * (i // 3)
    card(s, x, y, cw, ch, t, b, size=14)

# 6. Nhu cầu theo người dùng
s = header(prs, "Nhu cầu", "Mỗi nhóm người dùng cần gì", 6, TOTAL)
table(s, MX, TOP, CW, [
    ["Người dùng", "Nhu cầu chính", "Ưu tiên"],
    ["Phục vụ", "Ghi món nhanh, thao tác một tay; biết món nào đã xong", "Must"],
    ["Bếp", "Đọc đơn rõ theo trạm; thấy dị ứng nổi bật; biết món trễ", "Must"],
    ["Bếp trưởng", "Xem tổng đơn chờ, điều phối; báo hết món", "Must"],
    ["Thu ngân", "Bill đúng GST, phụ thu; tách bill nhanh", "Must"],
    ["Quản lý", "Cập nhật menu, giá; báo cáo; kiểm soát hủy và giảm giá", "Must"],
    ["Chủ nhà hàng", "Doanh thu rõ, giảm thất thoát, ROI", "Must"],
], col_w=[1, 3.2, 0.6], size=14, head_size=13, row_h=Inches(0.58))

# 7. Giải pháp
s = header(prs, "Giải pháp", "HL-OMS gồm 4 phân hệ trên một nền tảng", 7, TOTAL)
mods = [
    ("App Phục vụ", ["• Sơ đồ bàn", "• Gọi món, tùy chọn, dị ứng", "• Gửi bếp một chạm",
                     "• Nhận báo món xong"]),
    ("Màn hình Bếp", ["• Đơn theo trạm", "• Trạng thái từng món", "• Cảnh báo món trễ",
                      "• Báo hết món"]),
    ("Quầy Thu ngân", ["• Bill tự tính", "• GST, phụ thu lễ", "• Tách bill",
                       "• Ghi nhận thanh toán"]),
    ("Trang Quản lý", ["• Menu, giá", "• Báo cáo", "• Tài khoản, phân quyền", "• Nhật ký thao tác"]),
]
cw = (CW - Inches(0.3) * 3) / 4
for i, (t, b) in enumerate(mods):
    card(s, MX + (cw + Inches(0.3)) * i, TOP, cw, Inches(3.2), t, b, size=14)
rect(s, MX, Inches(5.25), CW, Inches(0.75), fill=INK)
text(s, MX + Inches(0.25), Inches(5.25), CW - Inches(0.5), Inches(0.75),
     "Web app chạy trên điện thoại và màn hình cảm ứng — không cài đặt · cập nhật theo thời gian thực",
     14, True, WHITE, anchor=MSO_ANCHOR.MIDDLE)

# 8. Phạm vi
s = header(prs, "Phạm vi", "Phạm vi MVP đề xuất", 8, TOTAL)
half = (CW - Inches(0.4)) / 2
card(s, MX, TOP, half, Inches(4.1), "Trong phạm vi", [
    "• Menu và tình trạng còn/hết món", "• Quản lý bàn", "• Tạo, sửa đơn; gửi bếp",
    "• Bếp cập nhật trạng thái món", "• Thông báo món sẵn sàng",
    "• Bill, GST, phụ thu, tách bill, ghi nhận thanh toán", "• Phân quyền", "• Báo cáo cơ bản",
], size=14)
card(s, MX + half + Inches(0.4), TOP, half, Inches(4.1), "Phiên bản sau", [
    "• Khách tự gọi món qua QR", "• Đặt bàn online", "• Giao hàng (Uber Eats…)",
    "• Quản lý kho nguyên liệu", "• Khách hàng thân thiết", "• Tích hợp cổng thanh toán",
], size=14, title_color=MUTED)

# 9. Cách làm
s = header(prs, "Phương pháp", "Scrum với 4 tuần Discovery", 9, TOTAL)
steps = [("Discovery", "4 tuần"), ("Sprint 1–5", "2 tuần/sprint"), ("UAT + đào tạo", "2 tuần"),
         ("Go-live", "Q1/2027*"), ("Hypercare", "4 tuần")]
sw = (CW - Inches(0.2) * 4) / 5
for i, (t, d) in enumerate(steps):
    x = MX + (sw + Inches(0.2)) * i
    rect(s, x, TOP, sw, Inches(1.1), fill=ACCENT if i == 3 else SOFT)
    c = WHITE if i == 3 else INK
    text(s, x, TOP + Inches(0.18), sw, Inches(0.4), t, 15, True, c, align=PP_ALIGN.CENTER)
    text(s, x, TOP + Inches(0.6), sw, Inches(0.4), d, 12, color=c, align=PP_ALIGN.CENTER)
table(s, MX, Inches(3.2), CW, [
    ["Vai trò Scrum", "Đề xuất", "Nhịp làm việc"],
    ["Product Owner", "Quản lý nhà hàng", "Sprint Review: demo tại nhà hàng mỗi 2 tuần"],
    ["Người duyệt cuối", "Chủ nhà hàng", "Duyệt phạm vi, nghiệm thu"],
    ["Scrum Master · BA · Dev · QA", "Đội vendor", "Daily 15', refinement giữa sprint"],
], col_w=[1.3, 1.2, 2.5], size=13, head_size=13, row_h=Inches(0.55))
text(s, MX, Inches(5.55), CW, Inches(0.4), "* Mốc go-live cần thống nhất hôm nay.", 11, color=MUTED)

# 10. Hôm nay cần thống nhất
s = header(prs, "Thống nhất", "Hôm nay cần anh/chị xác nhận", 10, TOTAL)
table(s, MX, TOP, Inches(7.4), [
    ["Nhóm câu hỏi", "Số câu"],
    ["1. Nhu cầu chính", "9"], ["2. Tiện ích / UX", "5"], ["3. Nội dung sản phẩm", "12"],
    ["4. Vận hành & nguồn lực", "6"], ["5. Điều khoản thương mại", "5"], ["6. Khác", "3"],
], col_w=[3, 1], size=13, head_size=13, row_h=Inches(0.5))
rect(s, MX, Inches(5.45), CW, Inches(0.6), fill=ACCENT_SOFT)
text(s, MX + Inches(0.2), Inches(5.45), CW, Inches(0.6),
     "40 câu · 25 câu bắt buộc hỏi hôm nay · chi tiết người trả lời và kỹ thuật: Question Log",
     13, True, ACCENT, anchor=MSO_ANCHOR.MIDDLE)
card(s, Inches(8.4), TOP, W - MX - Inches(8.4), Inches(3.5), "Bước tiếp theo", [
    "• Quan sát ca tối thứ Sáu", "• Nhận phiếu, menu, hóa đơn mẫu", "• Khảo sát nhân viên",
    "• Workshop phạm vi MVP", "• Demo prototype",
], size=14)

OUT.parent.mkdir(parents=True, exist_ok=True)
prs.save(OUT)
print(f"Đã ghi {OUT}")
