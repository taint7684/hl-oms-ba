"""Bộ dựng BPMN 2.0 cho HL-OMS: một định nghĩa quy trình → file .bpmn (có DI, mở được bằng
Camunda Modeler / bpmn.io) + .svg + .png cùng bố cục.

Định nghĩa: lanes = [(mã, tên)], nodes = [(id, loại, lane, cột, nhãn, {tùy chọn})], flows = [(nguồn, đích, nhãn)].
Loại: start · end · task (người làm) · sys (hệ thống làm) · xor · and · timer.
Tùy chọn: row (hàng phụ trong lane, 0/1) · pain (số điểm đau, vẽ chấm đỏ)."""
from xml.sax.saxutils import escape

COL_W, LANE_H, ROW_H = 150, 120, 95
POOL_LBL, LANE_LBL, PAD = 34, 34, 30
TASK_W, TASK_H, GW, EV = 116, 62, 46, 36
INK, MUTED, LINE, SOFT, ACC, ACC_SOFT, PAIN = "#1f2937", "#6b7280", "#d1d5db", "#f9fafb", "#b4451f", "#fbeee8", "#dc2626"
FONT = "Segoe UI, Arial, sans-serif"


def _size(kind):
    if kind in ("task", "sys"):
        return TASK_W, TASK_H
    if kind in ("xor", "and"):
        return GW, GW
    return EV, EV


def _wrap(label, width):
    words, lines, cur = label.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > width and cur:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return lines


