# Assumption Log — HL-OMS

| Mục | Nội dung |
|---|---|
| Mục đích | Ghi mọi giả định BA tự đặt khi chưa được hỏi khách (đề bài: buổi đầu không hỏi thêm về công ty) |
| Quy tắc | Mỗi giả định có căn cứ, tác động nếu sai, người xác nhận, câu hỏi liên kết `Q-xxx`. Không xóa dòng — chỉ đổi trạng thái |
| Trạng thái | `Mở` · `Đã xác nhận` · `Điều chỉnh` (ghi giá trị mới) · `Bác bỏ` |
| Nguồn xác nhận | `MOM-01` = [Biên bản họp 1](../01_BACCM_Elicitation/Meeting-01/03_MOM-01-Bien-ban-hop.md) |

## 1. Bảng giả định

| ID | Nhóm | Giả định ban đầu | Căn cứ | Tác động nếu sai | Xác nhận với | Q liên kết | Trạng thái | Kết quả xác nhận |
|---|---|---|---|---|---|---|---|---|
| A-01 | Quy mô | 15–20 bàn, 1 khu trong nhà | Đề bài | Sơ đồ bàn, số thiết bị | Quản lý | Q-011 | Điều chỉnh | 18 bàn trong nhà (T01–T18) + 4 bàn hiên (P01–P04), ~80 chỗ — MOM-01 §3.1 |
| A-02 | Nhân sự | 6–10 nhân viên/ca | Đề bài | Số tài khoản, số thiết bị | Quản lý | Q-028 | Đã xác nhận | Ca tối: 4 phục vụ, 1 bếp trưởng, 3 bếp, 1 pha chế, 1 thu ngân, 1 quản lý ca — MOM-01 §3.4 |
| A-03 | Quy trình hiện tại | Gọi món bằng phiếu giấy, phục vụ mang vào bếp | Đề bài | Phân tích As-Is | Quản lý, Bếp trưởng | Q-001 | Điều chỉnh | Phiếu giấy 2 liên: liên 1 vào bếp, liên 2 kẹp ở quầy thu ngân để tính bill — MOM-01 §3.1 |
| A-04 | Thiết bị | Phục vụ dùng tablet/điện thoại; v1 không có QR cho khách | Đề bài | Thiết kế UI, phạm vi | Chủ NH | Q-012, Q-027 | Đã xác nhận | 5 điện thoại Android nhà hàng cấp (4 dùng + 1 dự phòng) — MOM-01 §3.3 |
| A-05 | Thiết bị | Bếp có KDS hoặc máy in phiếu | Đề bài | Thiết kế màn bếp | Bếp trưởng | Q-013 | Điều chỉnh | 2 màn KDS cảm ứng (Bếp nóng, Bếp lạnh) + 1 tablet ở quầy pha chế; giữ 1 máy in nhiệt dự phòng — MOM-01 §3.3 |
| A-06 | Thanh toán | Thu tại quầy bằng EFTPOS/tiền mặt; không tích hợp cổng thanh toán ở v1 | Đề bài | Phạm vi UC thanh toán | Chủ NH | Q-019 | Đã xác nhận | Máy EFTPOS độc lập; thu ngân ghi nhận phương thức và số tiền vào OMS — MOM-01 §3.2 |
| A-07 | Thuế | Giá menu đã gồm GST 10%; GST hiển thị = Tổng ÷ 11 | Đề bài + quy định GST Úc | Công thức bill sai | Chủ NH, kế toán | Q-020 | Đã xác nhận | MOM-01 §3.2 |
| A-08 | Phụ thu | Có phụ thu ngày lễ | Đề bài | BR tính bill, nội dung menu | Chủ NH | Q-021 | Điều chỉnh | 15% trên toàn bill vào ngày lễ NSW; menu ghi "A surcharge of 15% applies on public holidays" — MOM-01 §3.2 |
| A-09 | Phụ thu | Không thu phụ phí thẻ ở v1 | EFTPOS độc lập, OMS không biết loại thẻ | Thiếu BR | Chủ NH | Q-022 | Đã xác nhận | Không thu phụ phí thẻ — MOM-01 §3.2 |
| A-10 | Menu | 60–80 món, có tùy chọn (độ cay, cỡ, thêm topping) | Quy mô NH Việt điển hình | Thiết kế dữ liệu menu | Quản lý, Bếp trưởng | Q-015 | Điều chỉnh | 72 món, 9 danh mục, 3 nhóm tùy chọn — MOM-01 §3.5 |
| A-11 | Dị ứng | Ghi chú dị ứng theo 11 nhóm chất gây dị ứng của FSANZ (Std 1.2.3) + ô "khác" | Quy định Úc | Rủi ro an toàn thực phẩm | Bếp trưởng | Q-006 | Đã xác nhận | Bắt buộc hỏi khách, hiển thị nổi bật trên KDS — MOM-01 §3.5 |
| A-12 | Bếp | Bếp chia trạm; đơn tự định tuyến theo trạm | Thực tế bếp nhà hàng | Thiết kế KDS | Bếp trưởng | Q-014 | Đã xác nhận | 3 trạm: Bếp nóng · Bếp lạnh · Quầy nước — MOM-01 §3.3 |
| A-13 | Hạ tầng | Wi-Fi nội bộ ổn; internet có thể chập chờn giờ cao điểm | Rủi ro chung | NFR khả dụng/offline | Chủ NH | Q-030 | Đã xác nhận | Đã mất mạng 2–3 lần/tháng, mỗi lần 5–20 phút — MOM-01 §3.4 |
| A-14 | Ngôn ngữ | Giao diện tiếng Anh, có tùy chọn tiếng Việt; tên món song ngữ | Nhân viên đa số là người Việt | UI, dữ liệu menu | Quản lý | Q-010 | Đã xác nhận | MOM-01 §3.3 |
| A-15 | Người dùng | Nhân viên luân ca, nhiều sinh viên bán thời gian, kỹ năng công nghệ cơ bản | Đặc thù ngành F&B tại Sydney | NFR usability, đào tạo | Quản lý | Q-029 | Đã xác nhận | ~40% bán thời gian; nghỉ việc ~3 người/quý — MOM-01 §3.4 |
| A-16 | Tách bill | Tách theo món hoặc chia đều | Thực tế phổ biến | UC Split Bill | Thu ngân, Quản lý | Q-023 | Đã xác nhận | Tối đa 10 phần/bill — MOM-01 §3.2 |
| A-17 | Tip | Không quản lý tip ở v1 | Tip ở Úc không bắt buộc | Phạm vi | Chủ NH | Q-024 | Đã xác nhận | Tip qua EFTPOS do máy EFTPOS ghi; OMS không ghi — MOM-01 §3.2 |
| A-18 | Báo cáo | Báo cáo cơ bản: doanh thu ngày, món bán chạy | Đề bài | Phạm vi báo cáo | Chủ NH, Quản lý | Q-016 | Điều chỉnh | Thêm: doanh thu theo phương thức TT, thời gian chế biến TB, nhật ký hủy/giảm giá — MOM-01 §3.5 |
| A-19 | Triển khai | Web app (PWA) chạy trên trình duyệt, máy chủ cloud đặt tại Úc | Chi phí thấp, không cần cài app | NFR, chi phí | Chủ NH | Q-031 | Đã xác nhận | MOM-01 §3.6 |
| A-20 | Thương mại | Có ngân sách và thời hạn go-live | Cần cho lập kế hoạch | Phạm vi MVP | Chủ NH | Q-033, Q-034 | Điều chỉnh | Trần ngân sách MVP AUD 45.000; go-live 01/03/2027 (sau Tết, mùa thấp điểm) — MOM-01 §3.6 |
| A-21 | Tải | Cao điểm tối T6–T7 khoảng 40 đơn/giờ | Ước theo 18–22 bàn, quay vòng 2 lượt | NFR hiệu năng | Quản lý | Q-005 | Điều chỉnh | Đỉnh 45 đơn/giờ, ~180 món/giờ — MOM-01 §3.1 |
| A-22 | Hủy món | Hủy món đã bắt đầu nấu cần quản lý ca duyệt | Kiểm soát thất thoát | BR hủy | Chủ NH | Q-008 | Đã xác nhận | MOM-01 §3.1 |
| A-23 | Phạm vi | Mang về (take-away) gọi tại quầy nằm ngoài v1 | Đề bài chỉ nêu tại bàn | Phạm vi | Chủ NH | Q-004 | Điều chỉnh | Đưa vào MVP dưới dạng "bàn ảo" TA-xx, không giao hàng — MOM-01 §3.1 |
| A-24 | Giảm giá | Có giảm giá thủ công, cần ngưỡng duyệt | Kiểm soát thất thoát | BR thanh toán | Chủ NH | Q-025 | Điều chỉnh | Thu ngân giảm ≤ 10%; > 10% cần Quản lý duyệt — MOM-01 §3.2 |
| A-25 | Dữ liệu cá nhân | v1 không lưu dữ liệu cá nhân của khách | Giảm phạm vi tuân thủ Privacy Act 1988 | NFR bảo mật | Chủ NH | Q-032 | Đã xác nhận | MOM-01 §3.6 |

## 2. Tổng hợp

| Trạng thái | Số lượng |
|---|---|
| Đã xác nhận | 15 |
| Điều chỉnh | 10 |
| Mở | 0 |
| Bác bỏ | 0 |
| **Tổng** | **25** |
