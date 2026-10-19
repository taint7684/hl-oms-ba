# Non-Functional Requirements — HL-OMS

Nhóm theo phân loại của khóa học (Usability · Reliability · Performance · Supportability) + Tuân thủ. Mỗi dòng tự kiểm 5 tiêu chí **S**pecific · **M**easurable · **A**ttainable · **R**easonable · **T**raceable.

## 1. Danh sách NFR

| ID | Nhóm | Yêu cầu | Chỉ số / cách đo | Nguồn | S | M | A | R | T |
|---|---|---|---|---|:-:|:-:|:-:|:-:|:-:|
| NFR-01 | Performance | Đơn gửi từ app phục vụ hiển thị trên KDS đúng trạm | ≤ 2 giây ở p95, đo trong UAT tải | EL-03 (hiện 5–10 phút) | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-02 | Performance | Hỗ trợ thiết bị dùng đồng thời | ≥ 20 thiết bị (hiện có 12) | MOM-01 §3.3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-03 | Performance | Chịu tải giờ cao điểm không suy giảm | 60 đơn/giờ, 240 món/giờ (1,3 × đỉnh) duy trì 2 giờ, NFR-01 vẫn đạt | MOM-01 §3.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-04 | Performance | Thời gian phản hồi thao tác trên màn hình | ≤ 1 giây cho 95% thao tác; mở bill ≤ 2 giây | EL-04 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-05 | Reliability | Khả dụng trong giờ mở cửa 11:00–22:30 | ≥ 99,5%/tháng (≤ 1,7 giờ gián đoạn/tháng) | MOM-01 §3.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-06 | Reliability | Vận hành khi mất internet: gọi món, KDS, thông báo chạy qua mạng nội bộ | ≥ 60 phút; đồng bộ lại 100% đơn, không trùng | MOM-01 §3.4, RK-01 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-07 | Reliability | Sao lưu và phục hồi | Sao lưu liên tục, RPO ≤ 15 phút, RTO ≤ 1 giờ | RK-01 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-08 | Reliability | In phiếu bếp dự phòng khi màn KDS lỗi | Chuyển sang in trong ≤ 1 phút, thao tác 1 nút | MOM-01 §3.3, RK-09 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-09 | Usability | Nhân viên mới tự làm được luồng chính sau đào tạo | ≤ 30 phút; ≥ 9/10 người làm đúng bài kiểm tra 5 nhiệm vụ | MOM-01 §3.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-10 | Usability | Thêm món phổ biến vào đơn | ≤ 3 chạm từ màn chi tiết bàn | MOM-01 §3.3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-11 | Usability | App phục vụ dùng một tay | Nút chính ở 1/3 dưới màn hình; vùng chạm ≥ 48 × 48 px | MOM-01 §3.3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-12 | Usability | KDS đọc được trong bếp nóng, ẩm, tay ướt | Tên món ≥ 24 px, tương phản ≥ 4,5:1 (WCAG AA), đọc được từ 1,5 m; nút ≥ 64 px | EL-03 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-13 | Usability | Song ngữ | Giao diện EN/VI đổi trong ≤ 2 chạm; 100% tên món có hai ngôn ngữ | MOM-01 §3.3, EL-04 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-14 | Reliability (Security) | Phân quyền theo vai trò | 100% chức năng theo ma trận quyền SRS §5; TC phân quyền đạt | MOM-01 §3.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-15 | Reliability (Security) | Đăng nhập nhanh trên thiết bị dùng chung | PIN cá nhân 4–6 số; tự khóa sau 2 phút không thao tác; khóa tài khoản sau 5 lần sai | Q-026 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-16 | Reliability (Security) | Nhật ký thao tác | Ghi 100% thao tác hủy, giảm giá, sửa giá, đổi quyền: ai, lúc nào, trước/sau, lý do; lưu ≥ 2 năm | BN-04 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-17 | Reliability (Security) | Bảo mật dữ liệu | HTTPS TLS 1.2+; dữ liệu lưu tại region Úc; không lưu dữ liệu thẻ; không lưu dữ liệu cá nhân khách | D-06, A-25 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-18 | Supportability | Tài liệu hướng dẫn | 1 trang/vai trò (6 vai trò) + video ≤ 3 phút; có trong app | RK-03 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-19 | Supportability | Hỗ trợ và xử lý lỗi | Nút báo lỗi trong app (kèm ảnh màn hình); sự cố nghiêm trọng phản hồi ≤ 30 phút trong giờ mở cửa | MOM-01 §3.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-20 | Supportability | Cập nhật, bảo trì | Triển khai bản mới ngoài giờ mở cửa (sau 23:00), không mất dữ liệu đang mở | MOM-01 §3.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-21 | Supportability (Scalability) | Mở rộng chi nhánh | Mọi dữ liệu có mã chi nhánh; thêm chi nhánh không đổi cấu trúc dữ liệu | Q-039 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-22 | Tuân thủ | Hóa đơn và tax invoice | Bill ghi "GST included"; tax invoice đủ trường kế toán xác nhận (MOM-02); lưu dữ liệu bán hàng ≥ 5 năm | AI-04 | ✓ | ✓ | ✓ | ✓ | ✓ |
| NFR-23 | Tuân thủ | Thiết bị hỗ trợ | Android 11+ (Chrome), màn KDS 21–24" cảm ứng, tablet 10"; máy in nhiệt 80 mm | MOM-01 §3.3 | ✓ | ✓ | ✓ | ✓ | ✓ |

## 2. Ví dụ tự kiểm SMART — trước và sau

| Bản nháp | Lỗi | Bản chốt |
|---|---|---|
| "Hệ thống phải nhanh" | Không Specific, không Measurable | NFR-01: đơn tới KDS ≤ 2 giây ở p95 |
| "Dễ dùng cho nhân viên" | Không Measurable | NFR-09: ≤ 30 phút đào tạo, ≥ 9/10 người làm đúng 5 nhiệm vụ |
| "Không bao giờ mất kết nối" | Không Attainable | NFR-06: vận hành nội bộ ≥ 60 phút khi mất internet |
| "Chạy 100% thời gian" | Không Reasonable với ngân sách | NFR-05: 99,5% trong giờ mở cửa |
