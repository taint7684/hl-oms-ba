# UAT Plan, Test Cases và Report — HL-OMS

| Mục | Nội dung |
|---|---|
| Phiên bản | 1.0 — 26/02/2027 |
| Căn cứ | Acceptance Criteria ([Product Backlog](../03_User_Story/01_Product-Backlog.md)) · 7 UCS ([05_Use_Case_Activity/03_UCS](../05_Use_Case_Activity/03_UCS)) · BR · NFR |
| Quy tắc phủ | Mỗi AC có ≥ 1 TC · Mỗi Basic / Alternative / Exception Flow của UCS có ≥ 1 TC · kiểm bằng `python tools/build_rtm.py` |
| Môi trường | Bản UAT trên cloud (region Úc) · 5 điện thoại, 2 KDS, 1 tablet, máy in nhiệt, máy EFTPOS thật (chế độ test) tại nhà hàng |
| Dữ liệu | 72 món, 22 bàn, 16 tài khoản, lịch ngày lễ NSW ([dữ liệu mẫu](../06_Function_Feature_State/data)) |

> Kết quả thực thi là dữ liệu giả lập của case study.

## 1. Kế hoạch UAT

| Hạng mục | Nội dung |
|---|---|
| Thời gian | 15/02–26/02/2027 · Vòng 1: 15–19/02 · Sửa lỗi: 20–22/02 · Vòng 2: 23–25/02 · Ký: 26/02 |
| Người thực hiện | Phục vụ (2), Bếp (1), Bếp trưởng, Thu ngân, Quản lý NH (PO) · BA hướng dẫn và ghi kết quả · QA hỗ trợ |
| Điều kiện bắt đầu | Kiểm thử hệ thống đạt; 0 lỗi Critical mở; dữ liệu menu được Bếp trưởng xác nhận |
| Điều kiện kết thúc | 100% TC High đạt · ≥ 95% tổng TC đạt · 0 lỗi Critical/High mở · Chủ NH ký |
| Mức lỗi | Critical: chặn vận hành/sai tiền/an toàn · High: sai quy tắc có cách tránh · Medium: sai hiển thị · Low: thẩm mỹ |

## 2. Test Cases

**Loại:** CN chức năng (luồng chính, AC) · NL ngoại lệ · PCN phi chức năng. **Kết quả:** P đạt · F lỗi · — không chạy lại.

