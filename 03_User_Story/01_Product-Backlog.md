# Product Backlog — HL-OMS

| Mục | Nội dung |
|---|---|
| Phiên bản | 1.0 — 10/11/2026, thống nhất tại workshop EL-06 (MOM-02) |
| Product Owner | Quản lý nhà hàng |
| Mẫu | Là **[vai trò]**, tôi muốn **[làm gì]**, để **[giá trị]**. AC: "Tôi biết story hoàn thành khi…" |
| Nguyên tắc | Think big · quên hệ thống · mỗi story độc lập · story lõi trước, story phụ sau · story ≠ task |
| Ưu tiên | MoSCoW: Must · Should · Could · Won't (V2) |
| Ước lượng | Story point (Fibonacci), Dev Team ước lượng ở Sprint Planning |

## 1. Epic

| Epic | Tên | Vai trò chính | Sub-epic | BN |
|---|---|---|---|---|
| EP-01 | Quản lý bàn | Phục vụ | — | BN-07 |
| EP-02 | Gọi món | Phục vụ, Thu ngân | Tạo đơn · Sửa/hủy đơn · Mang về | BN-01, BN-05 |
| EP-03 | Theo dõi phục vụ | Phục vụ | — | BN-02 |
| EP-04 | Chế biến | Bếp | Nhận đơn · Cập nhật trạng thái | BN-02, BN-05 |
| EP-05 | Điều phối bếp | Bếp trưởng | — | BN-02, BN-04 |
| EP-06 | Thanh toán | Thu ngân | Bill · Tách bill · Thu tiền · Chốt ca | BN-03 |
| EP-07 | Quản lý menu | Quản lý | — | BN-03, BN-04 |
| EP-08 | Kiểm soát và báo cáo | Quản lý | Duyệt · Báo cáo | BN-04, BN-06 |
| EP-09 | Quản trị | Admin | — | BN-04 |
| EP-10 | Vận hành liên tục | Mọi vai trò | — | BN-02 |

## 2. Danh sách User Story

