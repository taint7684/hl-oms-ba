# Business Rules — HL-OMS

Mỗi rule có một ID duy nhất, được User Story, UCS, Function và Test Case tham chiếu. Rule có điều kiện ghép ghi rõ cổng logic (Bài 3: AND · OR · XOR).

## 1. Danh mục Business Rule

| ID | Nhóm | Quy tắc | Cổng logic | Nguồn |
|---|---|---|---|---|
| BR-01 | Gọi món | Chỉ thêm được món có trạng thái **Còn bán** và **số phần còn lại > 0** (hoặc không giới hạn số phần) | AND | MOM-01 §3.1 |
| BR-02 | Gọi món | Chỉ gửi bếp khi đơn gắn với bàn **Có khách** hoặc đơn mang về đã thanh toán, và có **≥ 1 món Mới** | AND | MOM-01 §3.1 |
| BR-03 | Bếp | Mỗi món tự chuyển tới đúng **một** trạm khai báo trong menu: Bếp nóng · Bếp lạnh · Quầy nước | — | MOM-01 §3.3 |
| BR-04 | An toàn | Món chỉ chuyển sang **Đang nấu** khi **không có dị ứng** HOẶC **bếp đã bấm "Đã đọc dị ứng"** | OR | MOM-01 §3.5 |
| BR-05 | Hủy món | Cần Quản lý duyệt khi hủy món ở trạng thái **Đang nấu** HOẶC **Sẵn sàng** HOẶC **Đã phục vụ**; món **Chờ nấu** phục vụ tự hủy | OR | MOM-01 §3.1 |
| BR-06 | Bếp | Món trễ khi thời gian từ lúc gửi vượt ngưỡng trạm (Bếp nóng 15' · Bếp lạnh 10' · Quầy nước 5'): vượt ngưỡng → cam, vượt 1,5 × ngưỡng → đỏ | — | MOM-02 |
| BR-07 | Tồn món | Gửi bếp trừ số phần còn lại; về 0 thì món tự chuyển **Hết**; hủy món chưa nấu trả lại số phần | — | MOM-01 §3.1 |
| BR-08 | Giá | Giá của món lấy theo khung giờ tại **thời điểm thêm món vào đơn**; Lunch Special 11:00–15:00, thứ 2–6. Sửa giá không đổi món đã gọi | — | MOM-01 §3.5 |
| BR-09 | Thuế | Giá đã gồm GST 10%. **GST = Tổng thanh toán ÷ 11**, làm tròn 2 chữ số, ghi "GST included" | — | MOM-01 §3.2, ATO |
| BR-10 | Phụ thu | Ngày có trong danh sách ngày lễ NSW: **Phụ thu = 15% × (Tạm tính − Giảm giá)**, một dòng riêng trên bill; menu ghi "A surcharge of 15% applies on public holidays" | — | MOM-01 §3.2, ACCC |
| BR-11 | Giảm giá | Cần Quản lý duyệt khi **giảm > 10% giá trị** HOẶC **miễn phí món**; ≤ 10% thu ngân tự áp; luôn bắt buộc lý do | OR | MOM-01 §3.2 |
| BR-12 | Thanh toán | Chốt thanh toán tại bàn khi **mọi món ở Đã phục vụ hoặc Đã hủy** VÀ **không còn yêu cầu chờ duyệt** VÀ **bill đã được khách xác nhận** | AND | MOM-01 §3.2 |
| BR-13 | Mang về | Đơn mang về thanh toán đủ trước khi gửi bếp | — | MOM-02 |
| BR-14 | Tách bill | Một bill chọn **một** trong hai: tách theo món XOR chia đều (2–10 phần). Tổng các phần = tổng bill; chia đều thì phần cuối nhận số lẻ | XOR | MOM-01 §3.2 |
| BR-15 | Tiền mặt | Tiền mặt làm tròn tổng tới 5 cent gần nhất (…1–2 → …0; …3–4 → …5; …6–7 → …5; …8–9 → …10); EFTPOS thu đúng số tiền | — | Thực hành tiền mặt tại Úc |
| BR-16 | Hóa đơn | Tax invoice in khi khách yêu cầu, gồm: chữ "Tax Invoice", tên + ABN nhà hàng, ngày, mô tả món, số lượng, giá, tổng GST; bill ≥ AUD 1.000 thêm tên/ABN người mua | — | AI-04 (MOM-02) |
| BR-17 | Bàn | Bàn về **Trống** khi bill **Đã thanh toán** VÀ phục vụ xác nhận **đã dọn** | AND | MOM-01 §3.1 |
| BR-18 | Bàn | Chỉ chuyển tới bàn **Trống**; ghép bàn gộp đơn về bàn chính, bàn phụ khóa tới khi tách hoặc thanh toán | — | MOM-01 §3.1 |
| BR-19 | Kiểm soát | Mọi thao tác hủy món, giảm giá, sửa giá, chuyển/ghép bàn, đổi quyền ghi nhật ký: người làm, thời điểm, giá trị trước/sau, lý do, người duyệt. Nhật ký không sửa/xóa được | — | BN-04 |
| BR-20 | Hủy đơn | Hủy toàn bộ đơn không cần duyệt khi **không có món nào** đã Đang nấu trở đi; ngược lại áp BR-05 cho từng món | — | MOM-01 §3.1 |
| BR-21 | Chốt ca | Chốt ca khi không còn bill mở; chênh lệch tiền mặt > AUD 5 bắt buộc ghi lý do | — | MOM-01 §3.4 |

## 2. Cổng logic áp vào rule

| Cổng | Rule | Biểu thức | Bảng chân trị (1 = đúng) |
|---|---|---|---|
| **AND** | BR-12 Thanh toán | `MónXong AND KhôngChờDuyệt AND KháchXácNhận` | 1·1·1 → **1**; còn lại → 0 |
| **AND** | BR-01 Gọi món | `CònBán AND SốPhần>0` | 1·1 → 1 · 1·0 → 0 · 0·1 → 0 · 0·0 → 0 |
| **OR** | BR-05 Hủy cần duyệt | `ĐangNấu OR SẵnSàng OR ĐãPhụcVụ` | Bất kỳ một điều kiện = 1 → **cần duyệt** |
| **OR** | BR-11 Giảm giá cần duyệt | `Giảm>10% OR MiễnPhíMón` | 0·0 → 0 (tự áp) · 0·1 → 1 · 1·0 → 1 · 1·1 → 1 |
| **OR** | BR-04 Được bắt đầu nấu | `KhôngDịỨng OR ĐãĐọcDịỨng` | 0·0 → 0 (bị chặn) · các trường hợp còn lại → 1 |
| **XOR** | BR-14 Cách tách bill | `TáchTheoMón XOR ChiaĐều` | 0·0 → 0 (không tách, trả gộp) · 1·0 → 1 · 0·1 → 1 · 1·1 → **0 (không cho phép)** |

## 3. Ví dụ tính bill (dùng trong UAT)

| Dòng | Ngày thường | Ngày lễ |
|---|---|---|
| Tạm tính | 100,00 | 100,00 |
| Giảm giá 10% | −10,00 | −10,00 |
| Phụ thu 15% × 90,00 | — | +13,50 |
| **Tổng** | **90,00** | **103,50** |
| GST included (Tổng ÷ 11) | 8,18 | 9,41 |
| Tiền mặt (làm tròn 5 cent) | 90,00 | 103,50 |

Ví dụ làm tròn tiền mặt: 47,83 → 47,85 · 47,82 → 47,80 · 47,87 → 47,85 · 47,88 → 47,90.
