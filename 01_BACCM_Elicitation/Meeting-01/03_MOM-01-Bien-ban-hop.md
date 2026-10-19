# MOM-01 — Biên bản họp khởi động HL-OMS

> **Ghi chú portfolio:** đây là buổi họp giả lập. Câu trả lời của stakeholder do BA đóng vai theo bối cảnh case study và các giả định ở [Assumption Log](../../00_Admin/Assumption-Log.md). Mọi số liệu nghiệp vụ (số bàn, số lỗi, ngân sách…) là dữ liệu của case, không phải số liệu của một nhà hàng có thật.

## 1. Thông tin chung

| Mục | Nội dung |
|---|---|
| Mã | MOM-01 |
| Ngày, giờ | Thứ Ba 03/11/2026, 14:30–16:30 (giờ Sydney, ngoài giờ cao điểm) |
| Địa điểm | HL Restaurant, Sydney CBD — bàn T18 |
| Chủ trì | BA — công ty phần mềm |
| Thành phần HL | Chủ nhà hàng (OWN) · Quản lý nhà hàng (MGR) · Bếp trưởng (CHF) · Thu ngân (CSH) · 1 phục vụ (WTR) |
| Thành phần vendor | BA · Project Manager (PM) |
| Tài liệu mang theo | [Meeting Pack](01_Meeting-01-Pack.md) · [Slide](02_HL-OMS_Meeting-01.pptx) · [Question Log](../../00_Admin/Question-Log.md) |

## 2. Mục tiêu và chương trình

| # | Nội dung | Thời lượng | Phụ trách |
|---|---|---|---|
| 1 | Giới thiệu, mục tiêu buổi họp | 10' | PM |
| 2 | Trình bày hiểu biết ban đầu: BACCM, vấn đề, giải pháp đề xuất | 25' | BA |
| 3 | Hỏi đáp theo Question List (nhóm 1→6) | 70' | BA |
| 4 | Thống nhất bước tiếp theo | 15' | PM |

## 3. Nội dung đã thống nhất

### 3.1 Quy trình hiện tại và vấn đề (Q-001→Q-009, Q-011)

| Chủ đề | Thống nhất |
|---|---|
| Quy trình As-Is | Phục vụ ghi phiếu giấy 2 liên → liên 1 mang vào bếp, liên 2 kẹp ở quầy → bếp nấu, gọi to số bàn khi xong → thu ngân cộng tay từ liên 2 khi khách tính tiền |
| Vấn đề 1 — sai/sót món | 3–5 lần/ngày; chi phí làm lại ước ~AUD 900/tháng; nguyên nhân: chữ khó đọc, ghi tắt, mất phiếu |
| Vấn đề 2 — lên món chậm | Giờ cao điểm thời gian từ gọi món tới món đầu tiên lên bàn TB 22 phút; phục vụ mất 2–3 phút mỗi lần chạy phiếu |
| Vấn đề 3 — bill sai | 1–2 lần/tuần; thiếu món gọi thêm, quên phụ thu ngày lễ |
| KPI thành công (6 tháng sau go-live) | Sai món giảm ≥ 80% · TG lên món TB ≤ 15 phút · Bill sai = 0 · Quay vòng bàn ca tối +10% |
| Quy mô | 18 bàn trong nhà (T01–T18) + 4 bàn hiên (P01–P04), ~80 chỗ; ghép bàn cho nhóm ≥ 8 người; chuyển bàn ~3 lần/tối |
| Tải cao điểm | Tối T6–T7: đỉnh 45 đơn/giờ, ~180 món/giờ |
| Mang về | Có, gọi tại quầy, ~15% doanh thu → **đưa vào MVP** dưới dạng "bàn ảo" `TA-01…`; giao hàng qua app để V2 |
| Hết món | Bếp phát hiện khi đang nấu, báo miệng; khách thường chờ 10–15 phút mới biết |
| Hủy/đổi món | Món chưa nấu: phục vụ tự hủy · Món đang nấu hoặc đã xong: Quản lý ca duyệt, bắt buộc ghi lý do |
| Ưu tiên khi cắt phạm vi | Giữ chuỗi lõi: Gọi món → Bếp → Bill. Cắt được: báo cáo nâng cao |

