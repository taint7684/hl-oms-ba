# Question Log — HL-OMS

| Mục | Nội dung |
|---|---|
| Mục đích | Danh sách câu hỏi cho buổi họp 1 với BOM HL (bài tập "1st meeting": Q-001→Q-040) và các câu phát sinh sau đó, theo dõi tới khi đóng |
| Thứ tự nhóm | (1) Nhu cầu chính → (2) Tiện ích/UX → (3) Nội dung sản phẩm → (4) Vận hành & nguồn lực → (5) Điều khoản thương mại → (6) Khác |
| Ưu tiên | `H` hỏi bắt buộc ở họp 1 · `M` hỏi nếu còn thời gian · `L` gửi email sau họp |
| Trạng thái | `Mở` · `Đóng` (có trả lời + nguồn) · `Chuyển` (chuyển sang buổi/kỹ thuật khác) |
| Nguồn trả lời | `MOM-01` = [Biên bản họp 1](../01_BACCM_Elicitation/Meeting-01/03_MOM-01-Bien-ban-hop.md) |

**Người trả lời:** OWN = Chủ nhà hàng/BOM · MGR = Quản lý nhà hàng · CHF = Bếp trưởng · CSH = Thu ngân · WTR = Phục vụ · ACC = Kế toán thuê ngoài

## 1. Danh sách câu hỏi

### (1) Nhu cầu chính

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-001 | Anh/chị mô tả giúp các bước từ lúc khách ngồi vào bàn tới lúc rời đi? | Dựng As-Is BP1–BP3 | MGR | Phỏng vấn | H | A-03 | Đóng | Phiếu giấy 2 liên; phục vụ mang liên 1 vào bếp, liên 2 kẹp ở quầy; thu ngân cộng tay | MOM-01 §3.1 |
| Q-002 | Ba vấn đề gây thiệt hại nhiều nhất hiện nay là gì? Có số liệu không? | Xác định Need, đo baseline | OWN, MGR | Phỏng vấn | H | — | Đóng | (1) Sai/sót món: 3–5 lần/ngày, ~AUD 900/tháng làm lại · (2) Lên món chậm giờ cao điểm: TB 22 phút · (3) Bill sai: 1–2 lần/tuần | MOM-01 §3.1 |
| Q-003 | Sau 6 tháng dùng hệ thống, chỉ số nào cho thấy dự án thành công? | Value, KPI nghiệm thu | OWN | Phỏng vấn | H | — | Đóng | Sai món giảm ≥ 80% · TG lên món TB ≤ 15 phút · Bill sai = 0 · Quay vòng bàn tối +10% | MOM-01 §3.1 |
| Q-004 | Nhà hàng có bán mang về hoặc giao hàng không? | Chốt phạm vi | OWN | Phỏng vấn | H | A-23 | Đóng | Có mang về tại quầy (~15% doanh thu); giao hàng qua app để V2 | MOM-01 §3.1 |
| Q-005 | Giờ cao điểm có bao nhiêu lượt khách và đơn mỗi giờ? | NFR hiệu năng | MGR | Phỏng vấn + Review tài liệu (sổ doanh thu) | H | A-21 | Đóng | Tối T6–T7: đỉnh 45 đơn/giờ, ~180 món/giờ | MOM-01 §3.1 |
| Q-006 | Yêu cầu dị ứng của khách hiện ghi và chuyển cho bếp thế nào? Đã có sự cố chưa? | BR an toàn thực phẩm | CHF, WTR | Phỏng vấn | H | A-11 | Đóng | Ghi tay ở lề phiếu; 2 sự cố suýt xảy ra trong năm (đậu phộng) | MOM-01 §3.5 |
| Q-007 | Khi hết món, bếp phát hiện lúc nào và báo phục vụ bằng cách nào? | BP4, UC04 | CHF | Phỏng vấn + Quan sát | H | — | Đóng | Phát hiện khi nấu; nói miệng/gọi to; khách đã chờ 10–15 phút mới biết | MOM-01 §3.1 |
| Q-008 | Ai được hủy hoặc đổi món? Trường hợp nào cần duyệt? | BR hủy, phân quyền | OWN, MGR | Phỏng vấn | H | A-22 | Đóng | Món chưa nấu: phục vụ tự hủy · Món đang nấu/đã xong: quản lý ca duyệt, ghi lý do | MOM-01 §3.1 |
| Q-009 | Nếu phải cắt bớt phạm vi MVP, chức năng nào giữ lại cuối cùng? | Ưu tiên MoSCoW | OWN | Phỏng vấn | H | — | Đóng | Giữ: gọi món → bếp → bill. Cắt được: báo cáo nâng cao | MOM-01 §3.6 |