| TC | Tên | Loại | US · AC | UC · Flow | BR · NFR | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Ưu tiên | Lần 1 | Lần 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-001 | Sơ đồ bàn đủ khu và trạng thái | CN | US-01 · AC-01.1, AC-01.2 | UC-07 BF | — | Phục vụ đã đăng nhập | Mở Sơ đồ bàn | 18 bàn Trong nhà, 4 bàn Hiên; màu đúng Trống/Có khách/Chờ thanh toán/Cần dọn; có số khách, số phút | High | P | — |
| TC-002 | Chuông và thông báo món sẵn sàng | CN | US-01, US-12 · AC-01.3, AC-12.1 | UC-09 BF | — | Món của T03 vừa chuyển Sẵn sàng | Xem Sơ đồ bàn và điện thoại phục vụ phụ trách T03 | T03 có 🔔; điện thoại rung, thông báo "Bàn T03 · 2 × Cà phê sữa đá" | High | P | — |
| TC-003 | Mở bàn trống | CN | US-02 · AC-02.1 | UC-07 BF | BR-02 | T01 Trống | Chạm T01 → 2 khách → Mở bàn | T01 Có khách, đơn Draft, mở màn Gọi món | High | P | — |
| TC-004 | Không mở bàn đang có khách hoặc cần dọn | NL | US-02 · AC-02.2 | UC-07 BF | BR-17 | T03 Có khách, T12 Cần dọn | Chạm T03; chạm T12 | T03 mở đơn hiện có; T12 hỏi xác nhận đã dọn; không tạo đơn mới | Medium | P | — |
| TC-005 | Chuyển bàn | CN | US-03 · AC-03.1, AC-03.3 | UC-07 BF | BR-18, BR-19 | T09 có đơn, T10 Trống | Đơn T09 → ⋯ → Chuyển sang T10 | Danh sách đích chỉ có bàn Trống; đơn sang T10; T09 Cần dọn; nhật ký "Chuyển bàn" | Medium | P | — |
| TC-006 | Ghép bàn | CN | US-03 · AC-03.2, AC-03.3 | UC-07 BF | BR-18 | T15, T16 Có khách | Đơn T15 → Ghép T16 | Món T16 gộp vào đơn T15; T16 hiện "Ghép T15"; nhật ký | Medium | P | — |
| TC-007 | Chọn món theo danh mục | CN | US-04 · AC-04.1 | UC-01 BF | — | Đang ở Gọi món | Chọn danh mục Phở | Hiện 8 món Phở | High | P | — |
| TC-008 | Tìm món không dấu | CN | US-04 · AC-04.1 | UC-01 BF | — | Đang ở Gọi món | Gõ "bun cha" | Ra "Bún chả Hà Nội" | Medium | P | — |
| TC-009 | Giá Lunch Special theo thời điểm thêm món | CN | US-04, US-27 · AC-04.2, AC-27.1 | UC-01 BF | BR-08 | Thứ Ba 14:58 | Thêm Phở bò tái; đợi 15:01; thêm Phở bò tái | Món 1 giá 17,50 (gạch 20,00); món 2 giá 20,00; món 1 giữ 17,50 | High | P | — |
| TC-010 | Món hết không chọn được | NL | US-04, US-14 · AC-04.3, AC-14.1 | UC-01 EF-01 | BR-01 | M41 Hết | Chạm Cơm cá kho tộ | Món mờ, nhãn Hết; không mở chi tiết; gợi ý 3 món Cơm còn bán | High | P | — |
| TC-011 | Nhãn "Còn n" | CN | US-14 · AC-14.2 | UC-04 AF-01 | BR-07 | M22 còn 2 phần | Xem danh mục Phở | Phở hải sản có nhãn "Còn 2" | Medium | P | — |
| TC-012 | Thiếu tùy chọn bắt buộc | NL | US-05 · AC-05.1 | UC-01 EF-02 | — | — | Phở bò tái, không chọn Cỡ → Thêm vào đơn | Nhóm Cỡ tô đỏ, thông báo "Chọn Cỡ", không thêm món | High | P | — |
| TC-013 | Giá tùy chọn cộng thêm | CN | US-05 · AC-05.2 | UC-01 BF | — | — | Phở bò tái · Lớn (+3,00) · Thêm bò (+4,00) · SL 2 | Đơn giá 27,00; thành tiền 54,00 | High | P | — |
| TC-014 | Ghi chú tối đa 100 ký tự | NL | US-05 · AC-05.3 | UC-01 BF | — | — | Nhập ghi chú 120 ký tự | Chỉ nhận 100 ký tự | Low | P | — |
| TC-015 | Khai báo nhiều chất gây dị ứng | CN | US-06 · AC-06.1, AC-06.3 | UC-01 BF | BR-04 | — | Bún chả · chọn Đậu phộng, Mè, Khác "hạt điều" | Món trong đơn có 3 nhãn đỏ | High | P | — |
| TC-016 | Cảnh báo món chứa chất khách dị ứng | CN | US-06 · AC-06.2 | UC-01 BF | BR-04 | — | Gỏi cuốn tôm thịt · chọn Đậu phộng | Hiện cảnh báo "Món có chứa Đậu phộng" | High | P | — |
| TC-017 | Thêm nhanh món phổ biến | CN | US-04 · AC-04.1 | UC-01 AF-01 | NFR-10 | Đang ở Đơn của bàn | + Gọi món → Đồ uống → + Trà đá | 3 chạm; Trà đá SL 1 trạng thái Mới | High | P | — |
| TC-018 | Xóa món chưa gửi | CN | US-09 · AC-09.1 | UC-01 AF-03 | — | Đơn có món Mới | Xóa món | Món biến mất, không cần duyệt, không ghi KDS | Medium | P | — |
| TC-019 | Thu ngân gọi món hộ | CN | US-04 · AC-04.1 | UC-01 AF-04 | NFR-14 | Thu ngân đăng nhập App Phục vụ | Gọi 2 món cho T04, gửi bếp | Thành công như phục vụ | Low | P | — |
| TC-020 | Chọn quá số phần còn lại | NL | US-14 · AC-14.2 | UC-01 EF-03 | BR-07 | M22 còn 2 | Chọn SL 3 → Thêm | Báo "Chỉ còn 2 phần", không thêm | Medium | P | — |
| TC-021 | Gọi món khi mất internet | NL | US-35 · AC-35.1 | UC-01 EF-04, UC-02 EF-03, UC-20 BF | NFR-06 | Rút cáp internet của router (Wi-Fi nội bộ vẫn chạy) | Gọi món, gửi bếp | KDS nhận qua mạng nội bộ ≤ 2 giây; banner "Offline"; đếm thao tác chờ đồng bộ | High | P | — |
| TC-022 | Đồng bộ lại khi có internet | NL | US-35 · AC-35.2 | UC-20 BF | NFR-06 | Sau TC-021, 12 thao tác chờ | Cắm lại cáp | 12/12 thao tác lên máy chủ, không trùng; banner tắt | High | P | — |
| TC-023 | Tự khóa sau 2 phút | NL | US-33 · AC-33.2 | UC-01 EF-05, UC-19 BF | NFR-15 | Đơn đang có món Mới | Để yên 2 phút; đăng nhập lại | Về màn PIN; đơn nháp giữ nguyên | Medium | P | — |
| TC-024 | Gửi bếp đúng trạm | CN | US-07 · AC-07.1, AC-07.2 | UC-02 BF | BR-02, BR-03, NFR-01 | Đơn T01: Phở bò tái, Gỏi cuốn, Trà đá | Gửi bếp | Phở → Bếp nóng, Gỏi cuốn → Bếp lạnh, Trà đá → Quầy nước, ≤ 2 giây; món → Chờ nấu | High | P | — |
| TC-025 | Trừ số phần khi gửi | CN | US-07, US-20 · AC-07.3, AC-20.2 | UC-02 BF | BR-07 | M53 còn 3 | Gửi 2 phần; gửi tiếp 1 phần | Còn 1; sau đó Hết | High | P | — |
| TC-026 | Không gửi khi không có món mới | NL | US-07 · AC-07.1 | UC-02 EF-01 | BR-02 | Đơn chỉ có món đã gửi | Mở đơn | Nút Gửi bếp tắt | Medium | P | — |
| TC-027 | Món hết trong lúc chờ gửi | NL | US-07 · AC-07.3 | UC-02 EF-02 | BR-07 | Đơn có M22 Mới; Bếp trưởng đặt M22 Hết | Gửi bếp | M22 bị giữ lại, báo "vừa hết"; món khác gửi bình thường | High | P | — |
| TC-028 | Gọi thêm món | CN | US-08 · AC-08.1 | UC-01 AF-02, UC-02 AF-01 | — | T03 đã gửi lượt 1 | Thêm 1 món, gửi bếp | Phiếu "Lượt 2 · GỌI THÊM"; cùng đơn, cùng bill | High | P | — |
| TC-029 | Đơn chỉ có đồ uống | CN | US-07 · AC-07.2 | UC-02 AF-02 | BR-03 | — | Gửi 2 Cà phê sữa đá | Chỉ Quầy nước có phiếu | Low | P | — |
| TC-030 | Phiếu mang về | CN | US-11 · AC-11.3 | UC-02 AF-03 | BR-13 | Đơn TA đã thanh toán | Xem KDS | Phiếu nhãn "MANG VỀ" + mã TA-xx | Medium | P | — |
| TC-031 | KDS không phản hồi → in dự phòng | NL | US-35 · AC-35.3 | UC-02 EF-04, UC-03 EF-03 | NFR-08 | Ngắt mạng màn KDS Bếp nóng | Gửi đơn có món Bếp nóng; bấm 🖨 trên phiếu khác | Sau 10 giây máy in in phiếu, Bếp trưởng nhận cảnh báo; nút 🖨 in được | High | F (DEF-01) | P |
| TC-032 | Phiếu theo thứ tự thời gian | CN | US-15 · AC-15.1, AC-15.2 | UC-03 BF | BR-03 | 3 đơn gửi 19:00, 19:02, 19:05 | Mở KDS Bếp nóng | Phiếu cũ nhất bên trái; đủ số bàn, giờ gửi, phút chờ, tùy chọn, ghi chú; chỉ món Bếp nóng | High | P | — |
| TC-033 | Chặn nấu khi chưa đọc dị ứng | CN | US-16 · AC-16.1, AC-16.2 | UC-03 AF-01 | BR-04 | T05 có món dị ứng Đậu phộng | Chạm món; bấm "Đã đọc dị ứng"; chạm lại | Lần 1 không đổi trạng thái; sau xác nhận → Đang nấu; nhật ký "Xác nhận dị ứng" | High | P | — |
| TC-034 | Chuyển trạng thái món | CN | US-17 · AC-17.1 | UC-03 BF | — | Món Chờ nấu | Chạm 2 lần | Đang nấu → Sẵn sàng, có giờ; phục vụ nhận thông báo | High | P | — |
| TC-035 | Xong cả phiếu | CN | US-17 · AC-17.1 | UC-03 AF-02 | BR-04 | Phiếu 3 món, 1 món dị ứng chưa đọc | Bấm "Xong cả phiếu" | 2 món Sẵn sàng; món dị ứng giữ nguyên, báo cần xác nhận | Medium | P | — |
| TC-036 | Bếp trưởng hoàn tác | CN | US-17 · AC-17.2 | UC-03 AF-03 | BR-19 | Món vừa chuyển Sẵn sàng | Bếp trưởng bấm "Hoàn tác"; đăng nhập Bếp thường | Món về Đang nấu, thông báo phục vụ tắt, nhật ký; Bếp thường không thấy nút | Medium | P | — |
| TC-037 | Cảnh báo món trễ | CN | US-18 · AC-18.1 | UC-03 AF-04 | BR-06 | Phiếu Bếp nóng chờ 16' và 23' | Xem KDS | Phiếu 16' viền cam, 23' viền đỏ | High | P | — |
| TC-038 | Món đã hủy trên KDS | NL | US-09 · AC-09.1 | UC-03 EF-01 | BR-05 | Phục vụ hủy món Chờ nấu | Xem KDS | Món gạch ngang "Đã hủy", không chạm được, tự biến mất sau 60 giây | Medium | P | — |
| TC-039 | Nhắc lại thông báo | NL | US-12 · AC-12.2 | UC-03 EF-02 | — | Món Sẵn sàng, phục vụ không xử lý | Đợi 2 phút; đợi thêm 2 phút | Nhắc lại lần 1 cho phục vụ phụ trách; lần 2 gửi mọi phục vụ trong ca | Medium | P | — |
| TC-040 | Xác nhận đã phục vụ | CN | US-13 · AC-13.1 | UC-09 BF | — | Món Sẵn sàng | Phục vụ bấm "Đã mang ra" (hoặc bếp bấm "Đã lấy") | Món Đã phục vụ; thông báo tắt; phiếu rời KDS | High | P | — |
| TC-041 | Tổng hợp bếp | CN | US-19 · AC-19.1 | UC-11 BF | — | 12 món đang chờ | Bếp trưởng mở Tổng hợp, lọc Bếp nóng | Số phần chờ/đang nấu theo món đúng với KDS | Medium | P | — |
| TC-042 | Báo hết món | CN | US-20 · AC-20.1 | UC-04 BF | BR-01, NFR-01 | — | Bếp trưởng bấm Hết cho Phở bò chín | App phục vụ chặn món ≤ 2 giây; nhật ký "Báo hết món" | High | P | — |
| TC-043 | Báo phục vụ bàn bị ảnh hưởng | CN | US-20 · AC-20.1 | UC-04 BF | — | T05 có Phở bò chín Chờ nấu | Báo Hết món | Phục vụ T05 nhận "Phở bò chín đã hết — báo khách đổi món hoặc hủy" | High | P | — |
| TC-044 | Đặt số phần về 0 | CN | US-20 · AC-20.2 | UC-04 AF-01 | BR-07 | — | Số phần → nhập 0 | Món chuyển Hết | Medium | P | — |
| TC-045 | Mở bán lại | CN | US-20 · AC-20.3 | UC-04 AF-02 | — | Món Hết | Bấm Mở bán | App phục vụ bỏ chặn ngay | High | P | — |
| TC-046 | Đầu ca đặt lại tình trạng | CN | US-20 · AC-20.3 | UC-04 AF-03 | — | 3 món Hết cuối ca trưa | Mở ca tối | Mọi món Còn bán, không giới hạn | Low | P | — |
| TC-047 | Số phần không hợp lệ | NL | US-20 · AC-20.2 | UC-04 EF-01 | — | — | Nhập -1; nhập "abc" | Báo "Số phần không hợp lệ", không lưu | Low | P | — |
| TC-048 | Báo hết không ảnh hưởng món đang nấu | NL | US-20 · AC-20.1 | UC-04 EF-02 | — | Món đang nấu ở T14 | Báo Hết món đó | Món T14 giữ Đang nấu | Medium | P | — |
| TC-049 | Báo hết khi mất internet | NL | US-35 · AC-35.1 | UC-04 EF-03 | NFR-06 | Offline | Báo Hết món | App phục vụ chặn qua mạng nội bộ | Medium | P | — |
| TC-050 | Hủy món Chờ nấu | CN | US-09 · AC-09.1, AC-09.2 | UC-08 BF | BR-05, BR-07, BR-19 | M53 còn 1; món M53 Chờ nấu | Hủy, lý do "Khách đổi ý" | Món Đã hủy; số phần về 2; KDS cập nhật; nhật ký | High | P | — |
| TC-051 | Yêu cầu hủy món đã nấu | CN | US-10 · AC-10.1, AC-10.2 | UC-08 AF-01 | BR-05 | Món Đang nấu | Yêu cầu hủy, lý do "Món lỗi" | Món Chờ duyệt hủy; Quản lý thấy yêu cầu | High | P | — |
| TC-052 | Quản lý duyệt hủy | CN | US-29 · AC-29.1, AC-29.2 | UC-08 AF-02, UC-12 BF | BR-05, BR-19 | Sau TC-051 | Quản lý bấm Duyệt | Món Đã hủy, không tính vào bill; phục vụ nhận "đã được duyệt"; nhật ký | High | P | — |
| TC-053 | Quản lý từ chối hủy | CN | US-29 · AC-29.2 | UC-08 AF-03, UC-12 BF | BR-05 | Yêu cầu hủy món Sẵn sàng | Bấm Từ chối | Món về Sẵn sàng; phục vụ nhận "bị từ chối" | High | P | — |
| TC-054 | Hủy cả đơn chưa nấu | CN | US-09 · AC-09.1 | UC-08 AF-04 | BR-20 | Đơn chỉ có món Mới | ⋯ → Hủy đơn | Đơn Cancelled; bàn về Trống | Medium | P | — |
| TC-055 | Đổi món | CN | US-09 · AC-09.1 | UC-08 AF-05 | BR-05 | Món Chờ nấu | Hủy món cũ, gọi món mới, gửi | Món cũ Đã hủy, món mới Chờ nấu | Medium | P | — |
| TC-056 | Bắt buộc lý do hủy | NL | US-10 · AC-10.1 | UC-08 EF-01 | BR-19 | — | Mở hộp hủy, bỏ trống lý do | Không gửi được khi chưa có lý do | Medium | P | — |
| TC-057 | Yêu cầu chờ duyệt chặn thanh toán | NL | US-21 · AC-21.2 | UC-08 EF-02, UC-05 EF-01 | BR-12 | T14 có món Chờ duyệt hủy | Thu ngân mở bill T14; đợi 5 phút | Bill không chốt được; Quản lý được nhắc lại | High | P | — |
| TC-058 | Không hủy món của bill đã thanh toán | NL | US-10 · AC-10.1 | UC-08 EF-03 | — | Bill Đã thanh toán | Mở đơn | Không có nút Hủy | Low | P | — |
| TC-059 | Bill tính đúng tạm tính và GST | CN | US-21 · AC-21.1 | UC-05 BF | BR-09 | T07: 7 món, tạm tính 97,00, ngày thường | Mở bill | Tổng 97,00; GST included 8,82 | High | P | — |
| TC-060 | Chặn thanh toán khi còn món chưa phục vụ | NL | US-21 · AC-21.2 | UC-05 EF-01 | BR-12 | T03 còn món Đang nấu | Mở bill T03 | Danh sách món còn treo; nút Thanh toán, In bill tạm tắt | High | P | — |
| TC-061 | Thanh toán EFTPOS | CN | US-24 · AC-24.2 | UC-05 BF | BR-17 | T07 sẵn sàng | Thanh toán → EFTPOS → quẹt máy → "Đã thu EFTPOS" | Bill Đã thanh toán; bàn Cần dọn; in hóa đơn; doanh thu ca tăng | High | P | — |
| TC-062 | Tiền mặt làm tròn 5 cent và tiền thừa | CN | US-24 · AC-24.1 | UC-05 AF-01 | BR-15 | Tổng 47,83 | Tiền mặt → khách đưa 50,00 | Cần thu 47,85; tiền thừa 2,15 | High | F (DEF-02) | P |
| TC-063 | Giảm giá ≤ 10% | CN | US-22 · AC-22.1 | UC-05 AF-02 | BR-11, BR-19 | Tạm tính 97,00 | Giảm 10%, lý do Khách quen | Áp ngay −9,70; nhật ký | High | P | — |
| TC-064 | Giảm giá > 10% cần duyệt | CN | US-22 · AC-22.2 | UC-05 AF-03, UC-12 BF | BR-11 | Tạm tính 97,00 | Giảm 15% → Quản lý Duyệt | Bill "Chờ duyệt", không chốt được; sau duyệt áp −14,55 | High | P | — |
| TC-065 | Tax invoice | CN | US-24 · AC-24.3 | UC-05 AF-04 | BR-16, NFR-22 | — | Chọn In tax invoice; thử bill ≥ 1.000,00 | Có "Tax Invoice", ABN, ngày, món, GST; bill ≥ 1.000 bắt nhập tên/ABN người mua | High | P | — |
| TC-066 | Thanh toán hai phương thức | CN | US-24 · AC-24.2 | UC-05 AF-05 | — | Tổng 120,00 | EFTPOS 50,00 rồi tiền mặt phần còn lại | Bill "Trả một phần" sau lần 1; Đã thanh toán sau lần 2 | Medium | P | — |
| TC-067 | Phụ thu ngày lễ | CN | US-28 · AC-28.2 | UC-05 AF-07 | BR-10 | Ngày 26/01/2027; tạm tính 100,00, giảm 10% | Mở bill | Phụ thu 13,50; Tổng 103,50; GST 9,41; câu phụ thu trên hóa đơn | High | P | — |
| TC-068 | Quản lý từ chối giảm giá | NL | US-22 · AC-22.2 | UC-05 EF-02 | BR-11 | Yêu cầu giảm 20% | Quản lý Từ chối | Bill giữ giá gốc; thu ngân nhận thông báo | Medium | P | — |
| TC-069 | Giao dịch EFTPOS bị từ chối | NL | US-24 · AC-24.2 | UC-05 EF-03 | — | Máy EFTPOS báo DECLINED | Không bấm xác nhận, chọn lại phương thức | Bill giữ Đã in, không ghi nhận tiền | High | P | — |
| TC-070 | Tiền khách đưa thiếu | NL | US-24 · AC-24.1 | UC-05 EF-04 | BR-15 | Cần thu 47,85 | Nhập 40,00 | Báo "Còn thiếu 7,85"; nút xác nhận tắt | Medium | P | — |
| TC-071 | Gọi thêm sau khi in bill | NL | US-08 · AC-08.1 | UC-05 EF-05 | BR-12 | Bill Đã in | Phục vụ gọi thêm, gửi bếp | Bill mở lại; bàn về Có khách; đơn In Progress | Medium | P | — |
| TC-072 | Máy in hóa đơn lỗi | NL | US-24 · AC-24.3 | UC-05 EF-06 | — | Tắt máy in | Thanh toán, bật máy in, in lại | Giao dịch vẫn lưu; in lại được hóa đơn | Medium | P | — |
| TC-073 | In bill tạm | CN | US-21 · AC-21.1 | UC-05 BF | BR-12 | T07 mọi món đã phục vụ | In bill tạm | Bill Đã in; đơn Billed; bàn Chờ thanh toán | High | P | — |
| TC-074 | Tách bill theo món | CN | US-23 · AC-23.1 | UC-06 BF, UC-05 AF-06 | BR-14 | Bill 4 món | Tách theo món: 2 phần, gán món, thu từng phần | Mỗi phần có tổng, GST; tổng 2 phần = tổng bill; bill Đã thanh toán khi đủ | High | P | — |
| TC-075 | Chia đều, phần cuối nhận số lẻ | CN | US-23 · AC-23.2 | UC-06 AF-01 | BR-14 | Tổng 100,00 | Chia đều 3 phần | 33,33 · 33,33 · 33,34 | High | F (DEF-03) | P |
| TC-076 | Phân bổ giảm giá khi tách | CN | US-23 · AC-23.1 | UC-06 AF-02 | BR-11, BR-14 | Bill giảm 10% | Tách theo món 2 phần | Giảm giá chia theo tỉ lệ giá trị từng phần | Medium | P | — |
| TC-077 | Một phần trả tiền mặt | CN | US-23 · AC-23.2 | UC-06 AF-03 | BR-15 | Đã chia đều | Phần 3 trả tiền mặt | Riêng phần 3 làm tròn 5 cent | Medium | P | — |
| TC-078 | Hủy tách bill | CN | US-23 · AC-23.3 | UC-06 AF-04 | BR-14 | Đã tách, chưa trả phần nào | Bấm ← Bill | Bill về một phần | Low | P | — |
| TC-079 | Còn món chưa gán | NL | US-23 · AC-23.1 | UC-06 EF-01 | BR-14 | Tách theo món, 1 món chưa gán | Thu phần 1 | Nút thu tắt; báo "Còn 1 món chưa thuộc phần nào" | Medium | P | — |
| TC-080 | Không trộn hai cách tách | NL | US-23 · AC-23.3 | UC-06 EF-02 | BR-14 | Đã gán món theo món | Chọn Chia đều | Hỏi xác nhận, xóa phân bổ cũ; không tồn tại hai cách cùng lúc | High | P | — |
| TC-081 | Số phần ngoài 2–10 | NL | US-23 · AC-23.2 | UC-06 EF-03 | BR-14 | Chia đều | Bấm − khi 2; bấm + khi 10 | Giữ trong 2–10 | Low | P | — |
| TC-082 | Không tách lại khi đã trả một phần | NL | US-23 · AC-23.3 | UC-06 EF-04 | BR-14 | Phần 1 đã trả | Đổi cách tách | Nút đổi cách tách bị khóa | Medium | P | — |
| TC-083 | Đơn mang về trả trước | CN | US-11 · AC-11.1, AC-11.2 | UC-10 BF | BR-13 | — | Tạo đơn mang về "Sarah", thêm 2 món, thu tiền | Mã TA-xx; món chỉ tới bếp sau khi thanh toán đủ | High | P | — |
| TC-084 | Chốt ca có chênh lệch | CN | US-25 · AC-25.1 | UC-16 BF | BR-21 | Không còn bill mở; tiền mặt hệ thống 1.520,60 | Nhập 1.513,60 | Chênh −7,00; bắt buộc lý do; chốt được sau khi nhập | Medium | P | — |
| TC-085 | Không chốt ca khi còn bill mở | NL | US-25 · AC-25.2 | UC-16 BF | BR-21 | 6 bill mở | Mở Chốt ca | Báo danh sách bàn còn mở; nút Chốt ca tắt | Medium | P | — |
| TC-086 | Thêm và sửa món | CN | US-26 · AC-26.1 | UC-13 BF | BR-03 | — | Thêm món thiếu tên EN; nhập đủ rồi lưu | Lần 1 báo lỗi; lần 2 món mới có trên mọi app | High | P | — |
| TC-087 | Sửa giá không đổi bill đang mở | CN | US-26 · AC-26.2 | UC-13 BF | BR-08, BR-19 | T03 có Phở bò tái 20,00 | Sửa giá thành 21,00 | Bill T03 giữ 20,00; món gọi mới 21,00; nhật ký "Sửa giá" | High | P | — |
| TC-088 | Cấu hình ngày lễ và phụ thu | CN | US-28 · AC-28.1 | UC-14 BF | BR-10 | — | Xem lịch ngày lễ; đổi mức 15% → 10% → 15% | Ngày lễ NSW 2026–2027 có trạng thái; câu phụ thu cập nhật theo mức | High | P | — |
| TC-089 | Báo cáo doanh thu và CSV | CN | US-30 · AC-30.1, AC-30.2 | UC-15 BF | — | Ca có 108 bill | Mở Báo cáo, Xuất CSV | Tổng, số bill, TB/bill, theo phương thức, GST; CSV khớp số trên màn hình | High | P | — |
| TC-090 | Top món và thời gian chế biến | CN | US-31 · AC-31.1 | UC-15 BF | — | — | Xem Báo cáo | Top 10 món; thời gian TB theo 3 trạm | Medium | P | — |
| TC-091 | Nhật ký hủy món, giảm giá | CN | US-32 · AC-32.1 | UC-15 BF | BR-19 | Sau TC-050, TC-063 | Xem mục nhật ký | Có thời gian, bàn, món, số tiền, người làm, lý do | Medium | P | — |
| TC-092 | Tạo tài khoản và PIN | CN | US-33 · AC-33.1 | UC-17 BF | NFR-15 | Admin | Tạo tài khoản; thử PIN 3 số; thử tài khoản trùng | PIN 4–6 số mới hợp lệ; trùng tài khoản bị chặn | High | P | — |
| TC-093 | Phân quyền theo vai trò | CN | US-33 · AC-33.2 | UC-17 BF, UC-19 BF | NFR-14 | 6 tài khoản mẫu | Đăng nhập từng vai trò vào 4 ứng dụng | Mỗi vai trò chỉ thấy chức năng theo ma trận SRS §5 | High | P | — |
| TC-094 | Khóa sau 5 lần sai PIN | NL | US-33 · AC-33.1 | UC-19 BF | NFR-15 | — | Nhập sai 5 lần | Tài khoản bị khóa, báo liên hệ Admin | High | P | — |
| TC-095 | Nhật ký chỉ xem | CN | US-34 · AC-34.1 | UC-18 BF | BR-19, NFR-16 | Admin | Lọc theo "Giảm giá"; tìm nút sửa/xóa | Lọc đúng; không có thao tác sửa/xóa | High | P | — |
| TC-096 | Hiệu năng giờ cao điểm | PCN | — | UC-02 BF | NFR-01, NFR-02, NFR-03 | Công cụ giả lập 20 thiết bị, 60 đơn/giờ trong 2 giờ | Đo thời gian đơn tới KDS | p95 ≤ 2 giây, không lỗi | High | F (DEF-04) | P |
| TC-097 | Nhân viên mới học xong ≤ 30 phút | PCN | — | UC-01 BF | NFR-09 | 10 nhân viên chưa dùng | Đào tạo 30 phút, làm 5 nhiệm vụ | ≥ 9/10 người làm đúng | High | P | — |
| TC-098 | KDS đọc được trong bếp | PCN | — | UC-03 BF | NFR-12 | Bếp đang hoạt động, tay ướt | Đọc phiếu từ 1,5 m; chạm bằng ngón ướt | Đọc đúng 10/10 phiếu; chạm nhận 10/10 lần | Medium | P | — |
| TC-099 | Song ngữ EN/VI | PCN | — | UC-01 BF | NFR-13 | — | Đổi ngôn ngữ | Đổi trong ≤ 2 chạm; 72/72 món có hai tên | Low | P | — |

