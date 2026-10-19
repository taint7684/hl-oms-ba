# Go-live Plan và Benefit Review — HL-OMS

| Mục | Nội dung |
|---|---|
| Ngày go-live | Thứ Hai 01/03/2027 (ngày thấp điểm, sau UAT ký 26/02/2027) |
| Hình thức | Chuyển đổi toàn bộ một lần; phiếu giấy giữ làm phương án dự phòng 1 tuần |
| Hypercare | 01/03–28/03/2027 · vendor có mặt tại nhà hàng ca tối T6–T7 |

## 1. Checklist trước go-live

| # | Việc | Phụ trách | Hạn | Trạng thái |
|---|---|---|---|---|
| 1 | UAT ký nghiệm thu, 0 lỗi Critical/High mở | OWN, PM | 26/02 | Xong |
| 2 | Nhập 72 món, giá, Lunch Special, tùy chọn; Bếp trưởng xác nhận dị ứng và trạm từng món (RK-10) | MGR, CHF, BA | 24/02 | Xong |
| 3 | Lịch ngày lễ NSW 2027 trong hệ thống; xác nhận 26/04 (Q-041) | MGR | 01/04 | Mở |
| 4 | Tạo 16 tài khoản, phát PIN, khóa tài khoản đã nghỉ | Admin | 26/02 | Xong |
| 5 | Lắp KDS (giá treo xa bếp nóng), máy in, hub mạng; SSID riêng cho thiết bị OMS (RK-12) | Vendor | 25/02 | Xong |
| 6 | Diễn tập mất mạng: rút cáp internet 20 phút giữa ca thử (TC-021, TC-022) | QA, MGR | 25/02 | Xong |
| 7 | Đào tạo 6 vai trò, mỗi người ≤ 30 phút + bài kiểm 5 nhiệm vụ (NFR-09) | BA | 27/02 | Xong |
| 8 | In hướng dẫn 1 trang/vai trò dán tại quầy, bếp ([User Guide](User-Guide.md)) | BA | 27/02 | Xong |
| 9 | Menu in mới có câu "A surcharge of 15% applies on public holidays" | OWN | 27/02 | Xong |
| 10 | Kênh hỗ trợ: số hotline, nhóm chat, nút báo lỗi trong app (NFR-19) | PM | 27/02 | Xong |

## 2. Kế hoạch ngày go-live

| Giờ | Việc | Ai |
|---|---|---|
| 09:30 | Bật thiết bị, kiểm đăng nhập, in thử phiếu, KDS 3 trạm | Vendor, MGR |
| 10:30 | Họp đầu ca 15 phút: nhắc 3 điểm (dị ứng, Gửi bếp, Đã mang ra) | BA, MGR |
| 11:00 | Mở cửa; vendor đứng tại quầy và bếp | Vendor |
| 15:00 | Rà nhanh lỗi ca trưa, sửa cấu hình nếu cần | BA, PM |
| 22:30 | Chốt ca trên hệ thống, so với sổ tay | CSH, MGR |
| 23:00 | Họp 15 phút: ghi vấn đề vào backlog | BA, PO |

**Điều kiện quay lại phiếu giấy:** hệ thống không dùng được > 30 phút trong giờ mở cửa, hoặc sai tiền lặp lại. Quyết định: Quản lý NH, báo Chủ NH.

## 3. Benefit Review

| BN | Chỉ số | Baseline | Mục tiêu | Nguồn dữ liệu | Đo |
|---|---|---|---|---|---|
| BN-01 | Lần làm lại món/ngày | 3,4 | ≤ 1 | Nhật ký hủy "Gọi nhầm/Món lỗi" + sổ bếp | Hằng tuần |
| BN-02 | TG gọi → món đầu tiên (giờ cao điểm) | 21–22 phút | ≤ 15 phút | Báo cáo thời gian chế biến + served_at | Hằng tuần |
| BN-03 | Bill sai/tuần | 1–2 | 0 | Khiếu nại, chênh lệch chốt ca | Hằng tuần |
| BN-04 | % hủy/giảm giá có lý do + người duyệt | 0% | 100% | Nhật ký thao tác | Hằng tháng |
| BN-05 | Sự cố dị ứng | 2/năm | 0 | Sổ sự cố + nhật ký xác nhận dị ứng | Hằng tháng |
| BN-06 | Thời gian chốt ca | ~25 phút | ≤ 5 phút | Quan sát | Mốc 3 tháng |
| BN-07 | Lượt bàn ca tối T6–T7 | Đo tuần 1 | +10% | Số bill ca tối | Mốc 3, 6 tháng |

| Mốc | Ngày | Nội dung | Người nhận |
|---|---|---|---|
| Kết thúc hypercare | 28/03/2027 | Báo cáo lỗi, mức dùng hệ thống, phản hồi nhân viên | OWN, MGR |
| Benefit review 1 | 01/06/2027 | So BN-01 → BN-07 với mục tiêu; điều chỉnh vận hành | OWN |
| Benefit review 2 | 01/09/2027 | Kết luận đạt mục tiêu 6 tháng; quyết định V2 (QR, EFTPOS, Xero) | OWN |