### (2) Tiện ích / UX

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-010 | Giao diện và menu cần ngôn ngữ nào? | UI, dữ liệu menu | MGR | Phỏng vấn | M | A-14 | Đóng | Giao diện EN + VI tùy chọn; tên món song ngữ | MOM-01 §3.3 |
| Q-011 | Sơ đồ bàn thế nào? Có ghép bàn, chuyển bàn không? | Màn sơ đồ bàn, UC | MGR | Quan sát + Review tài liệu (sơ đồ mặt bằng) | H | A-01 | Đóng | 18 bàn trong + 4 hiên; ghép bàn cho nhóm ≥ 8 người; chuyển bàn ~3 lần/tối | MOM-01 §3.1 |
| Q-012 | Phục vụ cầm thiết bị khi đi lại thế nào? Cần thao tác một tay không? | NFR usability | WTR | Quan sát (job shadowing) | M | A-04 | Đóng | Cần một tay, tay kia bưng khay; muốn ≤ 3 chạm cho món phổ biến | MOM-01 §3.3 |
| Q-013 | Bếp muốn xem đơn trên màn hình hay phiếu in? | Thiết kế KDS | CHF | Phỏng vấn + Interface analysis (user testing) | H | A-05 | Đóng | Màn hình; giữ máy in dự phòng khi mất mạng | MOM-01 §3.3 |
| Q-014 | Bếp chia trạm thế nào? Món nào cần ưu tiên? | Định tuyến đơn | CHF | Quan sát | H | A-12 | Đóng | Bếp nóng · Bếp lạnh · Quầy nước; khai vị và nước ra trước | MOM-01 §3.3 |

### (3) Nội dung sản phẩm

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-015 | Menu có bao nhiêu món, danh mục, tùy chọn? Ai cập nhật? | Dữ liệu menu | MGR, CHF | Review tài liệu (menu in) | H | A-10 | Đóng | 72 món, 9 danh mục, 3 nhóm tùy chọn (độ cay, cỡ, thêm topping); Quản lý cập nhật | MOM-01 §3.5 |
| Q-016 | Hằng ngày/tuần anh/chị cần xem báo cáo gì? | Phạm vi báo cáo | OWN, MGR | Phỏng vấn + Review tài liệu (sổ chốt ca) | M | A-18 | Đóng | Doanh thu ngày/ca theo phương thức TT · Top món · TG chế biến TB · Nhật ký hủy/giảm giá | MOM-01 §3.5 |
| Q-017 | Phục vụ muốn được báo món xong bằng cách nào? | UC thông báo | WTR | Phỏng vấn | M | — | Đóng | Rung + thông báo trên điện thoại, kèm số bàn; màn bếp có nút "Đã lấy" | MOM-01 §3.3 |
| Q-018 | Giá có thay đổi theo bữa (trưa/tối) hay có combo không? | Mô hình giá | MGR | Review tài liệu (menu) | M | — | Đóng | Có "Lunch Special" 11:00–15:00 thứ 2–6 (8 món giá riêng) | MOM-01 §3.5 |
| Q-019 | Nhà hàng nhận những phương thức thanh toán nào? | UC05 | CSH | Phỏng vấn | H | A-06 | Đóng | EFTPOS (thẻ, ví điện thoại), tiền mặt | MOM-01 §3.2 |
| Q-020 | Hóa đơn hiện ghi GST thế nào? Khách có hay xin tax invoice không? | BR thuế, mẫu bill | OWN, ACC | Review tài liệu (hóa đơn mẫu) | H | A-07 | Đóng | Giá đã gồm GST; bill ghi "GST included" = Tổng ÷ 11, có ABN; khách công ty hay xin tax invoice | MOM-01 §3.2 |
| Q-021 | Có phụ thu ngày lễ không? Mức bao nhiêu, áp cho ngày nào? | BR phụ thu | OWN | Phỏng vấn | H | A-08 | Đóng | 15%, ngày lễ chính thức NSW, áp trên toàn bill | MOM-01 §3.2 |
| Q-022 | Có thu phụ phí khi khách trả bằng thẻ không? | BR phụ thu | OWN | Phỏng vấn | M | A-09 | Đóng | Không | MOM-01 §3.2 |
| Q-023 | Tách bill theo kiểu nào? Tối đa bao nhiêu phần? | UC06 | CSH | Phỏng vấn + Quan sát | H | A-16 | Đóng | Theo món hoặc chia đều; tối đa 10 phần | MOM-01 §3.2 |
| Q-024 | Tip ghi nhận thế nào? | Phạm vi | OWN | Phỏng vấn | L | A-17 | Đóng | Tip qua EFTPOS; OMS không quản lý | MOM-01 §3.2 |
| Q-025 | Ai được giảm giá, tối đa bao nhiêu? | BR duyệt | OWN | Phỏng vấn | H | A-24 | Đóng | Thu ngân ≤ 10%; > 10% hoặc miễn phí món cần Quản lý duyệt | MOM-01 §3.2 |
| Q-026 | Mỗi vai trò được xem và làm gì trên hệ thống? | Ma trận phân quyền | OWN, MGR | Workshop | H | — | Đóng | Chốt ma trận 6 vai trò (xem MOM-01 §3.4) | MOM-01 §3.4 |

