# State Machine Diagram — HL-OMS

Ký hiệu UML: ● trạng thái đầu · ◉ trạng thái cuối · hộp bo góc = trạng thái · mũi tên = chuyển trạng thái, ghi `sự kiện [điều kiện]`. Nguồn `.mmd` trong `diagrams/`, sinh lại: `python tools/mermaid.py 06_Function_Feature_State/diagrams`.

Order (đơn) và Order Item (món trong đơn) tách thành hai máy trạng thái: một đơn có thể có món đã lên bàn trong khi món khác còn đang nấu, nên trạng thái của đơn **suy ra** từ trạng thái các món.

## 1. Order — bài tập bắt buộc

![SM Order](diagrams/SM_Order.png)

| # | Từ | Sự kiện | Điều kiện | Tới | Ai | Hành động hệ thống |
|---|---|---|---|---|---|---|
| O1 | ● | Mở bàn / tạo đơn mang về | — | Draft | Phục vụ, Thu ngân | Tạo đơn gắn bàn |
| O2 | Draft | Gửi bếp | ≥ 1 món Mới (BR-02) | Submitted | Phục vụ | Phiếu tới KDS |
| O3 | Draft | Hủy đơn | — | Cancelled | Phục vụ | — |
| O4 | Submitted | Món đầu tiên chuyển Đang nấu | — | In Progress | Bếp (gián tiếp) | — |
| O5 | Submitted | Hủy đơn | Chưa món nào Đang nấu (BR-20) | Cancelled | Phục vụ | Trả số phần, gỡ phiếu |
| O6 | In Progress | Món cuối cùng được xử lý | Mọi món Đã phục vụ hoặc Đã hủy | Served | Hệ thống | — |
| O7 | In Progress | Quản lý duyệt hủy toàn bộ món | — | Cancelled | Quản lý | Ghi nhật ký |
| O8 | Served | Gọi thêm món | — | In Progress | Phục vụ | Lượt gửi mới |
| O9 | Served | In bill tạm | BR-12 đạt | Billed | Thu ngân | Bàn → Chờ thanh toán |
| O10 | Billed | Gọi thêm món | — | In Progress | Phục vụ | Bill mở lại |
| O11 | Billed | Thu đủ tiền | Tổng đã thu = Tổng bill | Paid | Thu ngân | Bàn → Cần dọn |

**Đơn mang về:** Draft → (thu tiền trước, BR-13) → Submitted → In Progress → Served → Paid đã có từ trước nên bỏ qua Billed.

## 2. Order Item

![SM Order Item](diagrams/SM_OrderItem.png)

| # | Từ | Sự kiện | Điều kiện | Tới | Ai |
|---|---|---|---|---|---|
| I1 | ● | Thêm món vào đơn | Món còn bán, còn phần (BR-01) | New | Phục vụ |
| I2 | New | Xóa | Chưa gửi | ◉ | Phục vụ |
| I3 | New | Gửi bếp | — | Queued | Phục vụ |
| I4 | Queued | Bếp chạm món | Không dị ứng HOẶC đã đọc dị ứng (BR-04) | Cooking | Bếp |
| I5 | Cooking | Bếp chạm Sẵn sàng | — | Ready | Bếp |
| I6 | Ready | Phục vụ xác nhận / bếp chạm Đã lấy | — | Served | Phục vụ, Bếp |
| I7 | Cooking → Queued · Ready → Cooking | Hoàn tác | Chỉ Bếp trưởng | Trạng thái trước | Bếp trưởng |
| I8 | Queued | Hủy | — | Cancelled | Phục vụ |
| I9 | Cooking / Ready / Served | Yêu cầu hủy + lý do | BR-05 (OR) | Void Pending | Phục vụ |
| I10 | Void Pending | Duyệt | — | Cancelled | Quản lý |
| I11 | Void Pending | Từ chối | — | Trạng thái trước khi yêu cầu | Quản lý |

## 3. Table

![SM Table](diagrams/SM_Table.png)

| Trạng thái | Màu trên sơ đồ bàn | Vào khi | Ra khi |
|---|---|---|---|
| Available (Trống) | Xám nhạt | Đã dọn | Mở bàn |
| Occupied (Có khách) | Xanh dương | Mở bàn | In bill / ghép / chuyển đi |
| Merged (Ghép) | Viền nét đứt | Ghép vào bàn chính | Tách ra / bàn chính thanh toán |
| Awaiting Payment (Chờ thanh toán) | Cam | In bill tạm | Gọi thêm / thanh toán đủ |
| Cleaning (Cần dọn) | Tím | Thanh toán đủ (BR-17) | Phục vụ xác nhận đã dọn |

## 4. Bill

![SM Bill](diagrams/SM_Bill.png)

| Trạng thái | Ý nghĩa | Cho phép |
|---|---|---|
| Open | Đơn đang có món, chưa in bill | Thêm món, giảm giá |
| Pending Approval | Có giảm giá chờ Quản lý duyệt | Chỉ xem |
| Printed | Đã in bill tạm cho khách | Tách bill, thu tiền, mở lại |
| Split | Đã tách thành 2–10 phần (BR-14) | Thu từng phần, hủy tách khi chưa trả |
| Partially Paid | Đã thu một phần | Thu tiếp |
| Paid | Đã thu đủ | Chỉ in lại hóa đơn |

## 5. Menu Item (tình trạng món)

![SM Menu Item](diagrams/SM_MenuItem.png)

| Trạng thái | Phục vụ thấy | Ai đổi |
|---|---|---|
| Available | Bình thường | Bếp trưởng, Quản lý |
| Limited | Nhãn "Còn n" khi n ≤ 3 | Bếp trưởng; hệ thống trừ khi gửi bếp (BR-07) |
| Sold Out | Mờ, nhãn "Hết", không chọn được | Bếp trưởng; hệ thống khi n = 0 |
| Inactive | Không hiện trong menu | Quản lý |
