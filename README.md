# HL-OMS — Hệ thống quản lý gọi món cho HL Restaurant

Case study Business Analysis đầy đủ chuỗi: **Elicitation → User Story → Business Process → Use Case → Function & State → UI/UX → BRD/SRS/UAT → Pitching**.

| Hạng mục | Nội dung |
|---|---|
| Khách hàng | HL Restaurant — nhà hàng Việt tại Sydney CBD, Úc (case giả lập) |
| Bài toán | Gọi món và chuyển đơn vào bếp bằng phiếu giấy → sai món, lên món chậm, bill sai |
| Giải pháp | Web app (PWA) 4 phân hệ: App Phục vụ · Màn hình Bếp (KDS) · Quầy Thu ngân · Trang Quản lý |
| Vai trò | Business Analyst của công ty phần mềm, đề xuất giải pháp cho ban điều hành HL |
| Phương pháp | Scrum, Discovery 4 tuần + 5 sprint 2 tuần, go-live 01/03/2027 |
| Đặc thù Úc | AUD, giá gồm GST 10%, phụ thu ngày lễ 15% (ghi rõ trên menu theo ACCC), thông tin dị ứng (FSANZ Std 1.2.3), Privacy Act 1988 |

## Kết quả mục tiêu

| Business Need | Baseline | Mục tiêu 6 tháng |
|---|---|---|
| BN-01 Sai/sót món | 3–5 lần/ngày | ≤ 1 lần/ngày |
| BN-02 Thời gian lên món (giờ cao điểm) | TB 22 phút | TB ≤ 15 phút |
| BN-03 Bill sai | 1–2 lần/tuần | 0 |
| BN-05 Sự cố dị ứng | 2 lần suýt xảy ra/năm | 0 |
| BN-07 Quay vòng bàn ca tối | — | +10% |

## Tiến độ

| GĐ | Nội dung | Sản phẩm | Trạng thái |
|---|---|---|---|
| 0 | Thiết lập | [Assumption Log](00_Admin/Assumption-Log.md) · [Question Log](00_Admin/Question-Log.md) · [Decision Log](00_Admin/Decision-Log.md) · [Change Log](00_Admin/Change-Log.md) · [Registers.xlsx](00_Admin/HL-OMS_Registers.xlsx) | Xong |
| 1 | BACCM | [BACCM](01_BACCM_Elicitation/01_BACCM.md) | Xong |
| 2 | Phương pháp | [BA Plan](00_Admin/BA-Plan.md) | Xong |
| 3 | Họp 1 | [Meeting Pack](01_BACCM_Elicitation/Meeting-01/01_Meeting-01-Pack.md) · [Slide](01_BACCM_Elicitation/Meeting-01/02_HL-OMS_Meeting-01.pptx) · [Biên bản MOM-01](01_BACCM_Elicitation/Meeting-01/03_MOM-01-Bien-ban-hop.md) · [Elicitation Plan](01_BACCM_Elicitation/02_Elicitation-Plan.md) | Xong |
| 4 | Phân tích khởi đầu, NFR | Stakeholder · Risk · RACI · NFR | Chưa làm |
| 5 | User Story | Backlog + Story Map | Chưa làm |
| 6 | Business Process | BPMN As-Is / To-Be | Chưa làm |
| 7 | Use Case | UCD · UCS · Activity | Chưa làm |
| 8 | Function & State | BFD · Feature List · State Machine | Chưa làm |
| 9 | UI/UX | Sitemap · User Flow · Prototype | Chưa làm |
| 10 | Tài liệu, Pitching | BRD · SRS · UAT · RTM · Pitch deck | Chưa làm |

Bài học từng giai đoạn: [Reflection](00_Admin/Reflection.md).

## Cấu trúc thư mục

```
00_Admin/                  kế hoạch BA, log giả định · câu hỏi · quyết định · thay đổi, reflection
01_BACCM_Elicitation/      BACCM, elicitation plan, họp 1 (pack · slide · biên bản)
02_Initial_Analysis/       stakeholder, risk, RACI, NFR
03_User_Story/             product backlog, story map
04_Business_Process/       BPMN As-Is / To-Be
05_Use_Case_Activity/      UCD, UCS, activity diagram
06_Function_Feature_State/ BFD, function & feature list, state machine
07_UIUX/                   sitemap, user flow, wireframe / prototype
08_Documents/              BRD, SRS, UAT, ma trận truy vết
09_Pitching/               pitch deck
tools/                     script sinh file .pptx / .xlsx từ nguồn
```

## Mã truy vết

`BN` Business Need → `US` User Story → `UC` Use Case → `F` Function → `SCR` màn hình → `TC` test case. Kèm theo: `BR` Business Rule · `NFR` · `BP` quy trình · `A` giả định · `Q` câu hỏi · `D` quyết định · `CR` thay đổi · `RK` rủi ro · `MOM` biên bản.

## Sinh lại file

```bash
pip install python-pptx openpyxl
python tools/build_meeting01_deck.py   # slide họp 1
python tools/build_registers.py        # Excel các log
```

Nguồn sự thật là file Markdown; `.pptx` và `.xlsx` sinh từ script.

> Số liệu nghiệp vụ trong case (số bàn, số lỗi, ngân sách…) và câu trả lời của stakeholder là dữ liệu giả lập để thực hành, không phải của một nhà hàng có thật.
