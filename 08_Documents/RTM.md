# Requirements Traceability Matrix — HL-OMS

> Sinh tự động bởi `python tools/build_rtm.py` từ Product Backlog, Use Case list, Function list, UCS và UAT Test Cases. Không sửa tay.

## 1. Độ phủ

| Kiểm tra | Kết quả |
|---|---|
| Business Need có User Story MVP | 7/7 |
| User Story MVP có Use Case | 35/35 |
| User Story MVP có Function | 35/35 |
| User Story MVP có Test Case | 35/35 |
| Acceptance Criteria có Test Case | 73/73 |
| Luồng UCS (BF/AF/EF) có Test Case | 65/65 |
| Business Rule được kiểm | 21/21 |
| Lỗ hổng truy vết | 0 |

## 2. Ma trận Business Need → User Story → Use Case → Function → Màn hình → Test Case

| BN | US | User Story | UC | Function | SCR | BR | AC | TC |
|---|---|---|---|---|---|---|---|---|
| BN-07 | US-01 | Phục vụ — xem sơ đồ bàn kèm trạng thái từng bàn | UC-07 | F-02.1 | SCR-02 | BR-17 | AC-01.1, AC-01.2, AC-01.3 | TC-001, TC-002 |
| BN-01 | US-02 | Phục vụ — mở bàn và ghi số khách | UC-07 | F-02.2 | SCR-02 | BR-02 | AC-02.1, AC-02.2 | TC-003, TC-004 |
| BN-03 | US-03 | Phục vụ — chuyển bàn hoặc ghép bàn | UC-07 | F-02.3 | SCR-05 | BR-18 | AC-03.1, AC-03.2, AC-03.3 | TC-005, TC-006 |
| BN-01 | US-04 | Phục vụ — chọn món từ menu theo danh mục hoặc tìm theo tên | UC-01 | F-03.1 | SCR-03 | BR-01, BR-08 | AC-04.1, AC-04.2, AC-04.3 | TC-007, TC-008, TC-009, TC-010, TC-017, TC-019 |
| BN-01 | US-05 | Phục vụ — chọn tùy chọn (độ cay, cỡ, topping) và ghi chú cho món | UC-01 | F-03.2 | SCR-04 | — | AC-05.1, AC-05.2, AC-05.3 | TC-012, TC-013, TC-014 |
| BN-05 | US-06 | Phục vụ — ghi nhận chất gây dị ứng của khách cho từng món | UC-01 | F-03.2 | SCR-04 | BR-04 | AC-06.1, AC-06.2, AC-06.3 | TC-015, TC-016 |
| BN-02 | US-07 | Phục vụ — gửi đơn tới bếp | UC-02 | F-03.5 | SCR-05 | BR-02, BR-03, BR-07 | AC-07.1, AC-07.2, AC-07.3 | TC-024, TC-025, TC-026, TC-027, TC-029 |
| BN-03 | US-08 | Phục vụ — gọi thêm món vào đơn đang mở | UC-01 | F-03.3 | SCR-05 | BR-02 | AC-08.1 | TC-028, TC-071 |
| BN-01 | US-09 | Phục vụ — sửa hoặc hủy món chưa nấu | UC-08 | F-03.4 | SCR-05 | BR-05, BR-07 | AC-09.1, AC-09.2 | TC-018, TC-038, TC-050, TC-054, TC-055 |
| BN-04 | US-10 | Phục vụ — gửi yêu cầu hủy món đã nấu kèm lý do | UC-08 | F-03.4 | SCR-05 | BR-05, BR-19 | AC-10.1, AC-10.2 | TC-051, TC-056, TC-058 |
| BN-01 | US-11 | Thu ngân — tạo đơn mang về tại quầy và thu tiền trước | UC-10 | F-03.6 | SCR-19 | BR-13 | AC-11.1, AC-11.2, AC-11.3 | TC-030, TC-083 |
| BN-02 | US-12 | Phục vụ — nhận thông báo khi món sẵn sàng | UC-09 | F-04.5 | SCR-06, SCR-07 | — | AC-12.1, AC-12.2 | TC-002, TC-039 |
| BN-02 | US-13 | Phục vụ — xác nhận đã mang món ra bàn | UC-09 | F-04.5 | SCR-06, SCR-07 | — | AC-13.1 | TC-040 |
| BN-04 | US-14 | Phục vụ — biết món đã hết ngay khi chọn | UC-01 | F-01.3 | SCR-03, SCR-08 | BR-01 | AC-14.1, AC-14.2 | TC-010, TC-011, TC-020 |
| BN-01, BN-02 | US-15 | Bếp — xem đơn mới của trạm mình theo thứ tự thời gian | UC-03 | F-04.1 | SCR-07 | BR-03 | AC-15.1, AC-15.2 | TC-032 |
| BN-05 | US-16 | Bếp — thấy cảnh báo dị ứng nổi bật và xác nhận đã đọc | UC-03 | F-04.3 | SCR-07 | BR-04 | AC-16.1, AC-16.2 | TC-033 |
| BN-02 | US-17 | Bếp — đánh dấu món đang nấu và đã xong | UC-03 | F-04.2 | SCR-07 | — | AC-17.1, AC-17.2 | TC-034, TC-035, TC-036 |
| BN-02 | US-18 | Bếp — thấy món nào đang trễ | UC-03 | F-04.3 | SCR-07 | BR-06 | AC-18.1 | TC-037 |
| BN-02 | US-19 | Bếp trưởng — xem tổng số phần đang chờ theo từng món và trạm | UC-11 | F-04.4 | SCR-08 | — | AC-19.1 | TC-041 |
| BN-04 | US-20 | Bếp trưởng — báo hết món, đặt số phần còn lại hoặc mở bán lại | UC-04 | F-01.3 | SCR-03, SCR-08 | BR-01, BR-07 | AC-20.1, AC-20.2, AC-20.3 | TC-025, TC-042, TC-043, TC-044, TC-045, TC-046, TC-047, TC-048 |
| BN-03 | US-21 | Thu ngân — xem bill của bàn với tổng tiền, GST và phụ thu | UC-05 | F-05.1, F-05.2 | SCR-09, SCR-11 | BR-09, BR-10, BR-12 | AC-21.1, AC-21.2 | TC-057, TC-059, TC-060, TC-073 |
| BN-03, BN-04 | US-22 | Thu ngân — áp giảm giá cho bill hoặc từng món | UC-05 | F-05.3 | SCR-11 | BR-11, BR-19 | AC-22.1, AC-22.2 | TC-063, TC-064, TC-068 |
| BN-03 | US-23 | Thu ngân — tách bill theo món hoặc chia đều | UC-06 | F-05.4 | SCR-10 | BR-14 | AC-23.1, AC-23.2, AC-23.3 | TC-074, TC-075, TC-076, TC-077, TC-078, TC-079, TC-080, TC-081, TC-082 |
| BN-03 | US-24 | Thu ngân — ghi nhận thanh toán và in hóa đơn hoặc tax invoice | UC-05 | F-05.5 | SCR-11 | BR-12, BR-15, BR-16 | AC-24.1, AC-24.2, AC-24.3 | TC-061, TC-062, TC-065, TC-066, TC-069, TC-070, TC-072 |
| BN-06 | US-25 | Thu ngân — chốt ca và đối soát tiền mặt | UC-16 | F-05.6 | SCR-12 | BR-21 | AC-25.1, AC-25.2 | TC-084, TC-085 |
| BN-01, BN-05 | US-26 | Quản lý — thêm, sửa món, danh mục, tùy chọn, chất gây dị ứng, trạm chế biến | UC-13 | F-01.1, F-01.4 | SCR-13 | BR-03 | AC-26.1, AC-26.2 | TC-086, TC-087 |
| BN-03 | US-27 | Quản lý — đặt giá riêng theo khung giờ (Lunch Special) | UC-13 | F-01.2 | SCR-13, SCR-18 | BR-08 | AC-27.1 | TC-009 |
| BN-03 | US-28 | Quản lý — khai báo ngày lễ và mức phụ thu | UC-14 | F-05.2, F-07.5 | SCR-11, SCR-18 | BR-10 | AC-28.1, AC-28.2 | TC-067, TC-088 |
| BN-04 | US-29 | Quản lý — duyệt hoặc từ chối yêu cầu hủy món đã nấu và giảm giá vượt ngưỡng | UC-12 | F-07.3 | SCR-14 | BR-05, BR-11, BR-19 | AC-29.1, AC-29.2 | TC-052, TC-053 |
| BN-06 | US-30 | Quản lý — xem doanh thu theo ngày, ca, phương thức thanh toán và xuất CSV | UC-15 | F-06.1 | SCR-15 | — | AC-30.1, AC-30.2 | TC-089 |
| BN-06, BN-02 | US-31 | Quản lý — xem món bán chạy và thời gian chế biến trung bình theo trạm | UC-15 | F-06.2 | SCR-15 | — | AC-31.1 | TC-090 |
| BN-04 | US-32 | Quản lý — xem nhật ký hủy món và giảm giá | UC-15 | F-06.3 | SCR-15 | BR-19 | AC-32.1 | TC-091 |
| BN-04 | US-33 | Admin — tạo tài khoản, gán vai trò và mã PIN | UC-17, UC-19 | F-07.1, F-07.2 | SCR-01, SCR-16 | — | AC-33.1, AC-33.2 | TC-023, TC-092, TC-093, TC-094 |
| BN-04 | US-34 | Admin — xem nhật ký thao tác của hệ thống | UC-18 | F-07.4 | SCR-17 | BR-19 | AC-34.1 | TC-095 |
| BN-02 | US-35 | Phục vụ, Bếp — tiếp tục gọi món và nhận đơn khi mất internet | UC-20 | F-08.1, F-08.2 | SCR-02, SCR-07 | — | AC-35.1, AC-35.2, AC-35.3 | TC-021, TC-022, TC-031, TC-049 |