## 3. Defect Log

| ID | TC | Mô tả | Mức | Nguyên nhân | Sửa | Kiểm lại |
|---|---|---|---|---|---|---|
| DEF-01 | TC-031 | Máy in dự phòng không tự in khi KDS mất kết nối | High | Hết thời gian chờ 60 giây thay vì 10 giây | Đặt timeout 10 giây theo UCS-02 EF-04 | P · 23/02 |
| DEF-02 | TC-062 | 47,87 làm tròn thành 47,90 | Critical | Làm tròn lên thay vì tới 5 cent gần nhất | Áp đúng BR-15 | P · 23/02 |
| DEF-03 | TC-075 | Chia đều 100,00 ÷ 3 ra 33,33 × 3, thiếu 0,01 | Critical | Không dồn số lẻ vào phần cuối | Phần cuối = Tổng − các phần trước (BR-14) | P · 24/02 |
| DEF-04 | TC-096 | p95 = 2,6 giây ở 60 đơn/giờ | High | Truy vấn trạng thái món chưa có chỉ mục | Thêm chỉ mục, đẩy sự kiện thay polling | P · 25/02 (p95 = 1,4 giây) |

## 4. UAT Report

| Chỉ số | Vòng 1 | Vòng 2 (cuối) |
|---|---|---|
| Số TC chạy | 99 | 99 (95 giữ kết quả vòng 1 + 4 chạy lại) |
| Đạt | 95 (96,0%) | 99 (100%) |
| Lỗi | 4 (2 Critical, 2 High) | 0 |
| TC ưu tiên High đạt | 51/55 | 55/55 |

| Điều kiện kết thúc | Kết quả |
|---|---|
| 100% TC High đạt | Đạt |
| ≥ 95% tổng TC đạt | Đạt (100%) |
| 0 lỗi Critical/High mở | Đạt |

**Kết luận:** HL-OMS đủ điều kiện go-live ngày 01/03/2027.

| Vai trò | Người ký | Ngày |
|---|---|---|
| Chủ nhà hàng (Sponsor) | Đã ký | 26/02/2027 |
| Quản lý nhà hàng (PO) | Đã ký | 26/02/2027 |
| Project Manager | Đã ký | 26/02/2027 |
