# RACI — HL-OMS

**R** thực hiện · **A** chịu trách nhiệm cuối, duyệt (mỗi việc đúng một A) · **C** tham vấn · **I** được thông báo

| # | Hạng mục | OWN | MGR (PO) | CHF | CSH | WTR | ACC | PM | BA | DEV | QA |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | Duyệt phạm vi, ngân sách, hợp đồng | A | C | I | | | | R | C | | |
| 2 | Cung cấp thông tin nghiệp vụ | I | A | R | R | R | C | | C | | |
| 3 | Elicitation, phân tích yêu cầu | I | C | C | C | C | | I | A/R | C | I |
| 4 | Product Backlog, ưu tiên story | I | A | C | C | | | C | R | C | |
| 5 | BRD | A | R* | C | C | | C | C | R | I | I |
| 6 | SRS | I | A | C | | | | C | R | C | C |
| 7 | Thiết kế UI/prototype | I | A | C | C | C | | | R | C | |
| 8 | Quy tắc GST, phụ thu, tax invoice | A | C | | C | | R* | | R | I | I |
| 9 | Dữ liệu menu (món, giá, dị ứng, trạm) | I | A | R | | | | | C | I | C |
| 10 | Phát triển | I | I | | | | | A | C | R | C |
| 11 | Kiểm thử hệ thống | | I | | | | | A | C | C | R |
| 12 | UAT test case | I | A | C | C | C | | I | R | I | C |
| 13 | Chạy UAT, ký nghiệm thu | A | R | R | R | R | | C | C | I | C |
| 14 | Đào tạo người dùng | I | A | C | | | | C | R | | C |
| 15 | Go-live, hypercare | I | A | C | C | C | | R | R | R | C |
| 16 | Quản lý thay đổi (CR) | A | R | | | | | R | R | C | I |

\* Cùng thực hiện: Quản lý NH soạn mục vận hành của BRD; kế toán soạn mẫu bill.

**Ký hiệu:** OWN Chủ NH · MGR Quản lý NH (Product Owner) · CHF Bếp trưởng · CSH Thu ngân · WTR Phục vụ · ACC Kế toán · PM/BA/DEV/QA đội vendor.

Kiểm tra: mỗi dòng có đúng một **A** (dòng 3: BA vừa A vừa R).
