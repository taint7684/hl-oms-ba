# Business Case — HL-OMS

> Số liệu là dữ liệu của case study. Giả định tài chính (doanh thu tối, biên lợi nhuận, lương) do BA ước tính và cần chủ nhà hàng xác nhận bằng sổ sách thật.

## 1. Phương án

| Phương án | Mô tả | Chi phí năm 1 | Đáp ứng BN | Kết luận |
|---|---|---|---|---|
| A. Giữ phiếu giấy, cải tiến quy trình | Phiếu in sẵn mã món, bảng trắng tình trạng món | ~AUD 1.500 | BN-01 một phần; không đáp ứng BN-02, BN-03, BN-05, BN-06 | Loại |
| B. Mua POS đóng gói (thuê bao) | Phần mềm POS phổ biến cho nhà hàng | ~AUD 9.000–14.000 (ước tính) | Đáp ứng gọi món, bill; không có quy tắc dị ứng bắt buộc, offline LAN, báo cáo theo nhu cầu; phí giao dịch dài hạn | Cân nhắc |
| **C. HL-OMS (đề xuất)** | Hệ thống theo quy trình của HL | **AUD 49.200** | Đáp ứng BN-01 → BN-07; mở rộng chi nhánh 2 | **Chọn** |

Lý do chọn C: đáp ứng đủ yêu cầu bắt buộc của HL (xác nhận dị ứng trên KDS, chạy khi mất internet, tách bill theo quy tắc BR-14, phụ thu theo lịch NSW), dữ liệu thuộc về HL, và nằm trong trần ngân sách AUD 45.000 cho phần mềm (D-07).

## 2. Chi phí

| Khoản | Năm 1 | Năm 2 | Năm 3 |
|---|---|---|---|
| Phát triển và triển khai (phần mềm) | 42.000 | — | — |
| Phần cứng (5 điện thoại, 2 KDS, tablet, máy in, hub mạng) | 4.500 | — | — |
| Thuê bao cloud + hỗ trợ AUD 300/tháng (miễn 3 tháng bảo hành) | 2.700 | 3.600 | 3.600 |
| **Tổng** | **49.200** | **3.600** | **3.600** |

## 3. Lợi ích hằng năm (khi đạt mục tiêu)

| Lợi ích | Cách tính | AUD/năm |
|---|---|---|
| Giảm làm lại món (BN-01) | 80% × AUD 900/tháng × 12 | 8.640 |
| Giảm thất thoát bill (BN-03) | 1,5 lỗi/tuần × AUD 35 × 52 + phụ thu bị quên: 11 ngày lễ × AUD 6.000 × 15% × 4% | 3.126 |
| Tăng lượt bàn ca tối T6–T7 (BN-07) | 10% × AUD 6.500/tối × 104 tối × biên đóng góp 35% | 23.660 |
| Giảm thời gian chốt ca (BN-06) | 25 phút/ngày × 364 ngày × AUD 35/giờ | 5.308 |
| **Tổng** | | **40.734** |

Lợi ích định tính: giảm rủi ro sự cố dị ứng (BN-05), tuân thủ GST/ACCC, dữ liệu để ra quyết định menu và nhân sự.

## 4. Chỉ số tài chính (3 năm)

Năm 1 giả định đạt 80% lợi ích (thời gian làm quen).

| Chỉ số | Giá trị |
|---|---|
| Dòng tiền ròng | Năm 1: −16.613 · Năm 2: +37.134 · Năm 3: +37.134 |
| Lợi ích ròng 3 năm | AUD 57.656 |
| ROI 3 năm | 102% |
| NPV 3 năm (chiết khấu 8%) | AUD 45.933 |
| Thời gian hoàn vốn | ~18 tháng sau go-live |

## 5. Độ nhạy

| Kịch bản | Thay đổi | Hoàn vốn |
|---|---|---|
| Thận trọng | Lượt bàn chỉ tăng 5% | ~25 tháng |
| Cơ sở | Như trên | ~18 tháng |
| Lạc quan | Lượt bàn tăng 15% | ~14 tháng |

Lợi ích lớn nhất đến từ quay vòng bàn; vì vậy BN-02 (lên món ≤ 15 phút) và BN-07 được đo hằng tuần từ go-live và rà soát ở mốc 3 tháng, 6 tháng ([Go-live Plan](../08_Documents/Go-Live-Plan.md)).
