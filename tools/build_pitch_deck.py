"""Sinh pitch deck: 09_Pitching/HL-OMS_Pitch-Deck.pptx (nội dung lấy từ BRD, Business Case, UAT, RTM)."""
import sys
from pathlib import Path

from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches

from deck_kit import (ACCENT, ACCENT_SOFT, CW, H, INK, MUTED, MX, SOFT, W, WHITE, _blank, card, header, new_deck,
                      picture, rect, table, text)

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SCR = ROOT / "07_UIUX/screens"
OUT = ROOT / "09_Pitching/HL-OMS_Pitch-Deck.pptx"
TOTAL, FOOT, TOP = 12, "HL-OMS · Pitching · 2027", Inches(1.75)
prs = new_deck()
hd = lambda k, t, n: header(prs, k, t, n, TOTAL, FOOT)


def stats(s, items, y=TOP, h=Inches(1.5)):
    cw = (CW - Inches(0.3) * (len(items) - 1)) / len(items)
    for i, (big, small) in enumerate(items):
        x = MX + (cw + Inches(0.3)) * i
        rect(s, x, y, cw, h, fill=SOFT)
        text(s, x + Inches(0.2), y + Inches(0.15), cw - Inches(0.3), Inches(0.7), big, 28, True, ACCENT)
        text(s, x + Inches(0.2), y + Inches(0.85), cw - Inches(0.3), h - Inches(0.9), small, 12, color=MUTED)


# 1. Tiêu đề
s = _blank(prs)
rect(s, 0, 0, Inches(4.6), H, fill=ACCENT)
text(s, Inches(0.6), Inches(0.7), Inches(3.6), Inches(0.4), "HL RESTAURANT", 14, True, WHITE)
text(s, Inches(0.6), Inches(6.3), Inches(3.6), Inches(0.6), "Sydney CBD · NSW", 12, color=WHITE)
text(s, Inches(5.3), Inches(2.0), Inches(7.4), Inches(0.4), "ĐỀ XUẤT GIẢI PHÁP", 13, True, ACCENT)
text(s, Inches(5.3), Inches(2.45), Inches(7.6), Inches(1.6), ["HL-OMS", "Gọi món số, bếp nhanh, bill đúng"], 34, True)
text(s, Inches(5.3), Inches(4.4), Inches(7.4), Inches(0.9), "Hệ thống quản lý gọi món cho phục vụ, bếp, thu ngân và quản lý", 15, color=MUTED)
text(s, Inches(5.3), Inches(5.9), Inches(7.4), Inches(0.8), ["Trình bày: Business Analyst", "Go-live 01/03/2027"], 12, color=MUTED)

# 2. Vấn đề
s = hd("Vấn đề", "Phiếu giấy đang làm mất tiền và mất khách", 2)
stats(s, [("3–5", "lần sai/sót món mỗi ngày · ~AUD 900/tháng làm lại"), ("22'", "từ gọi món tới món đầu tiên giờ cao điểm"),
          ("1–2", "bill sai mỗi tuần · 0% hóa đơn ghi GST"), ("2", "sự cố dị ứng suýt xảy ra trong năm")])
text(s, MX, Inches(3.6), CW, Inches(2.2), [
    "• 42% đánh giá xấu trên Google nói về chờ lâu, 26% về sai/thiếu món (214 đánh giá, 12 tháng)",
    "• Phục vụ mất ≈ 95 phút mỗi ca tối chỉ để chạy phiếu vào bếp",
    "• Hết món báo miệng: khách biết sau 10–15 phút",
    "• Nguồn: quan sát ca tối 06/11, 912 phiếu giấy, 50 hóa đơn, khảo sát 15 nhân viên"], 15)

# 3. As-Is
s = hd("As-Is", "Quy trình hiện tại: 6 điểm đau", 3)
picture(s, ROOT / "04_Business_Process/diagrams/BP1_AsIs.png", MX, TOP, CW, Inches(3.4))
table(s, MX, Inches(5.3), CW, [["1 Chữ khó đọc", "2 Dị ứng ở lề phiếu", "3 Chạy phiếu 2–3'", "4 Mất liên 2", "5 Chờ trên móc 3'", "6 Hết món báo miệng"]],
      size=11, head_size=11, row_h=Inches(0.45))

