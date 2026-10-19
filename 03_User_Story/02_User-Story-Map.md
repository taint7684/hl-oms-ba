# User Story Map — HL-OMS

Cấu trúc: **User → Epic → Sub-epic → User Story**, sắp theo hành trình một ngày vận hành (chuẩn bị menu → đón khách → gọi món → bếp → lên món → thanh toán → kiểm soát). Release xếp từ trên xuống.

![User Story Map](02_User-Story-Map.png)

Bản HTML: [02_User-Story-Map.html](02_User-Story-Map.html) · sinh lại: `python tools/build_story_map.py`

## 1. Kế hoạch release

| Release | Mục tiêu | Story | SP |
|---|---|---|---|
| **MVP** (go-live 01/03/2027) | Thay toàn bộ phiếu giấy: gọi món → bếp → bill | 35 (28 Must · 7 Should) | 125 |
| **V2** (dự kiến Q3/2027) | Khách tự phục vụ, tích hợp ngoài | 5 (US-36 → US-40) | Ước lượng sau |

## 2. Mục tiêu từng sprint

| Sprint | Thời gian | Sprint goal | Story | SP |
|---|---|---|---|---|
| S1 | 30/11–11/12/2026 | Có menu, bàn, tài khoản để bắt đầu gọi món | US-01, US-02, US-26, US-27, US-28, US-33 | 18 |
| S2 | 14/12–23/12/2026 | Phục vụ gọi món và gửi được đơn | US-03 → US-09 | 26 |
| S3 | 04/01–15/01/2027 | Bếp nhận đơn, cập nhật món, phục vụ nhận thông báo | US-12 → US-20 | 29 |
| S4 | 18/01–29/01/2027 | Tính bill và thu tiền đúng quy định | US-10, US-11, US-21 → US-24, US-29 | 29 |
| S5 | 01/02–12/02/2027 | Báo cáo, kiểm soát, chạy khi mất mạng | US-25, US-30 → US-32, US-34, US-35 | 23 |

Velocity dự kiến 25–30 SP/sprint (2 FE, 1 BE, 1 QA). S1 nhẹ hơn vì có việc dựng môi trường.

## 3. Vì sao xếp như vậy

| Quyết định | Lý do |
|---|---|
| Menu (EP-07) làm ở S1 dù nằm ngoài luồng phục vụ | Gọi món cần dữ liệu menu thật để demo và kiểm thử |
| Mang về (US-11) ở S4 | Dùng lại luồng gọi món S2 và thu tiền S4 |
| Hủy món đã nấu (US-10) cùng sprint với duyệt (US-29) | Hai story chỉ có giá trị khi đi cùng nhau |
| Vận hành offline (US-35) ở S5, 8 SP | Rủi ro cao nhất (RK-01); làm khi luồng chính đã ổn định để kiểm thử đủ |
| QR, đặt bàn, EFTPOS, Xero → V2 | Ngoài ngân sách MVP; không chặn mục tiêu BN-01→BN-03 |