class Process:
    def __init__(self, pid, name, lanes, nodes, flows):
        self.pid, self.name, self.lanes, self.flows = pid, name, lanes, flows
        self.nodes = [dict(id=n[0], kind=n[1], lane=n[2], col=n[3], label=n[4], **(n[5] if len(n) > 5 else {}))
                      for n in nodes]
        self.by_id = {n["id"]: n for n in self.nodes}
        rows = {code: 1 + max([n.get("row", 0) for n in self.nodes if n["lane"] == code] or [0]) for code, _ in lanes}
        self.lane_y, y = {}, PAD
        for code, _ in lanes:
            h = LANE_H + (rows[code] - 1) * ROW_H
            self.lane_y[code] = (y, h)
            y += h
        self.height = y + PAD
        ncol = max(n["col"] for n in self.nodes) + 1
        self.x0 = PAD + POOL_LBL + LANE_LBL
        self.width = self.x0 + ncol * COL_W + PAD
        for n in self.nodes:
            w, h = _size(n["kind"])
            ly, _ = self.lane_y[n["lane"]]
            cx = self.x0 + n["col"] * COL_W + COL_W / 2
            cy = ly + LANE_H / 2 + n.get("row", 0) * ROW_H
            n.update(w=w, h=h, x=cx - w / 2, y=cy - h / 2, cx=cx, cy=cy)

    # --- định tuyến cạnh vuông góc -----------------------------------------------------------
    def route(self, a, b):
        A, B = self.by_id[a], self.by_id[b]
        if B["col"] > A["col"]:
            if abs(A["cy"] - B["cy"]) < 1:
                return [(A["x"] + A["w"], A["cy"]), (B["x"], B["cy"])]
            if A["kind"] in ("xor", "and") and not self._crowded(a, b):  # rẽ nhánh từ đỉnh trên/dưới
                sy = A["y"] + (A["h"] if B["cy"] > A["cy"] else 0)
                return [(A["cx"], sy), (A["cx"], B["cy"]), (B["x"], B["cy"])]
            if B["kind"] in ("xor", "and") and sum(f[0] == b for f in self.flows) == 1:  # gateway gộp: vào đỉnh trên/dưới
                ty = B["y"] + (B["h"] if A["cy"] > B["cy"] else 0)
                return [(A["x"] + A["w"], A["cy"]), (B["cx"], A["cy"]), (B["cx"], ty)]
            mx = B["x"] - 18
            return [(A["x"] + A["w"], A["cy"]), (mx, A["cy"]), (mx, B["cy"]), (B["x"], B["cy"])]
        if B["col"] == A["col"]:
            down = B["cy"] > A["cy"]
            return [(A["cx"], A["y"] + (A["h"] if down else 0)), (B["cx"], B["y"] + (0 if down else B["h"]))]
        # quay ngược: ưu tiên đi ngang sang trái rồi lên/xuống vào đích; vướng nút thì vòng phía trên
        ey = B["y"] + B["h"] if B["cy"] < A["cy"] else B["y"]
        if not self._hit(B["cx"], A["x"], A["cy"], A["cy"], (a, b)) and                 not self._hit(B["cx"], B["cx"], min(A["cy"], ey), max(A["cy"], ey), (a, b)):
            return [(A["x"], A["cy"]), (B["cx"], A["cy"]), (B["cx"], ey)]
        top = min(A["y"], B["y"]) - 16
        return [(A["cx"], A["y"]), (A["cx"], top), (B["cx"], top), (B["cx"], B["y"])]

    def _hit(self, x1, x2, y1, y2, skip):
        """True nếu đoạn thẳng (ngang hoặc dọc) cắt hộp của một nút khác."""
        for n in self.nodes:
            if n["id"] in skip:
                continue
            if x1 <= n["x"] + n["w"] + 4 and x2 >= n["x"] - 4 and y1 <= n["y"] + n["h"] + 4 and y2 >= n["y"] - 4:
                return True
        return False

    def _crowded(self, a, b):
        """True nếu gateway a có nhánh khác cùng hướng lên/xuống nằm gần hơn → nhánh này ra từ đỉnh phải."""
        A, B = self.by_id[a], self.by_id[b]
        sign = B["cy"] > A["cy"]
        for i, (x, y, _) in enumerate(self.flows):
            if x != a or y == b:
                continue
            O = self.by_id[y]
            if abs(O["cy"] - A["cy"]) > 1 and (O["cy"] > A["cy"]) == sign:
                if O["col"] < B["col"] or (O["col"] == B["col"] and i < [f[1] for f in self.flows if f[0] == a].index(b)):
                    return True
        return False

    # --- BPMN XML ----------------------------------------------------------------------------
    def bpmn(self):
        tag = {"start": "startEvent", "end": "endEvent", "task": "userTask", "sys": "serviceTask",
               "xor": "exclusiveGateway", "and": "parallelGateway", "timer": "intermediateCatchEvent"}
        p = [f'<?xml version="1.0" encoding="UTF-8"?>',
             '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" '
             'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" '
             'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" '
             f'id="Defs_{self.pid}" targetNamespace="https://github.com/taint7684/hl-oms-ba">',
             f'  <bpmn:collaboration id="Col_{self.pid}">',
             f'    <bpmn:participant id="Pool_{self.pid}" name="{escape(self.name)}" processRef="{self.pid}"/>',
             '  </bpmn:collaboration>',
             f'  <bpmn:process id="{self.pid}" isExecutable="false">',
             f'    <bpmn:laneSet id="LS_{self.pid}">']
        for code, name in self.lanes:
            p.append(f'      <bpmn:lane id="Lane_{self.pid}_{code}" name="{escape(name)}">')
            p += [f'        <bpmn:flowNodeRef>{n["id"]}</bpmn:flowNodeRef>' for n in self.nodes if n["lane"] == code]
            p.append('      </bpmn:lane>')
        p.append('    </bpmn:laneSet>')
        for n in self.nodes:
            inc = [f"F_{i}" for i, f in enumerate(self.flows) if f[1] == n["id"]]
            out = [f"F_{i}" for i, f in enumerate(self.flows) if f[0] == n["id"]]
            body = "".join(f"<bpmn:incoming>{x}</bpmn:incoming>" for x in inc)
            body += "".join(f"<bpmn:outgoing>{x}</bpmn:outgoing>" for x in out)
            if n["kind"] == "timer":
                body += f'<bpmn:timerEventDefinition id="TD_{n["id"]}"/>'
            p.append(f'    <bpmn:{tag[n["kind"]]} id="{n["id"]}" name="{escape(n["label"])}">{body}'
                     f'</bpmn:{tag[n["kind"]]}>')
        for i, (a, b, lbl) in enumerate(self.flows):
            nm = f' name="{escape(lbl)}"' if lbl else ""
            p.append(f'    <bpmn:sequenceFlow id="F_{i}" sourceRef="{a}" targetRef="{b}"{nm}/>')
        p += ['  </bpmn:process>', f'  <bpmndi:BPMNDiagram id="Dia_{self.pid}">',
              f'    <bpmndi:BPMNPlane id="Pl_{self.pid}" bpmnElement="Col_{self.pid}">']
        p.append(f'      <bpmndi:BPMNShape id="S_Pool_{self.pid}" bpmnElement="Pool_{self.pid}" isHorizontal="true">'
                 f'<dc:Bounds x="{PAD}" y="{PAD}" width="{self.width - 2 * PAD}" height="{self.height - 2 * PAD}"/>'
                 '</bpmndi:BPMNShape>')
        for code, _ in self.lanes:
            y, h = self.lane_y[code]
            p.append(f'      <bpmndi:BPMNShape id="S_Lane_{self.pid}_{code}" bpmnElement="Lane_{self.pid}_{code}" '
                     f'isHorizontal="true"><dc:Bounds x="{PAD + POOL_LBL}" y="{y}" '
                     f'width="{self.width - 2 * PAD - POOL_LBL}" height="{h}"/></bpmndi:BPMNShape>')
        for n in self.nodes:
            mk = ' isMarkerVisible="true"' if n["kind"] == "xor" else ""
            p.append(f'      <bpmndi:BPMNShape id="S_{n["id"]}" bpmnElement="{n["id"]}"{mk}>'
                     f'<dc:Bounds x="{n["x"]:.0f}" y="{n["y"]:.0f}" width="{n["w"]}" height="{n["h"]}"/>'
                     '</bpmndi:BPMNShape>')
        for i, (a, b, _) in enumerate(self.flows):
            wps = "".join(f'<di:waypoint x="{x:.0f}" y="{y:.0f}"/>' for x, y in self.route(a, b))
            p.append(f'      <bpmndi:BPMNEdge id="E_{i}" bpmnElement="F_{i}">{wps}</bpmndi:BPMNEdge>')
        p += ['    </bpmndi:BPMNPlane>', '  </bpmndi:BPMNDiagram>', '</bpmn:definitions>', '']
        return "\n".join(p)

    # --- SVG ---------------------------------------------------------------------------------
    def svg(self):
        W, H = self.width, self.height
        s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
             f'font-family="{FONT}">',
             '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
             f'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{INK}"/></marker></defs>',
             f'<rect width="{W}" height="{H}" fill="#fff"/>',
             f'<rect x="{PAD}" y="{PAD}" width="{W - 2 * PAD}" height="{H - 2 * PAD}" fill="none" stroke="{INK}" stroke-width="1.5"/>',
             f'<line x1="{PAD + POOL_LBL}" y1="{PAD}" x2="{PAD + POOL_LBL}" y2="{H - PAD}" stroke="{INK}" stroke-width="1.5"/>',
             f'<text transform="translate({PAD + POOL_LBL / 2 + 5},{H / 2}) rotate(-90)" text-anchor="middle" '
             f'font-size="13" font-weight="700" fill="{INK}">{escape(self.name)}</text>']
        for i, (code, name) in enumerate(self.lanes):
            y, h = self.lane_y[code]
            if i:
                s.append(f'<line x1="{PAD + POOL_LBL}" y1="{y}" x2="{W - PAD}" y2="{y}" stroke="{LINE}"/>')
            s.append(f'<rect x="{PAD + POOL_LBL}" y="{y}" width="{LANE_LBL}" height="{h}" fill="{SOFT}" stroke="{LINE}"/>')
            s.append(f'<text transform="translate({PAD + POOL_LBL + LANE_LBL / 2 + 4},{y + h / 2}) rotate(-90)" '
                     f'text-anchor="middle" font-size="12" font-weight="600" fill="{INK}">{escape(name)}</text>')
        for a, b, lbl in self.flows:
            pts = self.route(a, b)
            d = " ".join(f"{x:.0f},{y:.0f}" for x, y in pts)
            s.append(f'<polyline points="{d}" fill="none" stroke="{INK}" stroke-width="1.2" marker-end="url(#ar)"/>')
            if lbl:
                (x1, y1), (x2, y2) = pts[0], pts[1]
                if abs(x1 - x2) < 1:   # đoạn đầu dọc
                    tx, ty, anc = x1 + 6, (y1 + y2) / 2 if abs(y2 - y1) > 30 else y1 + (14 if y2 > y1 else -6), "start"
                else:
                    tx, ty, anc = x1 + 6, y1 - 6, "start"
                s.append(f'<text x="{tx:.0f}" y="{ty:.0f}" font-size="10.5" fill="{MUTED}" text-anchor="{anc}">'
                         f'{escape(lbl)}</text>')
        for n in self.nodes:
            k, x, y, w, h, cx, cy = n["kind"], n["x"], n["y"], n["w"], n["h"], n["cx"], n["cy"]
            if k in ("task", "sys"):
                fill = ACC_SOFT if k == "sys" else "#fff"
                stroke = ACC if k == "sys" else INK
                s.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{w}" height="{h}" rx="9" fill="{fill}" '
                         f'stroke="{stroke}" stroke-width="1.3"/>')
                lines = _wrap(n["label"], 19)
                y0 = cy - (len(lines) - 1) * 7 + (4 if k == "sys" else 0)
                for j, ln in enumerate(lines):
                    s.append(f'<text x="{cx:.0f}" y="{y0 + j * 14 + 4:.0f}" text-anchor="middle" font-size="11" '
                             f'fill="{INK}">{escape(ln)}</text>')
                if k == "sys":
                    gx, gy = x + 11, y + 11      # biểu tượng bánh răng của service task
                    s.append(f'<circle cx="{gx:.0f}" cy="{gy:.0f}" r="5.5" fill="none" stroke="{ACC}" stroke-width="2.2" '
                             f'stroke-dasharray="2.2 1.6"/><circle cx="{gx:.0f}" cy="{gy:.0f}" r="2" fill="{ACC}"/>')
            elif k in ("xor", "and"):
                s.append(f'<polygon points="{cx},{y} {x + w},{cy} {cx},{y + h} {x},{cy}" fill="#fff" stroke="{INK}" stroke-width="1.3"/>')
                if k == "xor":
                    s.append(f'<path d="M{cx - 8},{cy - 8} L{cx + 8},{cy + 8} M{cx + 8},{cy - 8} L{cx - 8},{cy + 8}" stroke="{INK}" stroke-width="2.4"/>')
                else:
                    s.append(f'<path d="M{cx},{cy - 11} L{cx},{cy + 11} M{cx - 11},{cy} L{cx + 11},{cy}" stroke="{INK}" stroke-width="2.4"/>')
                for j, ln in enumerate(_wrap(n["label"], 18)):
                    s.append(f'<text x="{cx + 4:.0f}" y="{y - 8 - (len(_wrap(n["label"], 18)) - 1 - j) * 12:.0f}" '
                             f'text-anchor="start" font-size="10.5" fill="{INK}">{escape(ln)}</text>')
            else:
                r = EV / 2
                sw = 3.2 if k == "end" else 1.4
                s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" stroke="{INK}" stroke-width="{sw}"/>')
                if k == "timer":
                    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r - 4}" fill="none" stroke="{INK}"/>'
                             f'<path d="M{cx},{cy - 9} L{cx},{cy} L{cx + 6},{cy + 3}" fill="none" stroke="{INK}"/>')
                for j, ln in enumerate(_wrap(n["label"], 18)):
                    s.append(f'<text x="{cx}" y="{cy + r + 14 + j * 12}" text-anchor="middle" font-size="10.5" '
                             f'fill="{INK}">{escape(ln)}</text>')
            if n.get("pain"):
                px, py = x + w - 2, y + 2
                s.append(f'<circle cx="{px}" cy="{py}" r="9" fill="{PAIN}"/><text x="{px}" y="{py + 4}" '
                         f'text-anchor="middle" font-size="10" font-weight="700" fill="#fff">{n["pain"]}</text>')
        s.append("</svg>")
        return "\n".join(s)