| ID | Là (vai trò) | Tôi muốn | Để | Epic | Sub-epic | BN | BR | Ưu tiên | Release | Sprint | SP |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-01 | Phục vụ | xem sơ đồ bàn kèm trạng thái từng bàn | biết bàn nào trống, bàn nào cần phục vụ | EP-01 | — | BN-07 | BR-17 | Must | MVP | S1 | 3 |
| US-02 | Phục vụ | mở bàn và ghi số khách | bắt đầu ghi nhận đơn cho đúng bàn | EP-01 | — | BN-01 | BR-02 | Must | MVP | S1 | 2 |
| US-03 | Phục vụ | chuyển bàn hoặc ghép bàn | đơn đi theo khách khi khách đổi chỗ | EP-01 | — | BN-03 | BR-18 | Should | MVP | S2 | 5 |
| US-04 | Phục vụ | chọn món từ menu theo danh mục hoặc tìm theo tên | ghi đúng món khách gọi | EP-02 | Tạo đơn | BN-01 | BR-01, BR-08 | Must | MVP | S2 | 5 |
| US-05 | Phục vụ | chọn tùy chọn (độ cay, cỡ, topping) và ghi chú cho món | bếp làm đúng yêu cầu của khách | EP-02 | Tạo đơn | BN-01 | — | Must | MVP | S2 | 3 |
| US-06 | Phục vụ | ghi nhận chất gây dị ứng của khách cho từng món | bếp tránh được nguyên liệu gây dị ứng | EP-02 | Tạo đơn | BN-05 | BR-04 | Must | MVP | S2 | 3 |
| US-07 | Phục vụ | gửi đơn tới bếp | bếp nhận đơn ngay mà tôi không phải chạy phiếu | EP-02 | Tạo đơn | BN-02 | BR-02, BR-03, BR-07 | Must | MVP | S2 | 5 |
| US-08 | Phục vụ | gọi thêm món vào đơn đang mở | khách gọi thêm vẫn nằm trong cùng một bill | EP-02 | Sửa/hủy đơn | BN-03 | BR-02 | Must | MVP | S2 | 2 |
| US-09 | Phục vụ | sửa hoặc hủy món chưa nấu | đơn đúng khi khách đổi ý | EP-02 | Sửa/hủy đơn | BN-01 | BR-05, BR-07 | Must | MVP | S2 | 3 |
| US-10 | Phục vụ | gửi yêu cầu hủy món đã nấu kèm lý do | món sai vẫn được xử lý mà có kiểm soát | EP-02 | Sửa/hủy đơn | BN-04 | BR-05, BR-19 | Must | MVP | S4 | 3 |
| US-11 | Thu ngân | tạo đơn mang về tại quầy và thu tiền trước | phục vụ khách mua mang về trên cùng hệ thống | EP-02 | Mang về | BN-01 | BR-13 | Must | MVP | S4 | 5 |
| US-12 | Phục vụ | nhận thông báo khi món sẵn sàng | mang món ra lúc còn nóng | EP-03 | — | BN-02 | — | Must | MVP | S3 | 5 |
| US-13 | Phục vụ | xác nhận đã mang món ra bàn | mọi người biết món đã tới khách | EP-03 | — | BN-02 | — | Must | MVP | S3 | 2 |
| US-14 | Phục vụ | biết món đã hết ngay khi chọn | báo khách chọn món khác, không để khách chờ | EP-03 | — | BN-04 | BR-01 | Must | MVP | S3 | 2 |
| US-15 | Bếp | xem đơn mới của trạm mình theo thứ tự thời gian | nấu đúng trình tự, không sót món | EP-04 | Nhận đơn | BN-01, BN-02 | BR-03 | Must | MVP | S3 | 5 |
| US-16 | Bếp | thấy cảnh báo dị ứng nổi bật và xác nhận đã đọc | không làm món gây hại cho khách | EP-04 | Nhận đơn | BN-05 | BR-04 | Must | MVP | S3 | 3 |
| US-17 | Bếp | đánh dấu món đang nấu và đã xong | phục vụ biết tiến độ món | EP-04 | Cập nhật trạng thái | BN-02 | — | Must | MVP | S3 | 3 |
| US-18 | Bếp | thấy món nào đang trễ | ưu tiên làm món đó trước | EP-04 | Cập nhật trạng thái | BN-02 | BR-06 | Should | MVP | S3 | 3 |
| US-19 | Bếp trưởng | xem tổng số phần đang chờ theo từng món và trạm | phân công người và chuẩn bị nguyên liệu | EP-05 | — | BN-02 | — | Should | MVP | S3 | 3 |
| US-20 | Bếp trưởng | báo hết món, đặt số phần còn lại hoặc mở bán lại | không nhận order món không làm được | EP-05 | — | BN-04 | BR-01, BR-07 | Must | MVP | S3 | 3 |
| US-21 | Thu ngân | xem bill của bàn với tổng tiền, GST và phụ thu | báo đúng số tiền cho khách | EP-06 | Bill | BN-03 | BR-09, BR-10, BR-12 | Must | MVP | S4 | 5 |
| US-22 | Thu ngân | áp giảm giá cho bill hoặc từng món | xử lý khuyến mãi, phàn nàn của khách | EP-06 | Bill | BN-03, BN-04 | BR-11, BR-19 | Must | MVP | S4 | 3 |
| US-23 | Thu ngân | tách bill theo món hoặc chia đều | khách trả riêng theo nhu cầu | EP-06 | Tách bill | BN-03 | BR-14 | Must | MVP | S4 | 5 |
| US-24 | Thu ngân | ghi nhận thanh toán và in hóa đơn hoặc tax invoice | đóng bill đúng số tiền và đúng quy định | EP-06 | Thu tiền | BN-03 | BR-12, BR-15, BR-16 | Must | MVP | S4 | 5 |
| US-25 | Thu ngân | chốt ca và đối soát tiền mặt | bàn giao ca nhanh, phát hiện chênh lệch | EP-06 | Chốt ca | BN-06 | BR-21 | Should | MVP | S5 | 3 |
| US-26 | Quản lý | thêm, sửa món, danh mục, tùy chọn, chất gây dị ứng, trạm chế biến | menu luôn đúng với thực tế | EP-07 | — | BN-01, BN-05 | BR-03 | Must | MVP | S1 | 5 |
| US-27 | Quản lý | đặt giá riêng theo khung giờ (Lunch Special) | áp đúng giá trưa mà không sửa tay | EP-07 | — | BN-03 | BR-08 | Should | MVP | S1 | 3 |
| US-28 | Quản lý | khai báo ngày lễ và mức phụ thu | phụ thu tự áp đúng ngày | EP-07 | — | BN-03 | BR-10 | Must | MVP | S1 | 2 |
| US-29 | Quản lý | duyệt hoặc từ chối yêu cầu hủy món đã nấu và giảm giá vượt ngưỡng | kiểm soát thất thoát | EP-08 | Duyệt | BN-04 | BR-05, BR-11, BR-19 | Must | MVP | S4 | 3 |
| US-30 | Quản lý | xem doanh thu theo ngày, ca, phương thức thanh toán và xuất CSV | nắm kết quả kinh doanh, gửi kế toán | EP-08 | Báo cáo | BN-06 | — | Must | MVP | S5 | 5 |
| US-31 | Quản lý | xem món bán chạy và thời gian chế biến trung bình theo trạm | điều chỉnh menu và nhân sự bếp | EP-08 | Báo cáo | BN-06, BN-02 | — | Should | MVP | S5 | 3 |
| US-32 | Quản lý | xem nhật ký hủy món và giảm giá | phát hiện bất thường | EP-08 | Báo cáo | BN-04 | BR-19 | Should | MVP | S5 | 2 |
| US-33 | Admin | tạo tài khoản, gán vai trò và mã PIN | mỗi người chỉ làm đúng việc của mình | EP-09 | — | BN-04 | — | Must | MVP | S1 | 3 |
| US-34 | Admin | xem nhật ký thao tác của hệ thống | truy được ai làm gì, khi nào | EP-09 | — | BN-04 | BR-19 | Must | MVP | S5 | 2 |
| US-35 | Phục vụ, Bếp | tiếp tục gọi món và nhận đơn khi mất internet | không ngừng phục vụ giờ cao điểm | EP-10 | — | BN-02 | — | Must | MVP | S5 | 8 |
| US-36 | Khách | tự gọi món bằng QR tại bàn | không phải chờ phục vụ | EP-02 | Tạo đơn | BN-02 | — | Won't | V2 | — | — |
| US-37 | Khách | đặt bàn online | chắc chắn có chỗ | EP-01 | — | BN-07 | — | Won't | V2 | — | — |
| US-38 | Phục vụ | giữ món chính và gửi bếp khi khách ăn xong khai vị (hold & fire) | món lên đúng lượt | EP-02 | Tạo đơn | BN-02 | — | Won't | V2 | — | — |
| US-39 | Thu ngân | gửi số tiền sang máy EFTPOS tự động | không nhập lại số tiền | EP-06 | Thu tiền | BN-03 | — | Won't | V2 | — | — |
| US-40 | Quản lý | đồng bộ doanh thu ngày sang Xero | kế toán không nhập tay | EP-08 | Báo cáo | BN-06 | — | Won't | V2 | — | — |

