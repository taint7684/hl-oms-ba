# Phân loại thông tin và Business Case — HL-OMS

Bước 1–2 của "What should we do first?": phân loại thông tin thu được (MOM-01, Elicitation Results) theo 5 nhóm, rồi xác định business case trong phạm vi.

## 1. Phân loại thông tin

| # | Thông tin thu được | Nhóm | Chuyển thành | Nguồn |
|---|---|---|---|---|
| 1 | Phục vụ chọn món từ menu chuẩn, có tùy chọn và ghi chú | Functional | US-04, US-05 | MOM-01 §3.1 |
| 2 | Ghi nhận dị ứng theo 11 nhóm chất, bếp xác nhận đã đọc | Functional | US-06, US-16, BR-04 | MOM-01 §3.5 |
| 3 | Đơn tự chia theo 3 trạm bếp | Functional | US-07, BR-03 | MOM-01 §3.3 |
| 4 | Món chưa nấu: phục vụ tự hủy; đang nấu/đã xong: Quản lý duyệt | Functional | US-09, US-10, BR-05 | MOM-01 §3.1 |
| 5 | Bếp trưởng báo hết món, đặt số phần còn lại | Functional | US-20, BR-01, BR-07 | MOM-01 §3.1 |
| 6 | GST = Tổng ÷ 11; phụ thu lễ 15%; giảm giá > 10% cần duyệt | Functional | BR-09, BR-10, BR-11 | MOM-01 §3.2 |
| 7 | Tách bill theo món hoặc chia đều, tối đa 10 phần | Functional | US-23, BR-14 | MOM-01 §3.2 |
| 8 | Mang về tại quầy, thanh toán trước khi gửi bếp | Functional | US-11, BR-13 | MOM-01 §3.1, MOM-02 |
| 9 | Báo cáo doanh thu ngày/ca, top món, thời gian chế biến, nhật ký hủy/giảm giá | Functional | US-30→US-32 | MOM-01 §3.5 |
| 10 | Thao tác một tay, ≤ 3 chạm cho món phổ biến | Usability | NFR-10, NFR-11 | MOM-01 §3.3, EL-04 |
| 11 | Màn bếp đọc được trong môi trường nóng, ẩm, tay ướt | Usability | NFR-12 | EL-03 |
| 12 | Giao diện EN mặc định, VI tùy chọn (60% nhân viên muốn VI) | Usability | NFR-13 | MOM-01 §3.3, EL-04 |
| 13 | Nhân viên mới học xong ≤ 30 phút | Usability | NFR-09 | MOM-01 §3.4 |
| 14 | Internet mất 2–3 lần/tháng, 5–20 phút | Reliability | NFR-06, US-35 | MOM-01 §3.4 |
| 15 | Hoạt động suốt giờ mở cửa 11:00–22:30 | Reliability | NFR-05 | MOM-01 §3.6 |
| 16 | Phân quyền 6 vai trò; ghi nhật ký hủy/giảm giá | Reliability (Security) | NFR-14→NFR-17 | MOM-01 §3.4 |
| 17 | Đỉnh 45 đơn/giờ, ~180 món/giờ | Performance | NFR-03 | MOM-01 §3.1 |
| 18 | Đơn tới bếp ngay khi gửi (hiện mất 2–3 phút chạy phiếu + 3 phút chờ) | Performance | NFR-01 | EL-03 |
| 19 | ~12 thiết bị dùng cùng lúc | Performance | NFR-02 | MOM-01 §3.3 |
| 20 | Không có IT nội bộ; Quản lý làm Admin; hỗ trợ ≤ 30 phút | Supportability | NFR-18, NFR-19 | MOM-01 §3.6 |
| 21 | Cập nhật phần mềm không ảnh hưởng giờ bán | Supportability | NFR-20 | MOM-01 §3.6 |
| 22 | Có thể mở chi nhánh 2 trong 2 năm | Supportability (Scalability) | NFR-21 | MOM-01 §3.6 |

## 2. Business Case trong phạm vi

| ID | Business Case | Mô tả | Người dùng chính | BN | Quy trình |
|---|---|---|---|---|---|
| BC-01 | Gọi món tại bàn | Mở bàn, chọn món, ghi dị ứng, gửi bếp, gọi thêm | Phục vụ | BN-01, BN-05 | BP1 |
| BC-02 | Gọi món mang về | Tạo đơn tại quầy, thu tiền trước, gửi bếp | Thu ngân | BN-01 | BP1 (biến thể) |
| BC-03 | Chế biến và lên món | Nhận đơn theo trạm, nấu, báo xong, mang ra | Bếp, Bếp trưởng, Phục vụ | BN-02, BN-07 | BP2 |
| BC-04 | Xử lý hết món, đổi món, hủy món | Báo hết, chặn gọi, hủy có duyệt | Bếp trưởng, Phục vụ, Quản lý | BN-04 | BP4 |
| BC-05 | Thanh toán | Bill, giảm giá, tách bill, thu tiền, hóa đơn | Thu ngân | BN-03 | BP3 |
| BC-06 | Cập nhật menu | Món, giá, khung giờ, ngày lễ | Quản lý | BN-04 | BP5 |
| BC-07 | Chốt ca và báo cáo | Đối soát tiền mặt, xem báo cáo | Thu ngân, Quản lý | BN-06 | — |
| BC-08 | Quản trị hệ thống | Tài khoản, quyền, nhật ký | Admin | BN-04 | — |

Ngoài phạm vi: khách tự gọi món qua QR, đặt bàn online, giao hàng, kho nguyên liệu, khách hàng thân thiết, tích hợp EFTPOS/cổng thanh toán, Xero (→ V2, xem [Product Backlog](../03_User_Story/01_Product-Backlog.md) §3).
