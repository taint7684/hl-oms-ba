# Meeting Pack — Họp 1 với BOM HL Restaurant

| Mục | Nội dung |
|---|---|
| Phiên bản | 1.0 — 30/10/2026, gửi HL trước họp. Nội dung dựa trên giả định, chưa có trả lời của khách |
| Họp | 03/11/2026, 14:30–16:30, tại HL Restaurant |
| Kèm theo | [Slide trình bày](02_HL-OMS_Meeting-01.pptx) · [Question Log](../../00_Admin/Question-Log.md) · [Assumption Log](../../00_Admin/Assumption-Log.md) |
| Sau họp | Kết quả ở [MOM-01](03_MOM-01-Bien-ban-hop.md); thay đổi so với pack ở [Change Log](../../00_Admin/Change-Log.md) |

## 1. Accept the offer — tóm tắt yêu cầu ban đầu

HL Restaurant (nhà hàng Việt, Sydney CBD) cần số hóa quy trình **gọi món và chế biến** để giảm sai món, lên món nhanh hơn và tính bill chính xác. Vendor nhận đề bài, đề xuất phạm vi MVP và phương pháp Scrum, go-live trước mùa cao điểm kế tiếp.

| Hạng mục | Đề xuất |
|---|---|
| Trong phạm vi MVP | Menu và tình trạng còn/hết · Bàn · Tạo/sửa đơn, gửi bếp · Bếp nhận đơn, cập nhật trạng thái món · Thông báo món sẵn sàng · Bill, GST, phụ thu, tách bill, ghi nhận thanh toán · Phân quyền · Báo cáo cơ bản |
| Ngoài phạm vi | Khách tự gọi món qua QR · Đặt bàn online · Giao hàng (Uber Eats…) · Kho nguyên liệu · Khách hàng thân thiết · Tích hợp cổng thanh toán |

## 2. BACCM

Xem [BACCM](../01_BACCM.md) (bản 1.0 dùng giả định; bản 1.1 bổ sung số liệu sau họp).

## 3. Phân tích nhu cầu theo nhóm người dùng

| Người dùng | Nhu cầu | Loại | Ưu tiên |
|---|---|---|---|
| Phục vụ | Ghi món nhanh, đúng; không phải chạy phiếu; biết món nào đã xong | Chức năng + Usability | Must |
| Phục vụ | Thao tác một tay khi đang bưng khay | Usability | Must |
| Bếp | Đọc đơn rõ, đúng trạm; thấy ghi chú dị ứng nổi bật | Chức năng + An toàn | Must |
| Bếp | Biết món nào ưu tiên, món nào đang trễ | Chức năng | Should |
| Bếp trưởng | Xem tổng đơn chờ theo trạm, điều phối; báo hết món | Chức năng | Must |
| Thu ngân | Bill tự tính đúng GST, phụ thu; tách bill nhanh | Chức năng + Tuân thủ | Must |
| Quản lý | Cập nhật menu, giá; xem báo cáo; kiểm soát hủy/giảm giá | Chức năng | Must |
| Chủ nhà hàng | Thấy doanh thu, giảm thất thoát, ROI rõ | Kinh doanh | Must |
| Khách | Lên món nhanh, đúng, an toàn dị ứng | Kết quả | — |

## 4. Initiate Solution — Function → Feature → Value

| Function (hệ thống cần làm được) | Feature (công cụ thực hiện) | Value / Benefit | BN |
|---|---|---|---|
| Ghi nhận đơn tại bàn | Sơ đồ bàn · Menu theo danh mục, tìm nhanh · Tùy chọn món · Ghi chú, chọn chất gây dị ứng | Hết lỗi chữ khó đọc, ghi tắt | BN-01, BN-05 |
| Chuyển đơn tới bếp | Gửi đơn thời gian thực, tự chia theo trạm (Bếp nóng · Bếp lạnh · Quầy nước) | Bỏ chạy phiếu 2–3 phút/lần | BN-02 |
| Điều phối chế biến | KDS: hàng đợi theo thời gian, màu cảnh báo món trễ, trạng thái từng món | Lên món đúng thứ tự, nhanh hơn | BN-02 |
| Kiểm soát tình trạng món | Bếp trưởng bật/tắt "Hết món", đặt số phần còn lại; app phục vụ chặn gọi món hết | Không nhận món không làm được | BN-04 |
| Báo món sẵn sàng | Thông báo + rung trên điện thoại phục vụ kèm số bàn | Món nóng ra đúng lúc | BN-02, BN-07 |
| Tính bill và thanh toán | Tự cộng, GST = Tổng ÷ 11, phụ thu ngày lễ, giảm giá có duyệt, tách bill theo món/chia đều, ghi nhận phương thức | Bill đúng, đúng quy định | BN-03 |
| Kiểm soát thao tác | Phân quyền theo vai trò · Duyệt hủy món đang nấu · Nhật ký thao tác | Giảm thất thoát | BN-04 |
| Cung cấp số liệu | Báo cáo doanh thu ngày, món bán chạy | Quyết định dựa trên dữ liệu | BN-06 |

## 5. Presentation — dàn ý slide

| # | Slide | Nội dung |
|---|---|---|
| 1 | Tiêu đề | HL-OMS — Họp khởi động, 03/11/2026 |
| 2 | Về chúng tôi | Công ty phần mềm, kinh nghiệm F&B, đội dự án |
| 3 | Hiểu về HL | Nhà hàng Việt, Sydney CBD, quy mô, giờ cao điểm |
| 4 | Vấn đề | Phát biểu vấn đề + As-Is vs To-Be |
| 5 | BACCM | 6 khái niệm trên một trang |
| 6 | Nhu cầu theo người dùng | Bảng mục 3 |
| 7 | Giải pháp đề xuất | 4 phân hệ + Function → Feature → Value |
| 8 | Phạm vi MVP | Trong / ngoài phạm vi |
| 9 | Cách làm | Scrum, Discovery 4 tuần, lịch dự kiến |
| 10 | Hôm nay cần thống nhất | Nhóm câu hỏi chính, bước tiếp theo |

## 6. Question List

40 câu, 6 nhóm, gắn người trả lời và kỹ thuật: [Question Log](../../00_Admin/Question-Log.md).

## 7. Kỹ thuật elicitation

| Kỹ thuật | Áp dụng cho HL | Khi nào |
|---|---|---|
| Phỏng vấn | BOM, Quản lý, Bếp trưởng, Thu ngân | Họp 1 |
| Quan sát (job shadowing) | Ca tối T6: phục vụ chạy phiếu, bếp đọc phiếu, thu ngân cộng bill | Sau họp 1 |
| Khảo sát | Mức quen công nghệ của nhân viên | Sau họp 1 |
| Review tài liệu | Phiếu giấy, menu, hóa đơn, sổ chốt ca, mặt bằng | Sau họp 1 |
| Interface analysis | Đánh giá Google, khiếu nại của khách; user testing prototype; review với dev | Sau họp 1, khi có prototype |

Kế hoạch chi tiết: [Elicitation Plan](../02_Elicitation-Plan.md).