## 3. Business Need → kết quả đo

| BN | Nhu cầu | Số User Story | Số Test Case |
|---|---|---|---|
| BN-01 | Giảm sai/sót món | 7 | 21 |
| BN-02 | Rút ngắn thời gian lên món | 9 | 19 |
| BN-03 | Bill chính xác, đúng GST và phụ thu | 8 | 30 |
| BN-04 | Kiểm soát hết món, hủy món, giảm giá | 8 | 25 |
| BN-05 | An toàn dị ứng | 3 | 5 |
| BN-06 | Có số liệu quản trị | 3 | 4 |
| BN-07 | Tăng quay vòng bàn ca tối | 1 | 2 |

## 4. Luồng UCS → Test Case

| UC | Luồng | Test Case |
|---|---|---|
| UC-01 | BF | TC-007, TC-008, TC-009, TC-013, TC-014, TC-015, TC-016, TC-097, TC-099 |
| UC-01 | AF-01 | TC-017 |
| UC-01 | AF-02 | TC-028 |
| UC-01 | AF-03 | TC-018 |
| UC-01 | AF-04 | TC-019 |
| UC-01 | EF-01 | TC-010 |
| UC-01 | EF-02 | TC-012 |
| UC-01 | EF-03 | TC-020 |
| UC-01 | EF-04 | TC-021 |
| UC-01 | EF-05 | TC-023 |
| UC-02 | BF | TC-024, TC-025, TC-096 |
| UC-02 | AF-01 | TC-028 |
| UC-02 | AF-02 | TC-029 |
| UC-02 | AF-03 | TC-030 |
| UC-02 | EF-01 | TC-026 |
| UC-02 | EF-02 | TC-027 |
| UC-02 | EF-03 | TC-021 |
| UC-02 | EF-04 | TC-031 |
| UC-03 | BF | TC-032, TC-034, TC-098 |
| UC-03 | AF-01 | TC-033 |
| UC-03 | AF-02 | TC-035 |
| UC-03 | AF-03 | TC-036 |
| UC-03 | AF-04 | TC-037 |
| UC-03 | EF-01 | TC-038 |
| UC-03 | EF-02 | TC-039 |
| UC-03 | EF-03 | TC-031 |
| UC-04 | BF | TC-042, TC-043 |
| UC-04 | AF-01 | TC-011, TC-044 |
| UC-04 | AF-02 | TC-045 |
| UC-04 | AF-03 | TC-046 |
| UC-04 | EF-01 | TC-047 |
| UC-04 | EF-02 | TC-048 |
| UC-04 | EF-03 | TC-049 |
| UC-05 | BF | TC-059, TC-061, TC-073 |
| UC-05 | AF-01 | TC-062 |
| UC-05 | AF-02 | TC-063 |
| UC-05 | AF-03 | TC-064 |
| UC-05 | AF-04 | TC-065 |
| UC-05 | AF-05 | TC-066 |
| UC-05 | AF-06 | TC-074 |
| UC-05 | AF-07 | TC-067 |
| UC-05 | EF-01 | TC-057, TC-060 |
| UC-05 | EF-02 | TC-068 |
| UC-05 | EF-03 | TC-069 |
| UC-05 | EF-04 | TC-070 |
| UC-05 | EF-05 | TC-071 |
| UC-05 | EF-06 | TC-072 |
| UC-06 | BF | TC-074 |
| UC-06 | AF-01 | TC-075 |
| UC-06 | AF-02 | TC-076 |
| UC-06 | AF-03 | TC-077 |
| UC-06 | AF-04 | TC-078 |
| UC-06 | EF-01 | TC-079 |
| UC-06 | EF-02 | TC-080 |
| UC-06 | EF-03 | TC-081 |
| UC-06 | EF-04 | TC-082 |
| UC-08 | BF | TC-050 |
| UC-08 | AF-01 | TC-051 |
| UC-08 | AF-02 | TC-052 |
| UC-08 | AF-03 | TC-053 |
| UC-08 | AF-04 | TC-054 |
| UC-08 | AF-05 | TC-055 |
| UC-08 | EF-01 | TC-056 |
| UC-08 | EF-02 | TC-057 |
| UC-08 | EF-03 | TC-058 |

