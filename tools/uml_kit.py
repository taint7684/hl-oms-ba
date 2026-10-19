"""Bộ vẽ UML cho HL-OMS (SVG): Use Case Diagram và Activity Diagram (ký hiệu UML theo khóa học:
start = chấm đen, end = chấm đen có viền, activity = chữ nhật bo góc, decision = hình thoi,
fork/join = thanh đen)."""
from xml.sax.saxutils import escape

import bpmn_kit as bk
from bpmn_kit import Process, _wrap

INK, MUTED, LINE, SOFT, ACC, ACC_SOFT, FONT = bk.INK, bk.MUTED, bk.LINE, bk.SOFT, bk.ACC, bk.ACC_SOFT, bk.FONT


def _actor(x, y, name):
    return (f'<g stroke="{INK}" stroke-width="1.6" fill="none"><circle cx="{x}" cy="{y}" r="9"/>'
            f'<line x1="{x}" y1="{y + 9}" x2="{x}" y2="{y + 36}"/><line x1="{x - 16}" y1="{y + 18}" x2="{x + 16}" y2="{y + 18}"/>'
            f'<line x1="{x}" y1="{y + 36}" x2="{x - 13}" y2="{y + 56}"/><line x1="{x}" y1="{y + 36}" x2="{x + 13}" y2="{y + 56}"/></g>'
            f'<text x="{x}" y="{y + 74}" text-anchor="middle" font-size="12" font-weight="600" fill="{INK}">{escape(name)}</text>')


def ucd(title, system, left, right, ucs, links, rels=(), cols=3, uc_w=200, uc_h=58, gap_x=40, gap_y=26):
    """left/right: [(mã, tên)] · ucs: [(mã, nhãn)] theo thứ tự lưới · links: [(actor, uc)] · rels: [(uc, uc, 'include'|'extend')]."""
    rows = (len(ucs) + cols - 1) // cols
    bx, by = 190, 70
    bw = cols * uc_w + (cols + 1) * gap_x
    bh = rows * uc_h + (rows + 1) * gap_y + 30
    W, H = bx + bw + 190, by + bh + 40
    pos = {}
    for i, (uid, _) in enumerate(ucs):
        r, c = divmod(i, cols)
        pos[uid] = (bx + gap_x + c * (uc_w + gap_x) + uc_w / 2, by + 30 + gap_y + r * (uc_h + gap_y) + uc_h / 2)

    def actor_pos(side, k, n):
        y = by + (k + 0.5) * bh / n - 40
        return (bx - 105 if side == "L" else bx + bw + 105, y)
    apos = {a[0]: actor_pos("L", k, len(left)) for k, a in enumerate(left)}
    apos.update({a[0]: actor_pos("R", k, len(right)) for k, a in enumerate(right)})

    s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{FONT}">',
         '<defs><marker id="op" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">'
         f'<path d="M0,0 L10,5 L0,10" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker></defs>',
         f'<rect width="{W}" height="{H}" fill="#fff"/>',
         f'<text x="24" y="34" font-size="17" font-weight="700" fill="{INK}">{escape(title)}</text>',
         f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="6" fill="{SOFT}" stroke="{INK}" stroke-width="1.3"/>',
         f'<text x="{bx + bw / 2}" y="{by + 22}" text-anchor="middle" font-size="13" font-weight="700" fill="{INK}">{escape(system)}</text>']
    for a, u in links:                      # đường actor – use case (vẽ trước để nằm dưới)
        ax, ay = apos[a]
        ux, uy = pos[u]
        ex = ux - uc_w / 2 if ax < ux else ux + uc_w / 2
        s.append(f'<line x1="{ax + (18 if ax < ux else -18)}" y1="{ay + 22}" x2="{ex}" y2="{uy}" stroke="{MUTED}" stroke-width="1"/>')
    labels = []
    for a, b, kind in rels:
        (x1, y1), (x2, y2) = pos[a], pos[b]
        if abs(y1 - y2) < 1:
            p1 = (x1 + uc_w / 2 * (1 if x2 > x1 else -1), y1)
            p2 = (x2 - uc_w / 2 * (1 if x2 > x1 else -1), y2)
        else:
            p1 = (x1, y1 + uc_h / 2 * (1 if y2 > y1 else -1))
            p2 = (x2, y2 - uc_h / 2 * (1 if y2 > y1 else -1))
        s.append(f'<line x1="{p1[0]:.0f}" y1="{p1[1]:.0f}" x2="{p2[0]:.0f}" y2="{p2[1]:.0f}" stroke="{MUTED}" '
                 f'stroke-dasharray="5 4" marker-end="url(#op)"/>')
        labels.append(f'<text x="{(p1[0] + p2[0]) / 2:.0f}" y="{(p1[1] + p2[1]) / 2 - 5:.0f}" text-anchor="middle" '
                      f'font-size="10" fill="{MUTED}" paint-order="stroke" stroke="{SOFT}" stroke-width="4">«{kind}»</text>')
    for uid, label in ucs:
        x, y = pos[uid]
        s.append(f'<ellipse cx="{x}" cy="{y}" rx="{uc_w / 2}" ry="{uc_h / 2}" fill="#fff" stroke="{INK}" stroke-width="1.2"/>')
        lines = _wrap(label, 28)
        y0 = y - (len(lines) - 1) * 7 + 9
        s.append(f'<text x="{x}" y="{y - 11 - (len(lines) - 1) * 7}" text-anchor="middle" font-size="9.5" font-weight="700" fill="{ACC}">{uid}</text>')
        for j, ln in enumerate(lines):
            s.append(f'<text x="{x}" y="{y0 + j * 14:.0f}" text-anchor="middle" font-size="11.5" fill="{INK}">{escape(ln)}</text>')
    s += labels
    for code, name in left + right:
        s.append(_actor(*apos[code], name))
    s.append("</svg>")
    return "\n".join(s), W, H


