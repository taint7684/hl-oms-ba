# Reflection — HL-OMS

Mỗi giai đoạn ghi ba dòng: học được gì · sai ở đâu · sửa thế nào.

| GĐ | Học được | Sai ở đâu | Sửa thế nào |
|---|---|---|---|
| 0. Thiết lập | Log có ID và trạng thái từ ngày đầu thì mọi câu trả lời về sau có chỗ để trỏ về | Ban đầu định để Question List riêng ở thư mục họp 1 → hai bản dễ lệch | Giữ một bản duy nhất ở `00_Admin/Question-Log.md`; Meeting Pack chỉ liên kết sang |
| 1. BACCM | Need phải có baseline bằng số mới đo được Value | Bản 1.0 chỉ ghi Need định tính ("vận hành nhanh, chính xác") | Bản 1.1 tách thành BN-01→BN-07, mỗi dòng có baseline (MOM-01) và mục tiêu 6 tháng |
| 2. Phương pháp | Scrum thuần không đủ cho khách cần ký phạm vi và ngân sách cố định | So sánh Waterfall/Scrum ban đầu chỉ theo lý thuyết | Chọn mô hình lai: Discovery 4 tuần chốt BRD/SRS, rồi sprint 2 tuần (D-01); so sánh theo tiêu chí của chính HL |
| 3. Họp 1 | Câu hỏi phải gắn người trả lời và kỹ thuật, nếu không buổi họp lan man | Nhóm câu hỏi bỏ sót vận hành khi mất mạng và đơn mang về | Thêm Q-004, Q-030; kết quả họp sinh CR-01, CR-03 — ghi ở Change Log thay vì sửa ngầm Meeting Pack |
| 4. Phân tích khởi đầu, NFR | NFR chỉ có giá trị khi đo được và có nguồn | Bản nháp viết "hệ thống phải nhanh", "dễ dùng" | Viết lại 23 NFR có chỉ số; bảng SMART "trước/sau" ghi rõ lỗi của bản nháp |
| 5. User Story | Story map giúp thấy ngay sprint nào quá tải | Sprint 3 ban đầu 32 SP, vượt velocity | Chuyển US-10 sang S4 cùng US-29 vì hai story chỉ có giá trị khi đi cùng nhau |
| 6. Business Process | As-Is phải có số đo từ quan sát thì To-Be mới chứng minh được giá trị | Bản đầu chỉ vẽ luồng, không đánh dấu điểm đau | Gắn 6 điểm đau đánh số vào BP1 As-Is, mỗi điểm có bằng chứng EL-02/EL-03 |
| 7. Use Case | Exception flow lộ ra quy tắc mà phỏng vấn bỏ sót | BR-04 ban đầu viết AND, thực chất là OR (không dị ứng HOẶC đã đọc) | Sửa cổng logic, thêm bảng chân trị cho từng rule |
| 8. Function & State | Tách Order và Order Item vì trạng thái của đơn suy ra từ món | Lộ trình gốc gộp In Preparation/Ready vào Order | 5 state machine riêng; bảng chuyển trạng thái có sự kiện, điều kiện, người làm |
| 9. UI/UX | Prototype chạy được logic giúp user testing tìm lỗi nghiệp vụ, không chỉ lỗi giao diện | Wireframe tĩnh không phát hiện được việc tách bill thiếu 1 cent | Prototype thực thi BR; bộ kiểm tự động 18 bước chạy lại sau mỗi lần sửa |
| 10. Tài liệu, Pitching | Ma trận truy vết sinh tự động thì không lệch với tài liệu nguồn | Đếm tay số TC High trong UAT Report bị sai (56 thay vì 55) | RTM và số liệu UAT do script đếm; script thoát lỗi khi có lỗ hổng truy vết |
