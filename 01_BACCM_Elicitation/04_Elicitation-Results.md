# Kết quả Elicitation sau họp 1 — HL-OMS

> Dữ liệu giả lập của case study, nhất quán với [MOM-01](Meeting-01/03_MOM-01-Bien-ban-hop.md) và [Assumption Log](../00_Admin/Assumption-Log.md).

## 1. EL-02 Review tài liệu (04–05/11/2026)

| Tài liệu | Phát hiện | Dùng cho |
|---|---|---|
| Phiếu gọi món 1 tuần (912 phiếu) | 27 phiếu (3%) có gạch xóa/viết đè · 41 phiếu ghi tắt tên món (VD "BBH" = bún bò Huế) · 9 phiếu không ghi số bàn | BN-01, As-Is BP1 |
| Sổ làm lại món | 24 lần/tuần (≈ 3,4/ngày) — khớp ước tính 3–5/ngày của chủ NH | Baseline BN-01 |
| Menu in | 72 món, 9 danh mục, 3 nhóm tùy chọn; ký hiệu dị ứng chưa có | Dữ liệu menu |
| Hóa đơn viết tay (50 bản) | 4 bản cộng sai; 2 bản ngày lễ không có phụ thu; không bản nào ghi phần GST | BN-03, BR-09, BR-10 |
| Sổ chốt ca | Cộng tay doanh thu theo tiền mặt/EFTPOS, mất ~25 phút/ca | BN-06 |
| Sơ đồ mặt bằng | 18 bàn trong (T01–T18), 4 bàn hiên (P01–P04); bếp ở cuối, cách bàn xa nhất ~25 m | Sơ đồ bàn |

## 2. EL-03 Quan sát có cấu trúc — ca tối T6 06/11/2026, 18:00–21:00

| Chỉ số | Kết quả đo | Ghi chú |
|---|---|---|
| Số bàn quan sát | 31 lượt bàn (126 khách) | — |
| Thời gian ghi phiếu | 1,5–2 phút/bàn | Phục vụ hỏi lại món 6 lần |
| Một vòng chạy phiếu (bàn → bếp → bàn) | 2–3 phút, 38 vòng/3 giờ (4 phục vụ) | ≈ 95 phút đi bộ chỉ để đưa phiếu |
| Phiếu nằm trên móc bếp trước khi được đọc | TB 3 phút, tối đa 7 phút | Bếp trưởng đọc to và chia trạm bằng miệng |
| Gọi món → món đầu tiên lên bàn | TB 21 phút, tối đa 34 phút | Khớp baseline 22 phút (MOM-01) |
| Món xong phải chờ người mang ra | TB 4 phút; 1 món chờ 6 phút, nguội | Phục vụ không biết món đã xong |
| Lỗi quan sát được | 2 sai món (đọc nhầm ghi tắt) · 1 sót món nước · 1 bill thiếu món gọi thêm (mất liên 2) | — |
| Hết món | Cá kho tộ hết lúc 19:40, bàn T07 biết sau 12 phút | BP4 |
| Dị ứng | 3 bàn có yêu cầu; 1 ghi chú bị vết dầu che | BN-05 |
| Cộng bill | 2–4 phút/bàn | Thu ngân tra bảng giá giấy |

Kiểu quan sát: có cấu trúc (bảng ghi thời gian theo bước), không tham gia, đứng tại quầy và cửa bếp.

## 3. EL-04 Khảo sát nhân viên (04–06/11/2026, n = 15/16)

| Câu hỏi (đóng) | Kết quả |
|---|---|
| Dùng smartphone hằng ngày | 15/15 (100%) |
| Tự tin dùng app mới sau 1 lần hướng dẫn | 13/15 (87%) |
| Ngôn ngữ muốn dùng | Tiếng Việt 9 (60%) · Tiếng Anh 6 (40%) |
| Ưu tiên lớn nhất cho app | Ít chạm 11 (73%) · Chữ to 3 · Khác 1 |

| Câu hỏi (mở) | Ý kiến nổi bật |
|---|---|
| Điều mệt nhất trong ca | "Chạy vào bếp hỏi món xong chưa" (7 ý kiến) · "Đọc chữ của người khác" (4, phía bếp) |
| Lo ngại khi dùng hệ thống | "Mất mạng thì sao" (5) · "Pin điện thoại" (2) |

## 4. EL-05 Interface analysis

**Phản hồi của khách** — đánh giá Google 12 tháng: 214 đánh giá, TB 4,2★, 31 đánh giá ≤ 2★:

| Nhóm phàn nàn | Số | Tỷ lệ | BN |
|---|---|---|---|
| Chờ món lâu | 13 | 42% | BN-02 |
| Sai/thiếu món | 8 | 26% | BN-01 |
| Bill sai, phụ thu không rõ | 4 | 13% | BN-03 |
| Thái độ phục vụ | 3 | 10% | — |
| Khác | 3 | 10% | — |

**User testing và review với dev:** thực hiện trên prototype ngày 24/11/2026 — kết quả ở [UX Evaluation](../07_UIUX/04_UX-Evaluation.md).

## 5. EL-06 Workshop phạm vi MVP (10/11/2026) — MOM-02

| Nội dung | Kết quả |
|---|---|
| Thành phần | MGR (PO), CHF, CSH, BA, PM |
| User Story Map | Thống nhất 10 Epic, 40 User Story: 35 MVP, 5 V2 ([Product Backlog](../03_User_Story/01_Product-Backlog.md)) |
| Ưu tiên MVP | 28 Must, 7 Should |
| Ma trận phân quyền | Giữ như MOM-01 §3.4; thêm: Bếp trưởng được trả món về "Đang nấu" khi bấm nhầm |
| Ngưỡng món trễ | Bếp nóng 15 phút · Bếp lạnh 10 phút · Quầy nước 5 phút (CHF) |
| Mang về | Thanh toán trước khi gửi bếp (CSH) |
| AI-04 Kế toán | 09/11/2026 xác nhận nội dung tax invoice: chữ "Tax Invoice", tên + ABN nhà hàng, ngày, mô tả món, số lượng, giá, tổng GST; bill ≥ AUD 1.000 thêm tên/ABN người mua |