class Activity(Process):
    """Activity Diagram theo swimlane, dùng chung bố cục với Process. Loại: start · end · task · sys ·
    xor (decision/merge) · and (fork/join)."""

    def __init__(self, *a, **k):
        super().__init__(*a, **k)
        for n in self.nodes:
            if n["kind"] == "and":            # thanh fork/join dọc
                n.update(w=8, h=64, x=n["cx"] - 4, y=n["cy"] - 32)
            if n["kind"] in ("start", "end"):
                n.update(w=26, h=26, x=n["cx"] - 13, y=n["cy"] - 13)

    def _node_svg(self, n):
        k, x, y, w, h, cx, cy = n["kind"], n["x"], n["y"], n["w"], n["h"], n["cx"], n["cy"]
        s = []
        if k in ("task", "sys"):
            fill, stroke = (ACC_SOFT, ACC) if k == "sys" else ("#fff", INK)
            s.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{w}" height="{h}" rx="14" fill="{fill}" stroke="{stroke}" stroke-width="1.3"/>')
            lines = _wrap(n["label"], 19)
            y0 = cy - (len(lines) - 1) * 7
            for j, ln in enumerate(lines):
                s.append(f'<text x="{cx:.0f}" y="{y0 + j * 14 + 4:.0f}" text-anchor="middle" font-size="11" fill="{INK}">{escape(ln)}</text>')
        elif k == "xor":
            s.append(f'<polygon points="{cx},{y} {x + w},{cy} {cx},{y + h} {x},{cy}" fill="#fff" stroke="{INK}" stroke-width="1.3"/>')
            for j, ln in enumerate(_wrap(n["label"], 18)):
                s.append(f'<text x="{cx + 4:.0f}" y="{y - 8 - (len(_wrap(n["label"], 18)) - 1 - j) * 12:.0f}" font-size="10.5" fill="{INK}">{escape(ln)}</text>')
        elif k == "and":
            s.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{w}" height="{h}" fill="{INK}"/>')
        elif k == "start":
            s.append(f'<circle cx="{cx}" cy="{cy}" r="11" fill="{INK}"/>')
        elif k == "end":
            s.append(f'<circle cx="{cx}" cy="{cy}" r="12" fill="#fff" stroke="{INK}" stroke-width="1.6"/>'
                     f'<circle cx="{cx}" cy="{cy}" r="7" fill="{INK}"/>')
        if k in ("start", "end") and n["label"]:
            for j, ln in enumerate(_wrap(n["label"], 18)):
                s.append(f'<text x="{cx}" y="{cy + 28 + j * 12}" text-anchor="middle" font-size="10.5" fill="{INK}">{escape(ln)}</text>')
        return "\n".join(s)


def activity_svg(act):
    """SVG Activity: khung + lane + cạnh của Process, nút vẽ theo ký hiệu UML."""
    saved = act.nodes
    act.nodes = []                          # Process.svg vẽ khung/lane/cạnh, không vẽ nút
    frame = Process.svg(act)
    act.nodes = saved
    nodes = "\n".join(act._node_svg(n) for n in act.nodes)
    return frame.replace("</svg>", nodes + "\n</svg>")