# 4. Giải pháp
s = hd("Giải pháp", "HL-OMS: 4 ứng dụng trên một nền tảng", 4)
mods = [("App Phục vụ", ["• Sơ đồ bàn theo trạng thái", "• Gọi món ≤ 3 chạm", "• Khai báo dị ứng", "• Rung khi món xong"]),
        ("Màn hình Bếp", ["• Phiếu theo trạm", "• Bắt buộc xác nhận dị ứng", "• Cảnh báo món trễ", "• Báo hết món tức thì"]),
        ("Quầy Thu ngân", ["• GST, phụ thu lễ tự tính", "• Tách bill 2–10 phần", "• Tiền mặt làm tròn 5c", "• Tax invoice"]),
        ("Trang Quản lý", ["• Menu 72 món song ngữ", "• Duyệt hủy, giảm giá", "• Báo cáo, CSV", "• Nhật ký thao tác"])]
cw = (CW - Inches(0.3) * 3) / 4
for i, (t, b) in enumerate(mods):
    card(s, MX + (cw + Inches(0.3)) * i, TOP, cw, Inches(3.2), t, b, size=14)
rect(s, MX, Inches(5.25), CW, Inches(0.75), fill=INK)
text(s, MX + Inches(0.25), Inches(5.25), CW - Inches(0.5), Inches(0.75),
     "Web app trên điện thoại và màn cảm ứng · cloud tại Úc · chạy tiếp khi mất internet", 14, True, WHITE, anchor=MSO_ANCHOR.MIDDLE)

# 5. To-Be
s = hd("To-Be", "Đơn tới bếp trong 2 giây, không ai phải chạy phiếu", 5)
picture(s, ROOT / "04_Business_Process/diagrams/BP1_ToBe.png", MX, TOP, Inches(7.6), Inches(4.3))
table(s, Inches(8.6), TOP, W - MX - Inches(8.6), [["Chỉ số", "As-Is", "To-Be"], ["Đơn tới bếp", "5–10'", "≤ 2 giây"],
      ["Đi bộ đưa phiếu", "95'/ca", "0"], ["Biết món hết", "10–15'", "Ngay"], ["Cộng bill", "2–4'", "≤ 30 giây"], ["Hóa đơn có GST", "0%", "100%"]],
      col_w=[1.4, 0.9, 0.9], size=12, head_size=12, row_h=Inches(0.55))

# 6. Demo phục vụ + bếp
s = hd("Demo", "Phục vụ gọi món — bếp nhận ngay", 6)
x = MX
for f in ("SCR-03_goi-mon.png", "SCR-04_chi-tiet-mon.png"):
    pic = picture(s, SCR / f, x, TOP, Inches(2.6), Inches(4.6))
    x += pic.width + Inches(0.2)
picture(s, SCR / "SCR-07_kds.png", x + Inches(0.1), TOP, W - MX - x - Inches(0.1), Inches(4.6))
text(s, MX, Inches(6.45), CW, Inches(0.4), "Prototype click được: 07_UIUX/prototype/index.html · 19 màn hình · đồng bộ thời gian thực giữa các thiết bị", 11, color=MUTED)

# 7. Demo thu ngân + quản lý
s = hd("Demo", "Bill đúng luật, quản lý thấy số liệu ngay", 7)
half = (CW - Inches(0.3)) / 2
picture(s, SCR / "SCR-11_bill-thanh-toan.png", MX, TOP, half, Inches(4.6))
picture(s, SCR / "SCR-15_bao-cao.png", MX + half + Inches(0.3), TOP, half, Inches(4.6))

# 8. Giá trị
s = hd("Giá trị", "Mục tiêu đo được sau 6 tháng", 8)
table(s, MX, TOP, CW, [["Business Need", "Hiện tại", "Mục tiêu", "Đo bằng"],
      ["BN-01 Sai/sót món", "3–5 lần/ngày", "≤ 1 lần/ngày", "Nhật ký hủy, sổ bếp"],
      ["BN-02 Thời gian lên món", "22 phút", "≤ 15 phút", "Báo cáo thời gian chế biến"],
      ["BN-03 Bill sai", "1–2/tuần", "0", "Chốt ca, khiếu nại"],
      ["BN-05 Sự cố dị ứng", "2/năm", "0", "Nhật ký xác nhận dị ứng"],
      ["BN-07 Quay vòng bàn ca tối", "—", "+10%", "Số bill ca tối T6–T7"]],
      col_w=[1.6, 1, 1, 1.6], size=14, head_size=13, row_h=Inches(0.62))

# 9. Phạm vi và lộ trình
s = hd("Lộ trình", "MVP 35 User Story trong 5 sprint", 9)
steps = [("Discovery", "03–27/11"), ("S1–S2", "Menu, bàn, gọi món"), ("S3", "Bếp, thông báo"), ("S4", "Thanh toán"),
         ("S5", "Báo cáo, offline"), ("UAT", "15–26/02"), ("Go-live", "01/03/2027")]
