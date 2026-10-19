# Decision Log — HL-OMS

| ID | Ngày | Quyết định | Phương án đã cân nhắc | Lý do | Người quyết | Nguồn | Ảnh hưởng tới |
|---|---|---|---|---|---|---|---|
| D-01 | 27/10/2026 | Áp dụng Scrum, sprint 2 tuần, có giai đoạn Discovery 4 tuần trước Sprint 1 | Waterfall · Scrum thuần · Kanban | Yêu cầu còn đổi, cần MVP sớm, chủ NH muốn thấy sản phẩm từng phần | PM, BA | [BA Plan](BA-Plan.md) §2 | Kế hoạch, cách quản lý yêu cầu |
| D-02 | 27/10/2026 | Quản lý yêu cầu bằng Product Backlog (User Story + AC) và ma trận truy vết | Chỉ dùng SRS · Chỉ dùng backlog | Scrum cần backlog; hợp đồng và nghiệm thu cần BRD/SRS | BA | [BA Plan](BA-Plan.md) §4 | Bộ tài liệu |
| D-03 | 03/11/2026 | Đưa mang về tại quầy vào MVP ("bàn ảo" `TA-xx`); giao hàng để V2 | Ngoài phạm vi · Gộp cả giao hàng | ~15% doanh thu, dùng chung luồng đơn, chi phí thêm nhỏ | OWN | MOM-01 §3.1 | Phạm vi, UC tạo đơn |
| D-04 | 03/11/2026 | Không tích hợp máy EFTPOS ở v1; thu ngân ghi nhận phương thức và số tiền | Tích hợp EFTPOS ngay | Giảm chi phí, rủi ro; máy EFTPOS hiện chạy ổn | OWN | MOM-01 §3.2 | UC05, NFR |
| D-05 | 03/11/2026 | Phụ thu ngày lễ 15% trên toàn bill vào ngày lễ NSW; không phụ phí thẻ | — | Chính sách hiện hành của HL | OWN | MOM-01 §3.2 | BR tính bill |
| D-06 | 03/11/2026 | Web app (PWA), máy chủ cloud đặt tại Úc, có chế độ vận hành khi mất mạng | App native · Cài máy chủ tại chỗ | Không cài app, không cần IT nội bộ; mất mạng 2–3 lần/tháng | OWN, PM | MOM-01 §3.4, §3.6 | NFR, kiến trúc |
| D-07 | 03/11/2026 | Ngân sách MVP tối đa AUD 45.000; go-live 01/03/2027 | Go-live trước Giáng sinh | Tránh đổi hệ thống trong mùa cao điểm | OWN | MOM-01 §3.6 | Kế hoạch release |
| D-08 | 03/11/2026 | Chủ NH duyệt cuối (A); Quản lý NH là Product Owner (R) | — | Quản lý nắm vận hành, có mặt hằng ngày | OWN | MOM-01 §3.6 | RACI, sign-off |
| D-09 | 10/11/2026 | Ngưỡng món trễ: Bếp nóng 15' · Bếp lạnh 10' · Quầy nước 5'; đỏ ở 1,5 × ngưỡng | Một ngưỡng chung 15' | Món lạnh, đồ uống phải ra nhanh hơn món nóng | CHF | MOM-02 (Elicitation Results §5) | BR-06, KDS |
| D-10 | 10/11/2026 | Đơn mang về thanh toán đủ trước khi gửi bếp | Trả khi nhận món | Tránh khách bỏ đơn; thói quen hiện tại của quầy | CSH, MGR | MOM-02 | BR-13, UC-10 |
| D-11 | 24/11/2026 | Thêm tìm kiếm không dấu, nút Hoàn tác cho Bếp trưởng, cảnh báo món chứa chất dị ứng trên app phục vụ | Giữ thiết kế ban đầu | 3 lỗi mức Cao trong user testing | PO | [UX Evaluation](../07_UIUX/04_UX-Evaluation.md) §3 | UC-01, UC-03 |
| D-12 | 24/11/2026 | KDS nền tối, chữ ≥ 20 px, mỗi món là một vùng chạm lớn | Giao diện sáng như app phục vụ | Bếp nóng, ẩm, tay ướt; đọc từ 1,5 m | CHF, BA | [UX Evaluation](../07_UIUX/04_UX-Evaluation.md) §1 | NFR-12 |
| D-13 | 26/02/2027 | Go-live 01/03/2027, chạy song song phiếu giấy 1 tuần làm dự phòng | Lùi go-live; chuyển đổi từng phần | UAT đạt 100%, 0 lỗi mở | OWN | [UAT Report](../08_Documents/UAT-Test-Cases.md) §4 | Go-live Plan |