**Tổng:** 40 story — MVP 35 (28 Must, 7 Should; 125 SP — S1 18 · S2 26 · S3 29 · S4 29 · S5 23), V2 5.

## 3. Acceptance Criteria

### EP-01 Quản lý bàn

- **US-01** — Tôi biết story hoàn thành khi:
  - **AC-01.1** Sơ đồ hiện 22 bàn theo khu (Trong nhà · Hiên) và bàn mang về đang mở.
  - **AC-01.2** Mỗi bàn có màu theo trạng thái: Trống · Có khách · Chờ thanh toán · Cần dọn; kèm số khách và thời gian ngồi.
  - **AC-01.3** Bàn có món sẵn sàng chưa mang ra hiện biểu tượng chuông.
- **US-02**
  - **AC-02.1** Chạm bàn Trống → nhập số khách (1–20) → bàn chuyển Có khách và mở đơn mới.
  - **AC-02.2** Không mở được bàn đang Có khách hoặc Cần dọn.
- **US-03**
  - **AC-03.1** Chuyển bàn: chọn bàn đích Trống → toàn bộ đơn chuyển sang, bàn cũ về Cần dọn.
  - **AC-03.2** Ghép bàn: chọn ≥ 2 bàn Có khách → đơn gộp về bàn chính, các bàn phụ hiện "Ghép với T0x".
  - **AC-03.3** Mỗi lần chuyển/ghép ghi nhật ký.

### EP-02 Gọi món

- **US-04**
  - **AC-04.1** Menu hiện theo 9 danh mục; tìm theo tên EN/VI, không phân biệt dấu.
  - **AC-04.2** Giá hiển thị theo khung giờ hiện hành (Lunch Special 11:00–15:00 T2–T6).
  - **AC-04.3** Món hết không chọn được (xem US-14).
