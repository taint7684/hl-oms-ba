# UX Evaluation — HL-OMS

## 1. Đánh giá theo bối cảnh sử dụng

| Bối cảnh | Ràng buộc | Quyết định thiết kế | NFR |
|---|---|---|---|
| Phục vụ đi lại, một tay bưng khay | Thao tác bằng ngón cái | Nút chính ở dải dưới cùng; vùng chạm ≥ 44–48 px; thêm nhanh bằng nút + | NFR-10, NFR-11 |
| Bếp nóng, ẩm, tay ướt, đeo găng | Khó chạm chính xác, nhìn từ xa | Nền tối tương phản cao; tên món 20–24 px; mỗi món là một vùng chạm lớn; 1 chạm = 1 bước trạng thái | NFR-12 |
| Giờ cao điểm 45 đơn/giờ | Không có thời gian đọc kỹ | Màu viền cam/đỏ theo ngưỡng trễ; số phút chờ chữ lớn ở góc phiếu | BR-06 |
| Rủi ro dị ứng | Sai sót gây hại cho khách | Dải đỏ chiếm cả bề ngang phiếu; không cho nấu khi chưa bấm "Đã đọc dị ứng" | BR-04 |
| Nhân viên đa số người Việt, nhiều người bán thời gian | Học nhanh, đổi người thường xuyên | Tên món song ngữ; ngôn ngữ thao tác ngắn; PIN thay mật khẩu | NFR-09, NFR-13, NFR-15 |
| Mất internet 2–3 lần/tháng | Không được ngừng phục vụ | Thanh "Offline" luôn hiện, đếm thao tác chờ đồng bộ | NFR-06 |

## 2. Đánh giá theo 10 nguyên tắc Nielsen

| # | Nguyên tắc | Áp dụng trong HL-OMS | Đạt |
|---|---|---|:-:|
| 1 | Hiển thị trạng thái hệ thống | Trạng thái từng món, bàn, bill bằng chữ + màu; badge thông báo; banner Offline/Ngày lễ | ✓ |
| 2 | Khớp với thế giới thực | Thuật ngữ nhà hàng (Bàn, Lượt gọi thêm, Phiếu, Đã lấy); bill giống hóa đơn giấy | ✓ |
| 3 | Người dùng kiểm soát | Xóa món chưa gửi; Bếp trưởng hoàn tác; hủy tách bill khi chưa thu | ✓ |
| 4 | Nhất quán | Cùng bộ màu trạng thái ở cả 4 ứng dụng; cùng vị trí nút chính | ✓ |
| 5 | Phòng lỗi | Chặn món hết, chặn thiếu tùy chọn bắt buộc, chặn thanh toán khi còn món treo, chặn nấu khi chưa đọc dị ứng | ✓ |
| 6 | Nhận diện hơn ghi nhớ | Danh mục và tìm kiếm thay vì nhớ mã món; gợi ý món thay thế khi hết | ✓ |
| 7 | Linh hoạt, hiệu quả | Nút + thêm nhanh; "Xong cả phiếu"; nút tiền mặt nhanh $20/$50/$100/Đúng số | ✓ |
| 8 | Tối giản | Mỗi màn hình một nhiệm vụ chính; thông tin phụ cỡ chữ nhỏ, màu nhạt | ✓ |
| 9 | Giúp nhận biết và sửa lỗi | Thông báo nói rõ lỗi và cách sửa ("Chọn độ cay", "Còn thiếu $x", danh sách món chưa phục vụ) | ✓ |
| 10 | Trợ giúp | Kịch bản demo trong app; hướng dẫn 1 trang/vai trò (NFR-18) | ✓ |

## 3. User testing — EL-07 (24/11/2026)

> Buổi thử giả lập theo case study.

| Mục | Nội dung |
|---|---|
| Người tham gia | 2 phục vụ (1 bán thời gian), 1 bếp, Bếp trưởng, Thu ngân |
| Phương pháp | Mỗi người làm 5 nhiệm vụ trên prototype, nghĩ to thành tiếng; BA ghi thời gian và lỗi |
| Thiết bị | Điện thoại Android của nhà hàng, màn hình 22" đặt tại bếp |

| Nhiệm vụ | Người làm | Hoàn thành | Thời gian TB | Mục tiêu |
|---|---|---|---|---|
| T1 Mở bàn, gọi 3 món (1 món có tùy chọn), gửi bếp | Phục vụ | 2/2 | 48 giây | ≤ 60 giây |
| T2 Khai báo dị ứng đậu phộng cho một món | Phục vụ | 2/2 | 9 giây | ≤ 15 giây |
| T3 Xác nhận dị ứng, nấu, báo xong một phiếu 3 món | Bếp | 1/1 | 14 giây | ≤ 20 giây |
| T4 Báo hết món và mở bán lại | Bếp trưởng | 1/1 | 11 giây | ≤ 15 giây |
| T5 Thanh toán bàn ngày lễ, tách đều 3 phần, tiền mặt | Thu ngân | 1/1 | 62 giây | ≤ 90 giây |

**Tỷ lệ hoàn thành:** 7/7 lượt (100%) · NFR-09 đạt trong buổi thử.

| # | Phát hiện | Mức | Thay đổi đã đưa vào prototype |
|---|---|---|---|
| 1 | Phục vụ gõ "pho" không ra "Phở" | Cao | Tìm kiếm không phân biệt dấu |
| 2 | Bếp chạm nhầm sang Sẵn sàng, không quay lại được | Cao | Bếp trưởng có nút "Hoàn tác" (AC-17.2) |
| 3 | Phục vụ không biết món mình chọn có chứa chất khách dị ứng | Cao | Cảnh báo vàng "Món có chứa …" ngay trong bảng chi tiết món |
| 4 | Thu ngân phải gõ số tiền mặt mỗi lần | Trung bình | Nút nhanh $20 · $50 · $100 · Đúng số |
| 5 | Đơn dài làm nút Gửi bếp trôi khỏi màn hình | Trung bình | Thanh nút cố định dưới cùng |
| 6 | Bếp muốn biết phiếu nào là gọi thêm | Thấp | Nhãn "Lượt 2 · GỌI THÊM" trên phiếu |

**Review với dev (EL-05):** dev xác nhận làm được trong ngân sách; lưu ý cần hub mạng nội bộ cho chế độ offline (đã có trong NFR-06, RK-01).
