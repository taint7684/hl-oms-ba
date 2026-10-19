# Risk Register — HL-OMS

Điểm rủi ro = Khả năng (1–5) × Tác động (1–5). Mức: **Cao** ≥ 15 · **Trung bình** 8–14 · **Thấp** ≤ 7.

| ID | Rủi ro | Nhóm | Khả năng | Tác động | Điểm | Mức | Ứng phó | Loại ứng phó | Chủ rủi ro | Trạng thái |
|---|---|---|---|---|---|---|---|---|---|---|
| RK-01 | Mất internet giờ cao điểm làm ngừng gọi món | Kỹ thuật | 4 | 5 | 20 | Cao | Hub mạng nội bộ chạy offline ≥ 60 phút, đồng bộ lại khi có mạng; máy in phiếu dự phòng (NFR-06, NFR-08, US-35) | Giảm thiểu | PM | Đã có biện pháp |
| RK-02 | Nhân viên không quen hoặc phản đối cách làm mới | Con người | 3 | 4 | 12 | TB | User testing prototype; bếp trưởng tham gia thiết kế KDS; đào tạo ≤ 30 phút; chạy song song phiếu giấy 1 tuần | Giảm thiểu | MGR | Đang theo dõi |
| RK-03 | Nghỉ việc ~3 người/quý, người mới không biết dùng | Con người | 4 | 3 | 12 | TB | Hướng dẫn 1 trang/vai trò + video 3 phút; giao diện tự giải thích (NFR-09, NFR-18) | Giảm thiểu | MGR | Đang theo dõi |
| RK-04 | Sót cảnh báo dị ứng → sự cố an toàn thực phẩm | Nghiệp vụ / pháp lý | 2 | 5 | 10 | TB | Trường dị ứng bắt buộc chọn; dải đỏ trên KDS; bếp phải xác nhận trước khi nấu (BR-04); TC bắt buộc trong UAT | Giảm thiểu | CHF | Đã có biện pháp |
| RK-05 | Tính GST, phụ thu, tax invoice sai quy định | Pháp lý | 2 | 4 | 8 | TB | Kế toán xác nhận mẫu bill (AI-04 xong); bộ TC tính tiền có số liệu mẫu | Giảm thiểu | BA | Đã có biện pháp |
| RK-06 | Phát sinh yêu cầu ngoài phạm vi (QR, giao hàng…) | Phạm vi | 4 | 3 | 12 | TB | Change Log + OWN duyệt; đưa vào backlog V2 | Kiểm soát | PM | Đang theo dõi |
| RK-07 | Vượt ngân sách AUD 45.000 | Tài chính | 2 | 4 | 8 | TB | Ưu tiên MoSCoW; Should có thể dời sang V2 | Giảm thiểu | PM | Đang theo dõi |
| RK-08 | Trễ go-live 01/03/2027 vì nghỉ lễ cuối năm | Tiến độ | 3 | 3 | 9 | TB | Sprint 2 rút ngắn; đệm UAT 2 tuần; không go-live trong cao điểm | Giảm thiểu | PM | Đang theo dõi |
| RK-09 | Màn KDS hỏng vì nhiệt, hơi nước, dầu mỡ | Thiết bị | 3 | 3 | 9 | TB | Màn chuẩn công nghiệp, giá treo xa bếp nóng; máy in dự phòng | Giảm thiểu | OWN | Đang theo dõi |
| RK-10 | Dữ liệu menu (72 món, dị ứng, trạm) nhập thiếu/sai trước go-live | Dữ liệu | 3 | 4 | 12 | TB | Mẫu nhập liệu chuẩn; BA và bếp trưởng rà từng món; TC kiểm dữ liệu | Giảm thiểu | MGR | Đang theo dõi |
| RK-11 | PO (Quản lý NH) không đủ thời gian cho dự án | Con người | 3 | 3 | 9 | TB | Lịch cố định 14:30–16:30 T3; BA chuẩn bị sẵn để PO chỉ xác nhận | Giảm thiểu | BA | Đang theo dõi |
| RK-12 | Wi-Fi nghẽn khi đông khách dùng chung | Kỹ thuật | 3 | 4 | 12 | TB | Tách SSID riêng cho thiết bị OMS; kiểm tải trong UAT (NFR-03) | Giảm thiểu | PM | Đã có biện pháp |
| RK-13 | Pin điện thoại phục vụ hết giữa ca | Thiết bị | 3 | 2 | 6 | Thấp | Đế sạc tại quầy; 1 máy dự phòng | Giảm thiểu | MGR | Đã có biện pháp |
| RK-14 | Phụ thuộc vendor sau bảo hành | Thương mại | 2 | 3 | 6 | Thấp | Hợp đồng thuê bao có SLA; dữ liệu xuất được CSV | Chuyển giao | OWN | Đang theo dõi |

## Tổng hợp

| Mức | Số rủi ro |
|---|---|
| Cao | 1 |
| Trung bình | 11 |
| Thấp | 2 |