- **US-05**
  - **AC-05.1** Món có nhóm tùy chọn bắt buộc (VD độ cay) phải chọn mới thêm được.
  - **AC-05.2** Tùy chọn có giá cộng thêm hiển thị và cộng vào giá món.
  - **AC-05.3** Ghi chú tự do tối đa 100 ký tự.
- **US-06**
  - **AC-06.1** Chọn được nhiều chất trong 11 nhóm (gluten, giáp xác, trứng, cá, sữa, đậu phộng, hạt cây, mè, đậu nành, sulphite, lupin) + "khác" ghi chữ.
  - **AC-06.2** Món chứa sẵn chất khách vừa khai báo hiện cảnh báo cho phục vụ ngay khi chọn.
  - **AC-06.3** Món có dị ứng mang nhãn đỏ trong đơn.
- **US-07**
  - **AC-07.1** Nút "Gửi bếp" chỉ bật khi đơn có ≥ 1 món mới.
  - **AC-07.2** Sau khi gửi, từng món hiện trên đúng trạm (Bếp nóng · Bếp lạnh · Quầy nước) ≤ 2 giây.
  - **AC-07.3** Số phần còn lại của món giảm tương ứng.
- **US-08**
  - **AC-08.1** Món gọi thêm được gửi thành lượt mới, cùng đơn và bill; KDS đánh dấu "Gọi thêm".
- **US-09**
  - **AC-09.1** Món "Chờ nấu" sửa/hủy được không cần duyệt; KDS cập nhật ngay.
  - **AC-09.2** Hủy món trả lại số phần còn lại.
- **US-10**
  - **AC-10.1** Món "Đang nấu", "Sẵn sàng" hoặc "Đã phục vụ" chỉ gửi được yêu cầu hủy, bắt buộc chọn lý do.
  - **AC-10.2** Món chuyển "Chờ duyệt hủy" tới khi Quản lý xử lý (US-29).
- **US-11**
  - **AC-11.1** Đơn mang về nhận mã TA-xx, tên khách tùy chọn.
  - **AC-11.2** Chỉ gửi bếp sau khi đã thanh toán đủ.
  - **AC-11.3** KDS đánh dấu "Mang về".

### EP-03 Theo dõi phục vụ

- **US-12**
  - **AC-12.1** Món chuyển "Sẵn sàng" → điện thoại của phục vụ phụ trách bàn rung và hiện thông báo kèm số bàn, tên món.
  - **AC-12.2** Thông báo chưa xử lý nhắc lại sau 2 phút.
- **US-13**
  - **AC-13.1** Phục vụ (hoặc nút "Đã lấy" trên KDS) đánh dấu món "Đã phục vụ"; thông báo tắt.
- **US-14**
  - **AC-14.1** Món hết hiện mờ, nhãn "Hết", không thêm vào đơn được.
  - **AC-14.2** Món còn ≤ 3 phần hiện nhãn "Còn n".

### EP-04 Chế biến

- **US-15**
  - **AC-15.1** KDS chỉ hiện món của trạm được chọn, sắp theo giờ gửi, cũ nhất trước.
  - **AC-15.2** Mỗi phiếu hiện số bàn, giờ gửi, thời gian đã chờ, món, tùy chọn, ghi chú.
- **US-16**
  - **AC-16.1** Món có dị ứng hiện dải đỏ ghi rõ chất.
  - **AC-16.2** Không chuyển được sang "Đang nấu" nếu chưa bấm "Đã đọc dị ứng".
- **US-17**
  - **AC-17.1** Chạm món: Chờ nấu → Đang nấu → Sẵn sàng; mỗi lần chạm ghi thời gian.
  - **AC-17.2** Bếp trưởng trả được món về trạng thái trước khi bấm nhầm.
- **US-18**
  - **AC-18.1** Quá ngưỡng trạm (Bếp nóng 15 phút · Bếp lạnh 10 · Quầy nước 5) phiếu đổi màu cam; quá 1,5 × ngưỡng đổi đỏ.

### EP-05 Điều phối bếp

- **US-19**
  - **AC-19.1** Bảng tổng hợp hiện số phần đang chờ theo món, lọc theo trạm, tự cập nhật.
- **US-20**
  - **AC-20.1** Bật "Hết" → món bị chặn trên mọi app phục vụ ≤ 2 giây.
  - **AC-20.2** Đặt số phần còn lại; về 0 thì tự chuyển "Hết".
  - **AC-20.3** "Mở bán lại" bỏ chặn ngay.