## 5. Business Rule → Test Case

| BR | Test Case |
|---|---|
| BR-01 | TC-010, TC-042 |
| BR-02 | TC-003, TC-024, TC-026 |
| BR-03 | TC-024, TC-029, TC-032, TC-086 |
| BR-04 | TC-015, TC-016, TC-033, TC-035 |
| BR-05 | TC-038, TC-050, TC-051, TC-052, TC-053, TC-055 |
| BR-06 | TC-037 |
| BR-07 | TC-011, TC-020, TC-025, TC-027, TC-044, TC-050 |
| BR-08 | TC-009, TC-087 |
| BR-09 | TC-059 |
| BR-10 | TC-067, TC-088 |
| BR-11 | TC-063, TC-064, TC-068, TC-076 |
| BR-12 | TC-057, TC-060, TC-071, TC-073 |
| BR-13 | TC-030, TC-083 |
| BR-14 | TC-074, TC-075, TC-076, TC-078, TC-079, TC-080, TC-081, TC-082 |
| BR-15 | TC-062, TC-070, TC-077 |
| BR-16 | TC-065 |
| BR-17 | TC-004, TC-061 |
| BR-18 | TC-005, TC-006 |
| BR-19 | TC-005, TC-036, TC-050, TC-052, TC-056, TC-063, TC-087, TC-091, TC-095 |
| BR-20 | TC-054 |
| BR-21 | TC-084, TC-085 |