sw = (CW - Inches(0.15) * 6) / 7
for i, (t, d) in enumerate(steps):
    x = MX + (sw + Inches(0.15)) * i
    on = i == 6
    rect(s, x, TOP, sw, Inches(1.2), fill=ACCENT if on else SOFT)
    text(s, x, TOP + Inches(0.18), sw, Inches(0.4), t, 15, True, WHITE if on else INK, align=PP_ALIGN.CENTER)
    text(s, x + Inches(0.05), TOP + Inches(0.62), sw - Inches(0.1), Inches(0.5), d, 11, color=WHITE if on else MUTED, align=PP_ALIGN.CENTER)
half = (CW - Inches(0.4)) / 2
card(s, MX, Inches(3.3), half, Inches(2.7), "MVP (go-live)", ["• Gọi món tại bàn và mang về", "• KDS 3 trạm, dị ứng, món trễ, hết món",
     "• Bill, GST, phụ thu, tách bill, chốt ca", "• Báo cáo, phân quyền, nhật ký, offline"], size=13)
card(s, MX + half + Inches(0.4), Inches(3.3), half, Inches(2.7), "V2 (dự kiến Q3/2027)", ["• Khách gọi món qua QR", "• Đặt bàn online",
     "• Hold & fire theo lượt", "• Tích hợp EFTPOS, đồng bộ Xero"], size=13, title_color=MUTED)

# 10. Chất lượng
s = hd("Chất lượng", "Yêu cầu truy vết đầy đủ, UAT đạt 100%", 10)
stats(s, [("35", "User Story MVP · 73 Acceptance Criteria"), ("20", "Use Case · 7 UCS đầy đủ · 7 BPMN"),
          ("99", "UAT test case · 100% đạt vòng 2"), ("0", "lỗ hổng truy vết (RTM tự động)")])
table(s, MX, Inches(3.6), CW, [["Truy vết", "Phủ"], ["Business Need → User Story", "7/7"], ["User Story → Use Case → Function → Test Case", "35/35"],
      ["Acceptance Criteria → Test Case", "73/73"], ["Luồng UCS (Basic/Alternative/Exception) → Test Case", "65/65"]],
      col_w=[4, 1], size=13, head_size=12, row_h=Inches(0.48))

# 11. Đầu tư
s = hd("Đầu tư", "Hoàn vốn khoảng 18 tháng", 11)
stats(s, [("AUD 49.200", "tổng chi phí năm 1 (phần mềm, phần cứng, thuê bao)"), ("AUD 40.700", "lợi ích mỗi năm khi đạt mục tiêu"),
          ("~18 tháng", "hoàn vốn (thận trọng ~25 · lạc quan ~14)"), ("AUD 45.900", "NPV 3 năm, chiết khấu 8%")])
table(s, MX, Inches(3.6), CW, [["Nguồn lợi ích", "AUD/năm"], ["Tăng lượt bàn ca tối T6–T7 (+10%)", "23.660"], ["Giảm làm lại món (−80%)", "8.640"],
      ["Rút ngắn chốt ca", "5.308"], ["Giảm thất thoát bill, phụ thu", "3.126"]], col_w=[4, 1], size=13, head_size=12, row_h=Inches(0.48))

# 12. Đề nghị
s = hd("Đề nghị", "Phê duyệt go-live 01/03/2027", 12)
card(s, MX, TOP, (CW - Inches(0.4)) / 2, Inches(3.6), "Đề nghị BOM", ["• Phê duyệt go-live 01/03/2027 (UAT đã ký 26/02)",
     "• Chạy song song phiếu giấy 1 tuần làm dự phòng", "• Xác nhận ngày lễ 26/04/2027 (Q-041) trước 01/04"], size=14)
card(s, MX + (CW + Inches(0.4)) / 2, TOP, (CW - Inches(0.4)) / 2, Inches(3.6), "Sau go-live", ["• Hypercare 4 tuần, có mặt ca tối T6–T7",
     "• Benefit review 01/06 và 01/09/2027", "• Quyết định phạm vi V2 theo số liệu"], size=14)
rect(s, MX, Inches(5.65), CW, Inches(0.6), fill=ACCENT_SOFT)
text(s, MX + Inches(0.2), Inches(5.65), CW, Inches(0.6), "Cảm ơn anh/chị — Hỏi & đáp", 15, True, ACCENT, anchor=MSO_ANCHOR.MIDDLE)

prs.save(OUT)
print(f"Đã ghi {OUT}")