### EP-06 Thanh toán

- **US-21**
  - **AC-21.1** Bill liệt kê món, số lượng, đơn giá, tùy chọn có phí; dòng Tạm tính, Giảm giá, Phụ thu ngày lễ, Tổng, "GST included" = Tổng ÷ 11.
  - **AC-21.2** Không chốt thanh toán được khi còn món chưa ở "Đã phục vụ" hoặc "Đã hủy".
- **US-22**
  - **AC-22.1** Giảm theo % hoặc số tiền, cho cả bill hoặc từng món, bắt buộc chọn lý do.
  - **AC-22.2** Giảm > 10% hoặc miễn phí món → chờ Quản lý duyệt.
- **US-23**
  - **AC-23.1** Tách theo món: kéo món vào từng phần; mỗi phần có tổng, GST riêng.
  - **AC-23.2** Chia đều: chọn 2–10 phần; phần cuối nhận số lẻ; tổng các phần bằng tổng bill.
  - **AC-23.3** Không trộn tách theo món và chia đều trong một bill.
- **US-24**
  - **AC-24.1** Chọn EFTPOS hoặc Tiền mặt; tiền mặt tính tiền thừa, làm tròn tới 5 cent.
  - **AC-24.2** Thanh toán đủ → bill "Đã thanh toán", bàn sang "Cần dọn".
  - **AC-24.3** In hóa đơn; in tax invoice đủ trường khi khách yêu cầu.
- **US-25**
  - **AC-25.1** Chốt ca hiện doanh thu theo phương thức; nhập tiền mặt đếm được; chênh > AUD 5 bắt buộc ghi lý do.
  - **AC-25.2** Không chốt ca khi còn bill mở.

### EP-07 Quản lý menu

- **US-26**
  - **AC-26.1** Món có: tên EN/VI, danh mục, giá, trạm, chất gây dị ứng, nhóm tùy chọn, trạng thái bán.
  - **AC-26.2** Sửa giá ghi nhật ký; bill đang mở giữ giá cũ.
- **US-27**
  - **AC-27.1** Khai báo khung giờ (ngày trong tuần, giờ bắt đầu–kết thúc) và giá riêng từng món.
- **US-28**
  - **AC-28.1** Danh sách ngày lễ theo năm; mức phụ thu mặc định 15%.
  - **AC-28.2** Ngày lễ: bill tự có dòng phụ thu; menu hiện dòng "A surcharge of 15% applies on public holidays".

### EP-08 Kiểm soát và báo cáo

- **US-29**
  - **AC-29.1** Quản lý thấy danh sách yêu cầu chờ duyệt (hủy món, giảm giá) kèm người gửi, lý do, số tiền.
  - **AC-29.2** Duyệt → món "Đã hủy"/giảm giá áp vào bill; Từ chối → món về trạng thái cũ; người gửi nhận thông báo.
- **US-30**
  - **AC-30.1** Lọc theo ngày, ca; tổng doanh thu, số bill, giá trị TB/bill, theo phương thức, GST, phụ thu, giảm giá.
  - **AC-30.2** Xuất CSV đúng số liệu trên màn hình.
- **US-31**
  - **AC-31.1** Top 10 món theo số lượng và doanh thu; thời gian chế biến TB theo trạm (Gửi → Sẵn sàng).
- **US-32**
  - **AC-32.1** Danh sách hủy/giảm giá: thời gian, bàn, món, số tiền, người gửi, người duyệt, lý do.

### EP-09 Quản trị

- **US-33**
  - **AC-33.1** Tạo/khóa tài khoản; gán 1 trong 6 vai trò; đặt PIN 4–6 số không trùng.
  - **AC-33.2** Người dùng chỉ thấy chức năng của vai trò mình.
- **US-34**
  - **AC-34.1** Lọc nhật ký theo người, loại thao tác, thời gian; không ai sửa/xóa được nhật ký.

### EP-10 Vận hành liên tục

- **US-35**
  - **AC-35.1** Mất internet: gọi món, gửi bếp, KDS, thông báo vẫn chạy trong mạng nội bộ; thanh hiển thị "Offline".
  - **AC-35.2** Có internet lại: đồng bộ toàn bộ đơn, không mất, không trùng.
  - **AC-35.3** KDS lỗi: bấm "In phiếu" để in các món đang chờ ra máy in dự phòng.