### (4) Vận hành & nguồn lực

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-027 | Nhà hàng đã có thiết bị nào? Có sẵn ngân sách mua thêm không? | Chi phí phần cứng | OWN | Phỏng vấn | H | A-04 | Đóng | Có Wi-Fi, 1 PC quầy; mua mới 5 điện thoại, 2 màn KDS, 1 tablet (ngân sách riêng ~AUD 4.500) | MOM-01 §3.3 |
| Q-028 | Mỗi ca có bao nhiêu người, vai trò gì? | Tài khoản, quyền | MGR | Review tài liệu (bảng phân ca) | M | A-02 | Đóng | Xem A-02 | MOM-01 §3.4 |
| Q-029 | Nhân viên quen dùng điện thoại/app đến đâu? Đào tạo bằng cách nào? | NFR usability, kế hoạch đào tạo | MGR | Khảo sát | M | A-15 | Đóng | ~40% bán thời gian, nghỉ ~3 người/quý; đào tạo tại chỗ ≤ 30 phút/người | MOM-01 §3.4 |
| Q-030 | Internet có hay bị mất không? Mất bao lâu? | NFR offline | OWN | Phỏng vấn | H | A-13 | Đóng | 2–3 lần/tháng, 5–20 phút | MOM-01 §3.4 |
| Q-031 | Ai sẽ quản trị hệ thống sau go-live? Có IT nội bộ không? | Supportability | OWN | Phỏng vấn | M | A-19 | Đóng | Không có IT; Quản lý làm Admin; vendor hỗ trợ từ xa | MOM-01 §3.6 |
| Q-032 | Hệ thống có cần lưu thông tin khách (tên, SĐT) không? | Privacy Act 1988 | OWN | Phỏng vấn | M | A-25 | Đóng | Không ở v1 | MOM-01 §3.6 |