### 3.2 Thanh toán và bill (Q-019→Q-025)

| Chủ đề | Thống nhất |
|---|---|
| Phương thức | EFTPOS (thẻ, ví điện thoại) trên máy độc lập + tiền mặt. OMS ghi nhận phương thức và số tiền; không kết nối máy EFTPOS ở v1 |
| GST | Giá menu đã gồm GST 10%. Bill ghi "GST included" = Tổng ÷ 11, kèm ABN. In được tax invoice khi khách yêu cầu |
| Phụ thu ngày lễ | 15% trên toàn bill vào ngày lễ chính thức của NSW. Menu ghi "A surcharge of 15% applies on public holidays" |
| Phụ phí thẻ | Không thu |
| Tách bill | Theo món hoặc chia đều; tối đa 10 phần/bill |
| Giảm giá | Thu ngân giảm ≤ 10%; > 10% hoặc miễn phí món: Quản lý duyệt |
| Tip | Thu qua EFTPOS; OMS không quản lý |

### 3.3 Thiết bị và trải nghiệm (Q-010, Q-012→Q-014, Q-017, Q-027)

| Chủ đề | Thống nhất |
|---|---|
| Phục vụ | 5 điện thoại Android nhà hàng cấp (4 dùng + 1 dự phòng); thao tác một tay; ≤ 3 chạm để thêm món phổ biến |
| Bếp | 2 màn KDS cảm ứng (Bếp nóng, Bếp lạnh) + 1 tablet ở Quầy nước; 1 máy in nhiệt dự phòng khi mất mạng |
| Trạm chế biến | Bếp nóng · Bếp lạnh · Quầy nước; khai vị và đồ uống ra trước |
| Thông báo | Món xong → điện thoại phục vụ rung + thông báo kèm số bàn; KDS có nút "Đã lấy" |
| Ngôn ngữ | Giao diện EN mặc định, VI tùy chọn; tên món song ngữ |
| Ngân sách phần cứng | ~AUD 4.500, tách khỏi ngân sách phần mềm |

### 3.4 Nhân sự, vận hành, phân quyền (Q-026, Q-028→Q-030)

| Chủ đề | Thống nhất |
|---|---|
| Ca tối | 4 phục vụ · 1 bếp trưởng · 3 bếp · 1 pha chế · 1 thu ngân · 1 quản lý ca |
| Nhân sự | ~40% bán thời gian; nghỉ việc ~3 người/quý; đào tạo tại chỗ ≤ 30 phút/người |
| Internet | Mất mạng 2–3 lần/tháng, mỗi lần 5–20 phút → cần phương án vận hành khi mất mạng |

Ma trận phân quyền mức cao (chi tiết hóa ở SRS):

| Chức năng | Phục vụ | Bếp | Bếp trưởng | Thu ngân | Quản lý | Admin |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Xem sơ đồ bàn, tạo/sửa đơn | ✓ | | | ✓ | ✓ | |
| Hủy món chưa nấu | ✓ | | | ✓ | ✓ | |
| Duyệt hủy món đang nấu/đã xong | | | | | ✓ | |
| Xem đơn, cập nhật trạng thái món | | ✓ | ✓ | | ✓ | |
| Báo hết món / mở bán lại | | | ✓ | | ✓ | |
| Điều phối, xem tổng đơn chờ | | | ✓ | | ✓ | |
| Bill, thanh toán, tách bill, giảm giá ≤ 10% | | | | ✓ | ✓ | |
| Duyệt giảm giá > 10% | | | | | ✓ | |
| Quản lý menu, giá, ngày lễ | | | | | ✓ | |
| Báo cáo | | | | | ✓ | |
| Tài khoản, phân quyền, nhật ký thao tác | | | | | | ✓ |

> Chủ nhà hàng dùng vai trò Quản lý. Quản lý nhà hàng kiêm vai trò Admin.