### (5) Điều khoản thương mại

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-033 | Ngân sách dự kiến cho MVP là bao nhiêu? | Phạm vi, phương án | OWN | Phỏng vấn | H | A-20 | Đóng | Trần AUD 45.000 (chưa gồm phần cứng) | MOM-01 §3.6 |
| Q-034 | Mong muốn go-live khi nào? Có mốc nào không được trễ? | Kế hoạch release | OWN | Phỏng vấn | H | A-20 | Đóng | 01/03/2027; tránh triển khai trong mùa cao điểm Giáng sinh–Tết | MOM-01 §3.6 |
| Q-035 | Ai là người duyệt cuối cho yêu cầu và nghiệm thu? | RACI, sign-off | OWN | Phỏng vấn | H | — | Đóng | Chủ NH duyệt (A); Quản lý là Product Owner (R) | MOM-01 §3.6 |
| Q-036 | Anh/chị muốn trả phí một lần hay theo tháng? Bảo hành bao lâu? | Mô hình thương mại | OWN | Phỏng vấn | M | — | Đóng | Phí triển khai một lần + thuê bao tháng; bảo hành 3 tháng | MOM-01 §3.6 |
| Q-037 | Cần hỗ trợ kỹ thuật vào khung giờ nào? | SLA | OWN | Phỏng vấn | M | — | Đóng | Trong giờ mở cửa 11:00–22:30, phản hồi sự cố nghiêm trọng ≤ 30 phút | MOM-01 §3.6 |

### (6) Khác

| ID | Câu hỏi | Mục đích | Hỏi ai | Kỹ thuật | Ưu tiên | A liên kết | Trạng thái | Trả lời tóm tắt | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Q-038 | Sau này có cần kết nối phần mềm kế toán (Xero, MYOB) không? | Supportability, V2 | OWN, ACC | Phỏng vấn | L | — | Đóng | Có ý định (Xero) — đưa vào V2; v1 xuất CSV doanh thu ngày | MOM-01 §3.6 |
| Q-039 | Có kế hoạch mở thêm chi nhánh không? | Kiến trúc đa chi nhánh | OWN | Phỏng vấn | L | — | Đóng | Có thể trong 2 năm; v1 một chi nhánh, dữ liệu thiết kế để mở rộng | MOM-01 §3.6 |
| Q-040 | Cho phép BA quan sát ca tối T6 và xem phiếu/hóa đơn cũ không? | Kỹ thuật quan sát + review tài liệu | MGR | — | H | — | Đóng | Đồng ý: quan sát 18:00–21:00 T6 06/11/2026; cung cấp 1 tuần phiếu giấy và sổ chốt ca | MOM-01 §4 |
| Q-041 | Thứ Hai 26/04/2027 (sau Anzac Day) có là ngày lễ NSW để áp phụ thu không? | Dữ liệu ngày lễ (BR-10) | MGR | Review tài liệu (trang NSW Government) | M | — | Mở | Nguồn thứ cấp mâu thuẫn; hạn xác nhận 01/04/2027 | holidays.csv |

## 2. Tổng hợp

| Nhóm | Số câu | H | M | L | Đóng | Mở |
|---|---|---|---|---|---|---|
| (1) Nhu cầu chính | 9 | 9 | 0 | 0 | 9 | 0 |
| (2) Tiện ích/UX | 5 | 3 | 2 | 0 | 5 | 0 |
| (3) Nội dung sản phẩm | 12 | 7 | 4 | 1 | 12 | 0 |
| (4) Vận hành & nguồn lực | 6 | 2 | 4 | 0 | 6 | 0 |
| (5) Thương mại | 5 | 3 | 2 | 0 | 5 | 0 |
| (6) Khác | 4 | 1 | 1 | 2 | 3 | 1 |
| **Tổng** | **41** | **25** | **13** | **3** | **40** | **1** |

## 3. Kỹ thuật elicitation đã dùng

| Kỹ thuật | Câu hỏi | Kết quả cần có |
|---|---|---|
| Phỏng vấn | Q-001→Q-010, Q-013, Q-016, Q-017, Q-019→Q-025, Q-027, Q-030→Q-039 | Need, BR, KPI, phạm vi |
| Quan sát (job shadowing) | Q-007, Q-011, Q-012, Q-014, Q-023 | As-Is thực tế, điểm nghẽn, NFR usability |
| Khảo sát | Q-029 | Mức quen công nghệ của nhân viên |
| Review tài liệu | Q-005, Q-011, Q-015, Q-016, Q-018, Q-020, Q-028 | Menu, hóa đơn, sổ chốt ca, phân ca, mặt bằng |
| Interface analysis (phản hồi khách, user testing, review với dev) | Q-002, Q-013 | Điểm đau từ khách; phản hồi trên prototype |
| Workshop | Q-026 | Ma trận phân quyền |