### 3.5 Menu, dị ứng, báo cáo (Q-006, Q-015, Q-016, Q-018)

| Chủ đề | Thống nhất |
|---|---|
| Menu | 72 món, 9 danh mục, 3 nhóm tùy chọn (độ cay, cỡ, thêm topping); Quản lý cập nhật |
| Giá theo khung giờ | "Lunch Special" 11:00–15:00, thứ 2–6, 8 món giá riêng |
| Dị ứng | Hiện ghi tay ở lề phiếu, 2 sự cố suýt xảy ra trong năm. Yêu cầu: phục vụ chọn từ danh sách 11 nhóm chất gây dị ứng + ô "khác"; KDS hiển thị dải cảnh báo đỏ; bếp xác nhận đã đọc trước khi bắt đầu nấu |
| Báo cáo | Doanh thu ngày/ca theo phương thức TT · Top món bán chạy · Thời gian chế biến TB theo trạm · Nhật ký hủy món và giảm giá |

### 3.6 Thương mại và triển khai (Q-009, Q-031→Q-039)

| Chủ đề | Thống nhất |
|---|---|
| Ngân sách | Trần AUD 45.000 cho MVP (chưa gồm phần cứng) |
| Go-live | 01/03/2027; không triển khai trong mùa cao điểm Giáng sinh–Tết |
| Người duyệt | Chủ NH duyệt cuối (A); Quản lý nhà hàng là Product Owner (R) |
| Mô hình phí | Phí triển khai một lần + thuê bao tháng; bảo hành 3 tháng |
| Hỗ trợ | Trong giờ mở cửa 11:00–22:30; sự cố nghiêm trọng phản hồi ≤ 30 phút |
| Quản trị | Không có IT nội bộ; Quản lý làm Admin; vendor hỗ trợ từ xa |
| Hạ tầng | Web app (PWA), máy chủ cloud đặt tại Úc |
| Dữ liệu cá nhân | Không lưu dữ liệu cá nhân của khách ở v1 |
| Kế toán | Xero ở V2; v1 xuất CSV doanh thu ngày |
| Mở rộng | Có thể mở chi nhánh 2 trong 2 năm → dữ liệu thiết kế sẵn khóa chi nhánh |

## 4. Việc cần làm

| # | Việc | Phụ trách | Hạn | Trạng thái |
|---|---|---|---|---|
| AI-01 | Quan sát ca tối (job shadowing) 18:00–21:00 | BA | T6 06/11/2026 | Đã lên lịch |
| AI-02 | Gửi 1 tuần phiếu giấy, sổ chốt ca, menu in, hóa đơn mẫu, sơ đồ mặt bằng | MGR | T4 04/11/2026 | Mở |
| AI-03 | Khảo sát nhanh mức quen công nghệ của nhân viên (10 câu, Google Form) | BA | T6 06/11/2026 | Mở |
| AI-04 | Kế toán xác nhận mẫu bill / tax invoice | OWN | T2 09/11/2026 | Mở |
| AI-05 | Gửi lại MOM-01 để HL xác nhận | BA | T4 04/11/2026 | Mở |
| AI-06 | Workshop phạm vi MVP + User Story Map | BA, MGR, CHF | T3 10/11/2026 | Mở |

## 5. Quyết định

Ghi tại [Decision Log](../../00_Admin/Decision-Log.md): D-03 → D-08.

## 6. Thay đổi so với đề xuất ban đầu

| # | Đề xuất ban đầu | Sau họp | Lý do |
|---|---|---|---|
| 1 | Mang về ngoài phạm vi | Mang về tại quầy thuộc MVP | ~15% doanh thu, dùng chung luồng đơn |
| 2 | Báo cáo: doanh thu ngày, món bán chạy | Thêm doanh thu theo phương thức TT, TG chế biến, nhật ký hủy/giảm giá | Nhu cầu kiểm soát thất thoát |
| 3 | Không đề cập mất mạng | Bổ sung yêu cầu vận hành khi mất mạng | Mất mạng 2–3 lần/tháng |
