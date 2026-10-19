/* HL-OMS prototype — một trạng thái dùng chung cho 4 ứng dụng, đồng bộ giữa các tab bằng
   localStorage + BroadcastChannel. Mã màn hình (SCR-xx) và quy tắc (BR-xx) khớp với SRS. */
'use strict';
const D = window.HL_DATA;
const MENU = Object.fromEntries(D.menu.map(m => [m.id, m]));
const STN = Object.fromEntries(D.stations.map(s => [s.id, s]));
const ALG = Object.fromEntries(D.allergens.map(a => [a.id, a]));
const KEY = 'hloms-proto-v1', MIN = 60000, PIN = '1234';
const ROLE_VI = { WAITER: 'Phục vụ', COOK: 'Bếp', CHEF: 'Bếp trưởng', CASHIER: 'Thu ngân', MANAGER: 'Quản lý', ADMIN: 'Admin' };
const APPS = {
  waiter: { name: 'Phục vụ', roles: ['WAITER', 'CASHIER', 'MANAGER'], home: '#/waiter/tables' },
  kds: { name: 'Bếp', roles: ['COOK', 'CHEF', 'MANAGER'], home: '#/kds/HOT' },
  cashier: { name: 'Thu ngân', roles: ['CASHIER', 'MANAGER'], home: '#/cashier/tables' },
  manager: { name: 'Quản lý', roles: ['MANAGER', 'ADMIN'], home: '#/manager/approvals' },
};
const IS = { NEW: ['Mới', 'line'], QUEUED: ['Chờ nấu', ''], COOKING: ['Đang nấu', 'blue'], READY: ['Sẵn sàng', 'green'],
  SERVED: ['Đã phục vụ', 'line'], VOID_PENDING: ['Chờ duyệt hủy', 'amber'], CANCELLED: ['Đã hủy', 'red'] };
const TS = { AVAILABLE: 'Trống', OCCUPIED: 'Có khách', MERGED: 'Ghép', AWAITING: 'Chờ thanh toán', CLEANING: 'Cần dọn' };
const OS = { DRAFT: 'Draft', SUBMITTED: 'Submitted', IN_PROGRESS: 'In Progress', SERVED: 'Served', BILLED: 'Billed', PAID: 'Paid', CANCELLED: 'Cancelled' };

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = c => (c < 0 ? '−' : '') + '$' + (Math.abs(c) / 100).toFixed(2);
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const hm = t => new Date(t).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false });
const mins = t => Math.max(0, Math.floor((Date.now() - t) / MIN));
const r5 = c => Math.round(c / 5) * 5;                                  // BR-15
const userOf = u => D.users.find(x => x.username === u) || { display_name: u, role: '' };

/* ---------------- trạng thái ---------------- */
let S;
const chan = 'BroadcastChannel' in window ? new BroadcastChannel('hloms') : null;
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) { S = JSON.parse(raw); if (S.v === 1) return; } } catch (e) { /* bộ nhớ bị chặn */ }
  S = seed();
}
function save(mutating = true) {
  if (mutating && S.settings.offline) S.pendingSync++;
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* chạy trong bộ nhớ */ }
  if (chan) chan.postMessage('sync');
}
if (chan) chan.onmessage = () => { const before = notesFor(); try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { } alertNew(before); render(); };
const id = p => p + (++S.seq);
function log(action, detail) { S.audit.unshift({ at: Date.now(), user: cur()?.username || 'system', action, detail }); }

function rng(seed) { return () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296; }
function seed() {
  const t = Date.now();
  const st = { v: 1, seq: 100, tables: {}, orders: {}, menu: {}, notes: [], approvals: [], audit: [], sales: [],
    settings: { holiday: false, lunch: false, offline: false, surcharge: D.surcharge }, pendingSync: 0, sessions: {}, shift: null };
  D.tables.forEach(tb => st.tables[tb.code] = { status: 'AVAILABLE', guests: 0, openedAt: null, order: null, waiter: null, mergedInto: null });
  D.menu.forEach(m => st.menu[m.id] = { status: m.active ? 'AVAILABLE' : 'INACTIVE', qty: null });
  st.menu.M41 = { status: 'SOLDOUT', qty: 0 }; st.menu.M22 = { status: 'LIMITED', qty: 2 }; st.menu.M53 = { status: 'LIMITED', qty: 3 };
  S = st;
  const mk = (code, guests, waiter, ago) => { const o = newOrder(code, 'DINE'); Object.assign(st.tables[code], { status: 'OCCUPIED', guests, openedAt: t - ago * MIN, waiter }); o.createdAt = t - ago * MIN; return o; };
  const it = (o, mid, qty, status, sentAgo, extra = {}) => {
    const m = MENU[mid], mods = (extra.mods || []);
    const item = { id: id('I'), menuId: mid, qty, mods, note: extra.note || '', allergens: extra.allergens || [], status,
      unit: m.price + mods.reduce((a, x) => a + x.price, 0), round: extra.round || 1, sentAt: sentAgo == null ? null : t - sentAgo * MIN,
      cookingAt: null, readyAt: null, servedAt: null, ack: !!extra.ack, prev: null };
    if (['COOKING', 'READY', 'SERVED'].includes(status)) item.cookingAt = item.sentAt + 2 * MIN;
    if (['READY', 'SERVED'].includes(status)) item.readyAt = t - 1 * MIN;
    if (status === 'SERVED') item.servedAt = t - 0.5 * MIN;
    o.items.push(item); o.round = Math.max(o.round, item.round); return item;
  };
  let o = mk('T03', 4, 'minh.dang', 24);
  it(o, 'M01', 1, 'SERVED', 22); it(o, 'M17', 2, 'COOKING', 9, { mods: [{ g: 'SIZE', name: 'Lớn', price: 300 }] }); it(o, 'M63', 2, 'READY', 9);
  o = mk('T05', 2, 'vy.huynh', 20);
  it(o, 'M25', 1, 'QUEUED', 17, { mods: [{ g: 'SPICE', name: 'Cay vừa', price: 0 }] });
  it(o, 'M26', 1, 'QUEUED', 17, { allergens: ['PEA'], note: 'Khách dị ứng đậu phộng nặng' }); it(o, 'M66', 2, 'SERVED', 17);
  o = mk('T07', 3, 'minh.dang', 62);
  ['M03', 'M19', 'M34', 'M36', 'M65', 'M67', 'M67'].forEach(mid => it(o, mid, 1, 'SERVED', 55));
  o = mk('T09', 2, 'jack.wilson', 3); it(o, 'M20', 1, 'NEW', null); it(o, 'M68', 2, 'NEW', null);
  o = mk('T14', 6, 'vy.huynh', 12);
  it(o, 'M49', 1, 'COOKING', 4, { mods: [{ g: 'SPICE', name: 'Cay vừa', price: 0 }] }); it(o, 'M50', 1, 'QUEUED', 4); it(o, 'M56', 4, 'QUEUED', 4);
  const rm = it(o, 'M54', 1, 'COOKING', 4); it(o, 'M67', 3, 'READY', 4); it(o, 'M72', 2, 'SERVED', 4);
  rm.status = 'VOID_PENDING'; rm.prev = 'COOKING';
  st.approvals.push({ id: id('A'), kind: 'VOID', orderId: o.id, itemId: rm.id, reason: 'Khách đổi ý', by: 'vy.huynh', at: t - 2 * MIN, status: 'PENDING' });
  o = mk('P02', 2, 'jack.wilson', 35); it(o, 'M28', 1, 'SERVED', 30); it(o, 'M13', 1, 'SERVED', 30); it(o, 'M66', 2, 'SERVED', 30);
  st.tables.T12 = { status: 'CLEANING', guests: 0, openedAt: null, order: null, waiter: 'bao.ngo', mergedInto: null };
  o = newOrder('TA-01', 'TA'); o.customer = 'Sarah'; it(o, 'M34', 1, 'COOKING', 6); it(o, 'M38', 1, 'QUEUED', 6);
  o.billStatus = 'PAID'; o.payments.push({ amount: 3800, method: 'EFTPOS', at: t - 6 * MIN, part: null });
  st.notes.push({ id: id('N'), to: 'minh.dang', table: 'T03', orderId: st.tables.T03.order, text: '2 × Cà phê sữa đá sẵn sàng', at: t - MIN, kind: 'READY', done: false });
  st.notes.push({ id: id('N'), to: 'vy.huynh', table: 'T14', orderId: st.tables.T14.order, text: '3 × Trà tắc sẵn sàng', at: t - MIN, kind: 'READY', done: false });
  // lịch sử bán trong ngày cho báo cáo (dữ liệu giả lập, có tính lặp lại)
  const R = rng(20261106), open = new Date(t); open.setHours(11, 0, 0, 0);
  const span = Math.max(4 * 3600e3, t - open.getTime() - 30 * MIN);
  for (let k = 0; k < 108; k++) {
    const at = open.getTime() + span * (k / 108) + R() * 9 * MIN, items = [], n = 2 + Math.floor(R() * 5);
    for (let j = 0; j < n; j++) { const m = D.menu[Math.floor(Math.pow(R(), 1.7) * D.menu.length)]; items.push({ menuId: m.id, qty: 1, amount: m.price }); }
    const sub = items.reduce((a, x) => a + x.amount, 0), disc = R() < 0.06 ? Math.round(sub * 0.1) : 0, total = sub - disc;
    const cash = R() < 0.18;
    st.sales.push({ at, orderId: 'H' + k, table: 'T' + String(1 + Math.floor(R() * 18)).padStart(2, '0'), sub, discount: disc, surcharge: 0, total,
      gst: Math.round(total / 11), payments: [{ method: cash ? 'CASH' : 'EFTPOS', amount: cash ? r5(total) : total }],
      items, prep: items.map(x => ({ station: MENU[x.menuId].station, mins: Math.max(2, Math.round(STN[MENU[x.menuId].station].late * (0.45 + R() * 0.75))) })) });
    if (disc) st.audit.push({ at, user: 'thu.bui', action: 'Giảm giá', detail: `${st.sales.at(-1).table} · 10% · Khách quen · ${money(disc)}` });
  }
  st.audit.push({ at: t - 30 * MIN, user: 'hung.tran', action: 'Báo hết món', detail: 'M41 Cơm cá kho tộ → Hết' });
  st.audit.push({ at: t - 50 * MIN, user: 'hung.tran', action: 'Đặt số phần', detail: 'M22 Phở hải sản → còn 2' });
  st.audit.sort((a, b) => b.at - a.at);
  st.sessions = {};
  S = undefined;
  return st;
}
function newOrder(table, type) {
  const o = { id: id('O'), table, type, status: 'OPEN', items: [], round: 0, createdAt: Date.now(), discount: null,
    billStatus: 'OPEN', split: null, payments: [], customer: '' };
  S.orders[o.id] = o;
  if (type === 'DINE') S.tables[table].order = o.id;
  return o;
}

/* ---------------- quy tắc nghiệp vụ ---------------- */
const live = o => o.items.filter(i => i.status !== 'CANCELLED');
function orderStatus(o) {
  if (o.status === 'CANCELLED') return 'CANCELLED';
  const L = live(o), sent = L.filter(i => i.status !== 'NEW');
  if (o.type === 'TA' && o.billStatus === 'PAID') return sent.length && sent.every(i => i.status === 'SERVED') ? 'PAID' : sent.some(i => i.status !== 'QUEUED') ? 'IN_PROGRESS' : 'SUBMITTED';
  if (o.billStatus === 'PAID') return 'PAID';
  if (!sent.length) return 'DRAFT';
  if (['PRINTED', 'SPLIT', 'PARTIAL'].includes(o.billStatus)) return 'BILLED';
  if (sent.every(i => i.status === 'SERVED') && !L.some(i => i.status === 'NEW')) return 'SERVED';
  if (sent.some(i => i.status !== 'QUEUED')) return 'IN_PROGRESS';
  return 'SUBMITTED';
}
function priceOf(m) { return S.settings.lunch && m.lunch ? m.lunch : m.price; }       // BR-08
function canOrder(mid) { const s = S.menu[mid]; return s.status === 'AVAILABLE' || (s.status === 'LIMITED' && s.qty > 0); } // BR-01
function billLines(o) { return live(o).filter(i => o.type === 'TA' || i.status !== 'NEW'); }
function calc(o) {
  const sub = billLines(o).reduce((a, i) => a + i.unit * i.qty, 0);
  const d = o.discount && o.discount.status === 'APPLIED' ? (o.discount.type === 'PCT' ? Math.round(sub * o.discount.value / 100) : Math.min(sub, o.discount.value)) : 0;
  const sur = S.settings.holiday ? Math.round((sub - d) * S.settings.surcharge / 100) : 0;    // BR-10
  const total = sub - d + sur;
  return { sub, disc: d, sur, total, gst: Math.round(total / 11) };                           // BR-09
}
function blockers(o) {                                                                          // BR-12
  const b = [];
  if (o.type === 'TA') return b;
  live(o).forEach(i => {
    if (i.status === 'NEW') b.push(`${name(i)} chưa gửi bếp`);
    else if (i.status === 'VOID_PENDING') b.push(`${name(i)} đang chờ duyệt hủy`);
    else if (i.status !== 'SERVED') b.push(`${name(i)} chưa phục vụ (${IS[i.status][0]})`);
  });
  if (o.discount && o.discount.status === 'PENDING') b.push('Giảm giá đang chờ Quản lý duyệt');
  return b;
}
const name = i => MENU[i.menuId].vi;
function paid(o) { return o.payments.reduce((a, p) => a + p.amount, 0); }
function needApproval(type, value, sub) { return type === 'FREE' || (type === 'PCT' ? value > 10 : value > sub * 0.1); } // BR-11

function sendOrder(o) {                                                                          // UC-02
  const fresh = o.items.filter(i => i.status === 'NEW');
  if (!fresh.length) return toast('Không có món mới để gửi', 'err');
  const short = [];
  o.round++;
  fresh.forEach(i => {
    const ms = S.menu[i.menuId];
    if (ms.status === 'SOLDOUT' || ms.status === 'INACTIVE' || (ms.status === 'LIMITED' && ms.qty < i.qty)) { short.push(name(i)); return; }
    if (ms.status === 'LIMITED') { ms.qty -= i.qty; if (ms.qty <= 0) { ms.qty = 0; ms.status = 'SOLDOUT'; } }   // BR-07
    Object.assign(i, { status: 'QUEUED', sentAt: Date.now(), round: o.round });
  });
  if (o.type === 'DINE' && S.tables[o.table].status === 'AWAITING') S.tables[o.table].status = 'OCCUPIED';
  if (['PRINTED'].includes(o.billStatus)) o.billStatus = 'OPEN';
  save();
  if (short.length) toast(`Không đủ phần: ${short.join(', ')} — chọn món khác`, 'err');
  else toast(`Đã gửi bếp lượt ${o.round} · ${fresh.length} món`, 'ok');
}
function setItem(o, i, status) {
  i.prev = i.status; i.status = status;
  if (status === 'COOKING') i.cookingAt = Date.now();
  if (status === 'READY') {
    i.readyAt = Date.now();
    const tb = o.type === 'DINE' ? S.tables[o.table] : null;
    S.notes.unshift({ id: id('N'), to: tb ? tb.waiter : 'cashier', table: o.table, orderId: o.id, itemId: i.id,
      text: `${i.qty} × ${name(i)} sẵn sàng`, at: Date.now(), kind: 'READY', done: false });
  }
  if (status === 'SERVED') { i.servedAt = Date.now(); S.notes.forEach(n => { if (n.itemId === i.id) n.done = true; }); }
}
function markSoldOut(mid, by) {
  S.menu[mid] = { status: 'SOLDOUT', qty: 0 };
  log('Báo hết món', `${mid} ${MENU[mid].vi} → Hết`);
  Object.values(S.orders).forEach(o => o.items.forEach(i => {
    if (i.menuId === mid && i.status === 'QUEUED' && o.type === 'DINE')
      S.notes.unshift({ id: id('N'), to: S.tables[o.table].waiter, table: o.table, orderId: o.id, text: `${MENU[mid].vi} đã hết — báo khách đổi món hoặc hủy`, at: Date.now(), kind: 'SOLDOUT', done: false });
  }));
}
function closePaid(o) {
  const c = calc(o);
  o.billStatus = 'PAID'; o.paidAt = Date.now();
  if (o.type === 'DINE') { const tb = S.tables[o.table]; tb.status = 'CLEANING'; tb.order = null; tb.guests = 0;   // BR-17
    Object.values(S.tables).forEach(x => { if (x.mergedInto === o.table) Object.assign(x, { status: 'CLEANING', mergedInto: null }); }); }
  S.sales.push({ at: Date.now(), orderId: o.id, table: o.table, sub: c.sub, discount: c.disc, surcharge: c.sur, total: c.total, gst: c.gst,
    payments: o.payments.map(p => ({ method: p.method, amount: p.amount })),
    items: billLines(o).map(i => ({ menuId: i.menuId, qty: i.qty, amount: i.unit * i.qty })),
    prep: billLines(o).filter(i => i.readyAt && i.sentAt).map(i => ({ station: MENU[i.menuId].station, mins: Math.max(1, Math.round((i.readyAt - i.sentAt) / MIN)) })) });
  log('Thanh toán', `${o.table} · ${money(c.total)} · ${o.payments.map(p => p.method).join(' + ')}`);
}

/* ---------------- phiên đăng nhập ---------------- */
let route = {}, ui = { cat: 'C3', q: '', part: 0, pin: '', loginUser: null, kdsView: null, mfilter: { cat: '', q: '' }, audit: '', rep: 'today' };
const cur = () => S.sessions[route.app];
let idle = Date.now();
document.addEventListener('pointerdown', () => { idle = Date.now(); }, true);
setInterval(() => {                                                                              // NFR-15: khóa sau 2 phút
  ['waiter', 'cashier'].forEach(a => { const s = S.sessions[a]; if (s && route.app === a && Date.now() - idle > 2 * MIN) { delete S.sessions[a]; save(false); render(); toast('Đã tự khóa sau 2 phút không thao tác'); } });
  if (route.app === 'kds' && !$('#modal').innerHTML) render();
}, 20000);

/* ---------------- tiện ích giao diện ---------------- */
function toast(msg, kind = '') { const el = document.createElement('div'); el.className = 'toast ' + kind; el.textContent = msg; $('#toasts').append(el); setTimeout(() => el.remove(), 3200); }
function modal(title, body, foot = '', wide = false) {
  $('#modal').innerHTML = `<div class="modal" data-act="mclose-bg"><div class="mbox ${wide ? 'wide' : ''}" role="dialog" aria-label="${esc(title)}">
    <div class="mh"><h3 class="grow">${title}</h3><button class="btn sm ghost" data-act="mclose" aria-label="Đóng">✕</button></div>
    <div class="mb">${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}</div></div>`;
}
const mclose = () => { $('#modal').innerHTML = ''; };
const chip = (txt, cls = '') => `<span class="chip ${cls}">${esc(txt)}</span>`;
const istat = i => chip(IS[i.status][0], IS[i.status][1]);
const algTags = list => list.map(a => `<span class="alg">${esc(ALG[a]?.vi || a)}</span>`).join('');
function notesFor() { const u = S.sessions.waiter?.username; return S.notes.filter(n => !n.done && (n.to === u)).map(n => n.id); }
function alertNew(before) {
  if (route.app !== 'waiter') return;
  const fresh = notesFor().filter(x => !before.includes(x));
  if (fresh.length) { const n = S.notes.find(x => x.id === fresh[0]); toast(`🔔 ${n.table}: ${n.text}`, 'ok'); if (navigator.vibrate) navigator.vibrate([200, 100, 200]); }
}
function banners() {
  let h = '';
  if (S.settings.offline) h += `<div class="banner off">● Offline — đang chạy trên mạng nội bộ · ${S.pendingSync} thao tác chờ đồng bộ (US-35)</div>`;
  if (S.settings.holiday) h += `<div class="banner hol">Ngày lễ NSW — phụ thu ${S.settings.surcharge}% tự áp trên bill (BR-10)</div>`;
  return h;
}

/* ---------------- định tuyến ---------------- */
function parse() {
  const p = (location.hash || '#/waiter/tables').slice(2).split('/');
  return { app: APPS[p[0]] ? p[0] : 'waiter', view: p[1] || '', arg: p[2] || '' };
}
function render() {
  route = parse();
  const sess = cur(), A = APPS[route.app];
  let scr, html;
  if (!sess) ({ scr, html } = scrLogin());
  else ({ scr, html } = VIEWS[route.app](sess));
  const top = `<header class="top"><div class="brand">HL-OMS<span>Prototype</span></div>
    <nav class="apps" aria-label="Ứng dụng">${Object.entries(APPS).map(([k, a]) => `<a href="${a.home}" class="${k === route.app ? 'on' : ''}">${a.name}</a>`).join('')}</nav>
    <div class="toggles">
      <span class="tg ${S.settings.holiday ? 'on' : ''}" data-act="tg" data-k="holiday" role="switch" aria-checked="${S.settings.holiday}"><i></i>Ngày lễ</span>
      <span class="tg ${S.settings.lunch ? 'on' : ''}" data-act="tg" data-k="lunch" role="switch" aria-checked="${S.settings.lunch}"><i></i>Giờ trưa</span>
      <span class="tg ${S.settings.offline ? 'on' : ''}" data-act="tg" data-k="offline" role="switch" aria-checked="${S.settings.offline}"><i></i>Mất mạng</span>
      <button class="topbtn" data-act="guide">Kịch bản demo</button><button class="topbtn" data-act="reset">Đặt lại</button>
    </div></header>`;
  const frame = { waiter: 'phone', kds: 'kds', cashier: 'tablet', manager: 'desk' }[route.app];
  const inner = frame === 'phone' ? `<div class="bar"><span>${hm(Date.now())}</span><span>${S.settings.offline ? 'LAN' : '5G'} ▮▮▮ 82%</span></div>${html}` : html;
  $('#app').innerHTML = `${top}<main class="stage"><div class="${frame}${frame === 'kds' ? ' kdark' : ''}"><span class="scr">${scr}</span>${inner}</div></main>`;
  document.title = `HL-OMS Prototype · ${A.name} · ${scr}`;
}
window.addEventListener('hashchange', () => { mclose(); render(); });

/* ---------------- SCR-01 đăng nhập PIN ---------------- */
function scrLogin() {
  const A = APPS[route.app], users = D.users.filter(u => A.roles.includes(u.role) && u.status === 'Active');
  if (!ui.loginUser || !users.some(u => u.username === ui.loginUser)) ui.loginUser = users[0].username;
  const body = `<div class="body" style="display:flex;flex-direction:column;justify-content:center;max-width:420px;margin:0 auto;width:100%">
    <h2 style="text-align:center;font-size:22px">${A.name}</h2><p class="muted" style="text-align:center;margin:4px 0 16px">Chọn tên và nhập PIN cá nhân</p>
    <div class="users">${users.map(u => `<button class="${u.username === ui.loginUser ? 'on' : ''}" data-act="pickuser" data-u="${u.username}">${esc(u.display_name)}<br><small class="muted">${ROLE_VI[u.role]}</small></button>`).join('')}</div>
    <div class="dots">${[0, 1, 2, 3].map(k => `<i class="${ui.pin.length > k ? 'on' : ''}"></i>`).join('')}</div>
    <div class="pin">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => k === '' ? '<span></span>' : `<button data-act="pin" data-k="${k}">${k}</button>`).join('')}</div>
    <p class="muted small" style="text-align:center;margin-top:14px">PIN demo: <b>1234</b> · Khóa sau 5 lần sai · Tự khóa sau 2 phút (NFR-15)</p></div>`;
  return { scr: 'SCR-01', html: body };
}

/* ---------------- App Phục vụ ---------------- */
function waiterTabs(on, sess) {
  const n = S.notes.filter(x => !x.done && x.to === sess.username).length;
  return `<nav class="tabbar"><a href="#/waiter/tables" class="${on === 'tables' ? 'on' : ''}"><b>▦</b>Sơ đồ bàn</a>
    <a href="#/waiter/notify" class="${on === 'notify' ? 'on' : ''}"><b>🔔</b>Thông báo${n ? `<span class="badge">${n}</span>` : ''}</a>
    <a href="#" data-act="lock" class=""><b>⏻</b>Khóa máy</a></nav>`;
}
const VIEWS = {};
VIEWS.waiter = sess => {
  if (route.view === 'menu') return scrMenu(sess);
  if (route.view === 'order') return scrOrder(sess);
  if (route.view === 'notify') return scrNotify(sess);
  return scrTables(sess);
};
function scrTables(sess) {
  const zones = [...new Set(D.tables.map(t => t.zone))];
  const tile = t => {
    const tb = S.tables[t.code], o = tb.order && S.orders[tb.order];
    const ready = o && o.items.some(i => i.status === 'READY');
    const sub = tb.status === 'AVAILABLE' ? `${t.seats} ghế` : tb.status === 'CLEANING' ? 'Cần dọn' : tb.status === 'MERGED' ? `Ghép ${tb.mergedInto}` : `${tb.guests} khách · ${mins(tb.openedAt)}'`;
    return `<button class="tb ${tb.status}" data-act="table" data-t="${t.code}" aria-label="Bàn ${t.code} ${TS[tb.status]}">${ready ? '<span class="bell" title="Có món sẵn sàng">🔔</span>' : ''}
      <b>${t.code}</b><small>${sub}</small><small>${tb.status === 'AWAITING' ? 'Chờ thanh toán' : tb.waiter && tb.status !== 'AVAILABLE' ? esc(userOf(tb.waiter).display_name) : '&nbsp;'}</small></button>`;
  };
  const html = `${banners()}<div class="hd"><h2 class="grow">Sơ đồ bàn</h2>${chip(`${Object.values(S.tables).filter(t => t.status === 'OCCUPIED' || t.status === 'AWAITING').length}/22 có khách`, 'blue')}</div>
    <div class="body"><div class="legend"><span style="--c:var(--line)">Trống</span><span style="--c:#9db8f5">Có khách</span><span style="--c:#f5c98a">Chờ thanh toán</span><span style="--c:#c9b2f5">Cần dọn</span><span style="--c:var(--green)">🔔 Món sẵn sàng</span></div>
    ${zones.map(z => `<div class="zone">${z}</div><div class="tables">${D.tables.filter(t => t.zone === z).map(tile).join('')}</div>`).join('')}</div>${waiterTabs('tables', sess)}`;
  return { scr: 'SCR-02', html };
}
function scrMenu(sess) {
  const o = S.orders[route.arg]; if (!o) { location.hash = '#/waiter/tables'; return { scr: '', html: '' }; }
  const q = fold(ui.q.trim());
  const list = D.menu.filter(m => S.menu[m.id].status !== 'INACTIVE' && (q ? fold(m.vi + ' ' + m.en).includes(q) : m.cat === ui.cat));
  const fresh = o.items.filter(i => i.status === 'NEW'), freshSum = fresh.reduce((a, i) => a + i.unit * i.qty, 0);
  const row = m => {
    const st = S.menu[m.id], ok = canOrder(m.id), lunch = S.settings.lunch && m.lunch;
    const req = m.mods.some(g => D.modifiers[g].required);
    return `<div class="dish ${ok ? '' : 'off'}"><div class="nm" data-act="${ok ? 'dish' : 'soldout'}" data-m="${m.id}" style="cursor:pointer">
      <b>${esc(m.vi)}</b><small>${esc(m.en)}</small><div class="row wrap" style="gap:4px;margin-top:3px">
      ${st.status === 'SOLDOUT' ? chip('Hết', 'red') : ''}${st.status === 'LIMITED' && st.qty <= 3 && st.qty > 0 ? chip(`Còn ${st.qty}`, 'amber') : ''}
      ${lunch ? chip('Lunch', 'acc') : ''}${m.allergens.length ? `<span class="small muted">⚠ ${m.allergens.length} chất gây dị ứng</span>` : ''}</div></div>
      <div class="right num" style="min-width:64px"><b>${money(priceOf(m))}</b>${lunch ? `<br><s class="small muted">${money(m.price)}</s>` : ''}</div>
      ${ok ? (req ? `<button class="add alt" data-act="dish" data-m="${m.id}" aria-label="Chọn tùy chọn ${esc(m.vi)}">Chọn</button>` : `<button class="add" data-act="quick" data-m="${m.id}" aria-label="Thêm nhanh ${esc(m.vi)}">+</button>`) : '<span style="width:44px"></span>'}</div>`;
  };
  const html = `${banners()}<div class="hd"><a class="btn sm ghost" href="#/waiter/order/${o.id}" aria-label="Quay lại">←</a><h2 class="grow">${o.table} · Gọi món</h2>${S.settings.lunch ? chip('Giá Lunch Special', 'acc') : ''}</div>
    <div style="padding:10px 16px 0"><input id="q" placeholder="Tìm món (gõ không dấu: pho bo, bun cha…)" value="${esc(ui.q)}" data-in="q" aria-label="Tìm món"></div>
    <div class="body" style="padding-top:8px">${q ? `<p class="muted small">${list.length} kết quả</p>` : `<div class="cats">${D.cats.map(c => `<button class="${c.id === ui.cat ? 'on' : ''}" data-act="cat" data-c="${c.id}">${esc(c.vi)}</button>`).join('')}</div>`}
    ${list.map(row).join('') || '<div class="empty">Không có món phù hợp</div>'}</div>
    <div class="dock"><a class="btn pri block" href="#/waiter/order/${o.id}">Xem đơn · ${fresh.reduce((a, i) => a + i.qty, 0)} món mới · ${money(freshSum)}</a></div>`;
  return { scr: 'SCR-03', html };
}
function sheetDish(mid) {                                                                         // SCR-04
  const m = MENU[mid], st = S.menu[mid];
  ui.sheet = { mid, qty: 1, sel: {}, allergens: [], note: '' };
  drawSheet(m, st);
}
function drawSheet(m, st) {
  const s = ui.sheet;
  const modsPrice = Object.entries(s.sel).flatMap(([g, v]) => (Array.isArray(v) ? v : [v]).map(k => D.modifiers[g].options[k].price)).reduce((a, b) => a + b, 0);
  const hit = s.allergens.filter(a => m.allergens.includes(a));
  const html = `<div class="sheetwrap" data-act="sheet-bg"><div class="sheet" role="dialog" aria-label="Chi tiết món"><span class="scr" style="position:static;align-self:flex-end;margin:10px 12px 0">SCR-04</span>
    <div style="padding:0 18px 4px"><h2 style="font-size:19px">${esc(m.vi)}</h2><div class="muted">${esc(m.en)} · ${money(priceOf(m))}${st.status === 'LIMITED' ? ` · còn ${st.qty} phần` : ''}</div>
    ${m.allergens.length ? `<div class="small" style="margin-top:4px">Có chứa: ${algTags(m.allergens)}</div>` : ''}</div>
    <div class="body stack">
    ${m.mods.map(g => { const G = D.modifiers[g]; return `<div><div class="row between"><b>${esc(G.vi)}</b>${G.required ? chip('Bắt buộc', s.err === g ? 'red' : 'acc') : chip('Tùy chọn')}</div>
      ${G.options.map((op, k) => `<label class="opt"><input type="${G.required ? 'radio' : 'checkbox'}" name="${g}" data-act="mod" data-g="${g}" data-k="${k}" ${G.required ? (s.sel[g] === k ? 'checked' : '') : ((s.sel[g] || []).includes(k) ? 'checked' : '')}><span class="grow">${esc(op.name)}</span><span class="muted">${op.price ? '+' + money(op.price) : ''}</span></label>`).join('')}</div>`; }).join('')}
    <div><b>Khách dị ứng (US-06)</b><div class="algs" style="margin-top:6px">${D.allergens.map(a => `<button class="${s.allergens.includes(a.id) ? 'on' : ''}" data-act="alg" data-a="${a.id}">${esc(a.vi)}</button>`).join('')}</div></div>
    ${hit.length ? `<div class="warn">⚠ Món có chứa ${hit.map(a => ALG[a].vi).join(', ')} — báo khách trước khi gửi bếp</div>` : ''}
    <label class="f">Ghi chú cho bếp<textarea id="note" maxlength="100" rows="2" placeholder="VD: ít hành, không rau mùi">${esc(s.note)}</textarea></label>
    <div class="row between"><b>Số lượng</b><div class="step"><button data-act="qty" data-d="-1" aria-label="Giảm">−</button><span>${s.qty}</span><button data-act="qty" data-d="1" aria-label="Tăng">+</button></div></div></div>
    <div class="dock"><button class="btn ghost" data-act="sheet-close">Hủy</button><button class="btn pri grow" data-act="sheet-add">Thêm vào đơn · ${money((priceOf(m) + modsPrice) * s.qty)}</button></div></div></div>`;
  let host = document.querySelector('.phone .sheetwrap'); if (host) host.remove();
  document.querySelector('.phone').insertAdjacentHTML('beforeend', html);
}
function addItem(o, mid, qty, mods, allergens, note) {
  const m = MENU[mid], st = S.menu[mid];
  if (!canOrder(mid)) return toast(`${m.vi} đã hết`, 'err');
  if (st.status === 'LIMITED' && qty > st.qty) return toast(`Chỉ còn ${st.qty} phần`, 'err');
  o.items.push({ id: id('I'), menuId: mid, qty, mods, note, allergens, status: 'NEW', unit: priceOf(m) + mods.reduce((a, x) => a + x.price, 0),
    round: 0, sentAt: null, cookingAt: null, readyAt: null, servedAt: null, ack: false, prev: null });
  save(); if (navigator.vibrate) navigator.vibrate(30); toast(`Đã thêm ${qty} × ${m.vi}`);
}
function scrOrder(sess) {
  const o = S.orders[route.arg]; if (!o) { location.hash = '#/waiter/tables'; return { scr: '', html: '' }; }
  const tb = S.tables[o.table], fresh = o.items.filter(i => i.status === 'NEW');
  const rounds = [...new Set(o.items.map(i => i.round))].sort((a, b) => (a || 99) - (b || 99));
  const line = i => `<div class="it"><span class="q">${i.qty}×</span><div class="d"><b>${esc(name(i))}</b>
      <div class="meta">${i.mods.map(x => esc(x.name)).join(' · ')}${i.note ? ` · “${esc(i.note)}”` : ''}</div>${i.allergens.length ? `<div>${algTags(i.allergens)}</div>` : ''}
      <div class="row wrap" style="margin-top:4px">${istat(i)}<span class="muted small num">${money(i.unit * i.qty)}</span>
      ${i.status === 'NEW' ? `<button class="btn sm ghost" data-act="rm" data-i="${i.id}">Xóa</button>` : ''}
      ${i.status === 'QUEUED' ? `<button class="btn sm ghost" data-act="cancel" data-i="${i.id}">Hủy</button>` : ''}
      ${['COOKING', 'READY', 'SERVED'].includes(i.status) ? `<button class="btn sm ghost" data-act="cancel" data-i="${i.id}">Yêu cầu hủy</button>` : ''}
      ${i.status === 'READY' ? `<button class="btn sm ok" data-act="serve" data-i="${i.id}">Đã phục vụ</button>` : ''}</div></div></div>`;
  const c = calc(o);
  const html = `${banners()}<div class="hd"><a class="btn sm ghost" href="#/waiter/tables" aria-label="Về sơ đồ bàn">←</a><div class="grow"><h2>Bàn ${o.table}</h2>
    <div class="small muted">${tb.guests} khách · ${chip(OS[orderStatus(o)], 'blue')} ${tb.status === 'AWAITING' ? chip('Đã in bill', 'amber') : ''}</div></div>
    <button class="btn sm" data-act="more" data-o="${o.id}">⋯</button></div>
    <div class="body">${o.items.length ? rounds.map(r => `<div class="round">${r ? `Lượt ${r}${r > 1 ? ' · Gọi thêm' : ''} · ${hm(o.items.find(i => i.round === r).sentAt)}` : 'Chưa gửi bếp'}</div>${o.items.filter(i => i.round === r).map(line).join('')}`).join('')
      : '<div class="empty">Chưa có món. Chạm “Gọi món” để bắt đầu.</div>'}
      ${billLines(o).length ? `<div class="row between" style="margin-top:12px"><span class="muted">Tạm tính đã gửi</span><b class="num">${money(c.sub)}</b></div>` : ''}</div>
    <div class="dock"><a class="btn" href="#/waiter/menu/${o.id}" style="flex:1">+ Gọi món</a>
      <button class="btn pri" style="flex:1.4" data-act="send" data-o="${o.id}" ${fresh.length ? '' : 'disabled'}>Gửi bếp${fresh.length ? ` (${fresh.reduce((a, i) => a + i.qty, 0)})` : ''}</button></div>`;
  return { scr: 'SCR-05', html };
}
function scrNotify(sess) {
  const list = S.notes.filter(n => n.to === sess.username).sort((a, b) => (a.done - b.done) || b.at - a.at);
  const html = `${banners()}<div class="hd"><h2 class="grow">Thông báo</h2><button class="btn sm ghost" data-act="readall">Đánh dấu đã xem</button></div>
    <div class="body">${list.map(n => `<div class="card" style="margin-bottom:8px;${n.done ? 'opacity:.55' : ''}"><div class="row between"><b>Bàn ${n.table}</b><span class="muted small">${hm(n.at)}</span></div>
      <div style="margin:4px 0 8px">${n.kind === 'SOLDOUT' ? '⚠ ' : n.kind === 'APPROVAL' ? 'ⓘ ' : '🔔 '}${esc(n.text)}</div>
      ${!n.done && n.kind === 'READY' && n.itemId ? `<button class="btn sm ok" data-act="serve-n" data-n="${n.id}">Đã mang ra</button>` : ''}
      ${!n.done && n.kind !== 'READY' ? `<a class="btn sm" href="#/waiter/order/${n.orderId}" data-act="seen" data-n="${n.id}">Mở đơn</a>` : ''}
      ${!n.done && n.kind === 'READY' && !n.itemId ? `<a class="btn sm" href="#/waiter/order/${n.orderId}">Mở đơn</a>` : ''}</div>`).join('') || '<div class="empty">Chưa có thông báo</div>'}</div>${waiterTabs('notify', sess)}`;
  return { scr: 'SCR-06', html };
}

/* ---------------- Màn hình Bếp ---------------- */
VIEWS.kds = sess => {
  if (route.view === 'chef') return scrChef(sess);
  return scrKds(sess, STN[route.view] ? route.view : 'HOT');
};
function kdsHead(sess, on) {
  const cnt = s => Object.values(S.orders).flatMap(o => o.items).filter(i => MENU[i.menuId].station === s && ['QUEUED', 'COOKING'].includes(i.status)).length;
  const chef = ['CHEF', 'MANAGER'].includes(sess.role);
  return `${banners()}<div class="kh"><h2>Bếp</h2><nav class="ktabs">${D.stations.map(s => `<a href="#/kds/${s.id}" class="${on === s.id ? 'on' : ''}">${s.vi}<span class="badge">${cnt(s.id)}</span></a>`).join('')}
    ${chef ? `<a href="#/kds/chef" class="${on === 'chef' ? 'on' : ''}">Tổng hợp & tình trạng món</a>` : ''}</nav>
    <span class="grow"></span><span style="font-size:22px;font-weight:800" class="num">${hm(Date.now())}</span>
    <button class="btn sm" data-act="lock">${esc(sess.display_name)} · Khóa</button></div>`;
}
function tickets(station) {
  const T = [];
  Object.values(S.orders).forEach(o => {
    const byRound = {};
    o.items.forEach(i => {
      if (MENU[i.menuId].station !== station || !i.sentAt) return;
      const showCancelled = i.status === 'CANCELLED' && i.cancelledAt && Date.now() - i.cancelledAt < 60000;
      if (!['QUEUED', 'COOKING', 'READY', 'VOID_PENDING'].includes(i.status) && !showCancelled) return;
      (byRound[i.round] = byRound[i.round] || []).push(i);
    });
    Object.entries(byRound).forEach(([r, items]) => T.push({ o, r: +r, items, sentAt: Math.min(...items.map(i => i.sentAt)) }));
  });
  return T.sort((a, b) => a.sentAt - b.sentAt);
}
function scrKds(sess, station) {
  const late = STN[station].late, chef = ['CHEF', 'MANAGER'].includes(sess.role);
  const card = tk => {
    const age = mins(tk.sentAt), pending = tk.items.some(i => ['QUEUED', 'COOKING'].includes(i.status));
    const cls = !pending ? '' : age >= late * 1.5 ? 'vlate' : age >= late ? 'late' : '';                            // BR-06
    const alg = tk.items.filter(i => i.allergens.length && !i.ack && i.status === 'QUEUED');
    return `<article class="tk ${cls}"><div class="tkh"><b>${tk.o.table}</b><span>${tk.o.type === 'TA' ? 'MANG VỀ' : `Lượt ${tk.r}`}${tk.r > 1 ? ' · GỌI THÊM' : ''}</span><span class="tm">${age}'</span></div>
      <div class="tkb">${alg.map(i => `<div class="kalg">⚠ DỊ ỨNG: ${i.allergens.map(a => ALG[a].vi.toUpperCase()).join(', ')} — ${esc(name(i))}${i.note ? `<br><small>${esc(i.note)}</small>` : ''}
        <button data-act="ack" data-o="${tk.o.id}" data-i="${i.id}">ĐÃ ĐỌC DỊ ỨNG</button></div>`).join('')}
      ${tk.items.map(i => `<button class="ki ${i.status}" data-act="kitem" data-o="${tk.o.id}" data-i="${i.id}"><span class="q">${i.qty}</span><span class="n"><b>${esc(name(i))}</b>
        <small>${[...i.mods.map(x => x.name), i.note && !i.allergens.length ? '“' + i.note + '”' : ''].filter(Boolean).map(esc).join(' · ')}</small>
        ${i.allergens.length && i.ack ? `<small style="color:#fca5a5">⚠ ${i.allergens.map(a => ALG[a].vi).join(', ')} · đã đọc</small>` : ''}</span><span class="s">${IS[i.status][0]}</span></button>
        ${chef && ['COOKING', 'READY'].includes(i.status) ? `<div class="right"><button class="btn sm" style="margin:-2px 0 4px" data-act="undo" data-o="${tk.o.id}" data-i="${i.id}">↶ Hoàn tác</button></div>` : ''}`).join('')}</div>
      <div class="tkf">${pending ? `<button class="kbtn" data-act="done-all" data-o="${tk.o.id}" data-r="${tk.r}" data-s="${station}">Xong cả phiếu</button>` : ''}
        ${tk.items.some(i => i.status === 'READY') ? `<button class="kbtn ok" data-act="picked" data-o="${tk.o.id}" data-r="${tk.r}" data-s="${station}">Đã lấy</button>` : ''}
        <button class="kbtn sm" data-act="print" data-o="${tk.o.id}" data-r="${tk.r}" data-s="${station}" aria-label="In phiếu">🖨</button></div></article>`;
  };
  const T = tickets(station);
  const html = `${kdsHead(sess, station)}<div class="row" style="padding:10px 18px 0;gap:14px;color:#9ca3af;font-size:13px">
    <span>Chạm món: Chờ nấu → Đang nấu → Sẵn sàng</span><span>Ngưỡng trễ ${STN[station].vi}: ${late}' (cam) · ${Math.round(late * 1.5)}' (đỏ)</span></div>
    <div class="kgrid">${T.map(card).join('') || '<div class="empty" style="grid-column:1/-1;color:#9ca3af;font-size:18px">Không có phiếu chờ</div>'}</div>`;
  return { scr: 'SCR-07', html };
}
function scrChef(sess) {
  if (!['CHEF', 'MANAGER'].includes(sess.role)) { location.hash = '#/kds/HOT'; return { scr: '', html: '' }; }
  const wait = {};
  Object.values(S.orders).forEach(o => o.items.forEach(i => { if (['QUEUED', 'COOKING'].includes(i.status)) { const w = wait[i.menuId] = wait[i.menuId] || { q: 0, c: 0 }; i.status === 'QUEUED' ? w.q += i.qty : w.c += i.qty; } }));
  const f = ui.kdsView || 'ALL';
  const items = D.menu.filter(m => f === 'ALL' || m.station === f);
  const html = `${kdsHead(sess, 'chef')}<div style="padding:14px 18px;overflow:auto;flex:1">
    <div class="ktabs" style="margin-bottom:12px">${['ALL', ...D.stations.map(s => s.id)].map(s => `<a href="#/kds/chef" data-act="kview" data-s="${s}" class="${f === s ? 'on' : ''}">${s === 'ALL' ? 'Tất cả trạm' : STN[s].vi}</a>`).join('')}</div>
    <div class="cols"><section><h3 style="margin-bottom:8px">Tổng hợp món đang chờ (US-19)</h3><table class="t"><tr><th>Món</th><th>Trạm</th><th class="right">Chờ nấu</th><th class="right">Đang nấu</th></tr>
      ${Object.entries(wait).filter(([mid]) => f === 'ALL' || MENU[mid].station === f).sort((a, b) => (b[1].q + b[1].c) - (a[1].q + a[1].c)).map(([mid, w]) => `<tr><td><b style="font-size:16px">${esc(MENU[mid].vi)}</b></td><td>${STN[MENU[mid].station].vi}</td><td class="right" style="font-size:18px"><b>${w.q}</b></td><td class="right" style="font-size:18px">${w.c}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Không có món chờ</td></tr>'}</table></section>
    <section><h3 style="margin-bottom:8px">Tình trạng món (US-20)</h3><table class="t"><tr><th>Món</th><th>Trạng thái</th><th></th></tr>
      ${items.filter(m => S.menu[m.id].status !== 'INACTIVE').map(m => { const st = S.menu[m.id]; return `<tr><td>${esc(m.vi)}<div class="small" style="color:#9ca3af">${m.id} · ${STN[m.station].vi}</div></td>
        <td>${st.status === 'SOLDOUT' ? chip('Hết', 'red') : st.status === 'LIMITED' ? chip(`Còn ${st.qty}`, 'amber') : chip('Còn bán', 'green')}</td>
        <td class="right"><div class="row" style="justify-content:flex-end">${st.status !== 'SOLDOUT' ? `<button class="btn sm dan" data-act="soldout-set" data-m="${m.id}">Hết</button>` : ''}
        <button class="btn sm" data-act="limit" data-m="${m.id}">Số phần</button>${st.status !== 'AVAILABLE' ? `<button class="btn sm ok" data-act="reopen" data-m="${m.id}">Mở bán</button>` : ''}</div></td></tr>`; }).join('')}</table></section></div></div>`;
  return { scr: 'SCR-08', html };
}

/* ---------------- Quầy Thu ngân ---------------- */
VIEWS.cashier = sess => {
  const nav = `${banners()}<nav class="navh">${[['tables', 'Bàn và bill'], ['takeaway', 'Mang về'], ['shift', 'Chốt ca']].map(([k, l]) => `<a href="#/cashier/${k}" class="${(route.view || 'tables') === k || (k === 'tables' && ['bill', 'split'].includes(route.view)) ? 'on' : ''}">${l}</a>`).join('')}
    <span class="grow"></span><button class="btn sm ghost" data-act="lock" style="margin:6px 0">${esc(sess.display_name)} · Khóa</button></nav>`;
  if (route.view === 'takeaway') return scrTakeaway(nav);
  if (route.view === 'shift') return scrShift(nav);
  return scrCashier(nav);
};
function openOrders() { return Object.values(S.orders).filter(o => o.billStatus !== 'PAID' && o.status !== 'CANCELLED' && o.items.length); }
function scrCashier(nav) {
  const list = openOrders().sort((a, b) => a.table.localeCompare(b.table));
  const sel = S.orders[route.arg] && S.orders[route.arg].billStatus !== 'PAID' ? S.orders[route.arg] : null;
  const left = `<div class="list">${list.map(o => { const c = calc(o), b = blockers(o); return `<a class="li ${sel && sel.id === o.id ? 'on' : ''}" href="#/cashier/bill/${o.id}" style="text-decoration:none;color:inherit"><b>${o.table}</b>
    <div class="grow"><div>${o.type === 'TA' ? 'Mang về' : `${S.tables[o.table].guests} khách`} · ${OS[orderStatus(o)]}</div><div class="small">${b.length ? chip(`${b.length} điểm chưa xong`, 'amber') : chip('Sẵn sàng thanh toán', 'green')}${o.discount?.status === 'PENDING' ? ' ' + chip('Chờ duyệt', 'amber') : ''}</div></div>
    <b class="num right">${money(c.total)}</b></a>`; }).join('') || '<div class="empty">Không có bill mở</div>'}</div>`;
  let right = '<div class="empty">Chọn một bàn để xem bill</div>', scr = 'SCR-09';
  if (sel && route.view === 'split') { right = splitPanel(sel); scr = 'SCR-10'; }
  else if (sel) { right = billPanel(sel); scr = 'SCR-11'; }
  return { scr, html: `${nav}<div class="split2">${left}<div class="body">${right}</div></div>` };
}
function billPanel(o) {
  const c = calc(o), b = blockers(o), due = c.total - paid(o);
  const lines = billLines(o);
  return `<div class="billbox"><div class="row between"><h2>Bill ${o.table}${o.customer ? ' · ' + esc(o.customer) : ''}</h2>${chip({ OPEN: 'Đang mở', PENDING: 'Chờ duyệt', PRINTED: 'Đã in', SPLIT: 'Đã tách', PARTIAL: 'Trả một phần', PAID: 'Đã thanh toán' }[o.billStatus] || o.billStatus, 'blue')}</div>
    ${b.length ? `<div class="err" style="margin:10px 0">Chưa chốt được thanh toán (BR-12):<ul style="margin:4px 0 0 18px;padding:0">${b.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
    <table class="t" style="margin-top:8px"><tr><th>Món</th><th class="right">SL</th><th class="right">Đơn giá</th><th class="right">Thành tiền</th></tr>
    ${lines.map(i => `<tr><td>${esc(name(i))}<div class="small muted">${i.mods.map(x => esc(x.name) + (x.price ? ' +' + money(x.price) : '')).join(' · ')}</div></td><td class="right">${i.qty}</td><td class="right num">${money(i.unit)}</td><td class="right num">${money(i.unit * i.qty)}</td></tr>`).join('')}</table>
    <div style="margin-top:10px"><div class="bl"><span>Tạm tính</span><span class="num">${money(c.sub)}</span></div>
    ${o.discount ? `<div class="bl"><span>Giảm giá ${o.discount.type === 'PCT' ? o.discount.value + '%' : ''} · ${esc(o.discount.reason)} ${o.discount.status === 'PENDING' ? chip('Chờ duyệt', 'amber') : o.discount.status === 'REJECTED' ? chip('Bị từ chối', 'red') : ''}</span><span class="num">${money(-c.disc)}</span></div>` : ''}
    ${c.sur ? `<div class="bl"><span>Phụ thu ngày lễ ${S.settings.surcharge}%</span><span class="num">${money(c.sur)}</span></div>` : ''}
    <div class="bl tot"><span>Tổng</span><span class="num">${money(c.total)}</span></div><div class="bl muted"><span>GST included (Tổng ÷ 11)</span><span class="num">${money(c.gst)}</span></div>
    ${paid(o) ? `<div class="bl"><span>Đã thu</span><span class="num">${money(paid(o))}</span></div><div class="bl"><b>Còn lại</b><b class="num">${money(due)}</b></div>` : ''}</div>
    <div class="row wrap" style="margin-top:14px">
      <button class="btn" data-act="disc" data-o="${o.id}" ${o.payments.length || o.type === 'TA' && o.billStatus === 'PAID' ? 'disabled' : ''}>Giảm giá</button>
      ${o.type === 'DINE' ? `<button class="btn" data-act="printbill" data-o="${o.id}" ${b.length ? 'disabled' : ''}>In bill tạm</button>
      <a class="btn" href="#/cashier/split/${o.id}" ${b.length || o.payments.length ? 'style="pointer-events:none;opacity:.45"' : ''}>Tách bill</a>` : ''}
      <span class="grow"></span><button class="btn pri" data-act="pay" data-o="${o.id}" ${b.length || due <= 0 ? 'disabled' : ''}>Thanh toán ${money(due)}</button></div>
    ${o.type === 'TA' ? '<p class="muted small" style="margin-top:8px">Đơn mang về: thu tiền trước, hệ thống tự gửi bếp sau khi thanh toán đủ (BR-13).</p>' : ''}</div>`;
}
function splitPanel(o) {
  const c = calc(o), sp = o.split || (o.split = { mode: 'ITEM', n: 2, parts: [{ items: [], paid: false }, { items: [], paid: false }] });
  const locked = sp.parts.some(p => p.paid), lines = billLines(o);
  const amounts = splitAmounts(o);
  const assigned = new Set(sp.parts.flatMap(p => p.items));
  const head = `<div class="row between"><h2>Tách bill ${o.table} · ${money(c.total)}</h2><a class="btn sm ghost" href="#/cashier/bill/${o.id}">← Bill</a></div>
    <div class="row" style="margin:10px 0"><button class="btn sm ${sp.mode === 'ITEM' ? 'pri' : ''}" data-act="smode" data-o="${o.id}" data-m="ITEM" ${locked ? 'disabled' : ''}>Theo món</button>
    <button class="btn sm ${sp.mode === 'EQUAL' ? 'pri' : ''}" data-act="smode" data-o="${o.id}" data-m="EQUAL" ${locked ? 'disabled' : ''}>Chia đều</button>
    <span class="muted small">Chỉ chọn một cách cho một bill (BR-14)</span></div>`;
  if (sp.mode === 'EQUAL') return `${head}<div class="row" style="margin-bottom:12px"><span>Số phần</span><div class="step"><button data-act="sn" data-o="${o.id}" data-d="-1" ${locked ? 'disabled' : ''}>−</button><span>${sp.n}</span><button data-act="sn" data-o="${o.id}" data-d="1" ${locked ? 'disabled' : ''}>+</button></div><span class="muted small">2–10 phần · phần cuối nhận số lẻ</span></div>
    <div class="parts">${amounts.map((a, k) => partCard(o, k, a, sp.parts[k]?.paid)).join('')}</div>`;
  return `${head}<p class="muted small">Chọn một phần (khung cam) rồi chạm món để gán. Món có số lượng > 1: chạm “÷” để tách 1 phần.</p>
    <div class="cols"><div><table class="t">${lines.map(i => { const p = sp.parts.findIndex(x => x.items.includes(i.id)); return `<tr style="cursor:pointer" data-act="assign" data-o="${o.id}" data-i="${i.id}"><td>${i.qty}× ${esc(name(i))}</td><td class="right num">${money(i.unit * i.qty)}</td>
      <td class="right">${p >= 0 ? chip('Phần ' + (p + 1), 'acc') : chip('Chưa gán', 'red')}</td><td>${i.qty > 1 && !locked ? `<button class="btn sm" data-act="unit" data-o="${o.id}" data-i="${i.id}" title="Tách 1 phần">÷</button>` : ''}</td></tr>`; }).join('')}</table>
      ${lines.some(i => !assigned.has(i.id)) ? `<div class="warn" style="margin-top:8px">Còn ${lines.filter(i => !assigned.has(i.id)).length} món chưa thuộc phần nào</div>` : ''}</div>
    <div><div class="parts">${sp.parts.map((p, k) => partCard(o, k, amounts[k], p.paid)).join('')}</div>
      <div class="row" style="margin-top:10px"><button class="btn sm" data-act="padd" data-o="${o.id}" ${sp.parts.length >= 10 || locked ? 'disabled' : ''}>+ Phần</button></div></div></div>`;
}
function partCard(o, k, a, isPaid) {
  const sp = o.split, ready = sp.mode === 'EQUAL' || billLines(o).every(i => sp.parts.some(p => p.items.includes(i.id)));
  return `<div class="part ${isPaid ? 'paid' : ui.part === k && sp.mode === 'ITEM' ? 'on' : ''}" data-act="ppick" data-k="${k}"><div class="row between"><b>Phần ${k + 1}</b>${isPaid ? chip('Đã trả', 'green') : ''}</div>
    <div style="font-size:20px;font-weight:800" class="num">${money(a.total)}</div><div class="small muted">GST ${money(a.gst)}</div>
    ${!isPaid ? `<button class="btn sm pri" style="margin-top:8px" data-act="paypart" data-o="${o.id}" data-k="${k}" ${ready && a.total > 0 ? '' : 'disabled'}>Thu phần này</button>` : ''}</div>`;
}
function splitAmounts(o) {
  const c = calc(o), sp = o.split;
  if (sp.mode === 'EQUAL') { const base = Math.floor(c.total / sp.n); return Array.from({ length: sp.n }, (_, k) => { const t = k === sp.n - 1 ? c.total - base * (sp.n - 1) : base; return { total: t, gst: Math.round(t / 11) }; }); }
  const subs = sp.parts.map(p => p.items.reduce((a, iid) => { const i = o.items.find(x => x.id === iid); return a + (i ? i.unit * i.qty : 0); }, 0));
  const res = subs.map(x => Math.round(c.total * x / (c.sub || 1)));
  const all = billLines(o).every(i => sp.parts.some(p => p.items.includes(i.id)));
  const last = subs.map((x, k) => x > 0 ? k : -1).filter(k => k >= 0).pop();
  if (all && last != null) res[last] = c.total - res.reduce((a, x, k) => k === last ? a : a + x, 0);   // phần cuối nhận số lẻ
  return res.map(t => ({ total: t, gst: Math.round(t / 11) }));
}
function payModal(o, part = null) {
  const amount = part == null ? calc(o).total - paid(o) : splitAmounts(o)[part].total;
  ui.pay = { o: o.id, part, amount, method: 'EFTPOS', tendered: '', tax: false };
  drawPay();
}
function drawPay() {
  const p = ui.pay, o = S.orders[p.o], cash = r5(p.amount), t = Math.round(parseFloat(p.tendered || '0') * 100);
  const need = p.method === 'CASH' ? cash : p.amount;
  modal(`Thanh toán ${o.table}${p.part != null ? ` · Phần ${p.part + 1}` : ''}`, `<div class="stack">
    <div class="row"><button class="btn grow ${p.method === 'EFTPOS' ? 'pri' : ''}" data-act="pm" data-m="EFTPOS">EFTPOS</button><button class="btn grow ${p.method === 'CASH' ? 'pri' : ''}" data-act="pm" data-m="CASH">Tiền mặt</button></div>
    <div class="bl tot"><span>Cần thu</span><span class="num">${money(need)}</span></div>
    ${p.method === 'CASH' ? `${cash !== p.amount ? `<div class="small muted">Làm tròn tới 5 cent: ${money(p.amount)} → ${money(cash)} (BR-15)</div>` : ''}
      <label class="f">Tiền khách đưa (AUD)<input id="tendered" inputmode="decimal" value="${esc(p.tendered)}" data-in="tendered" placeholder="VD 100"></label>
      <div class="row wrap">${[20, 50, 100].map(v => `<button class="btn sm" data-act="quickcash" data-v="${v}">$${v}</button>`).join('')}<button class="btn sm" data-act="quickcash" data-v="${(cash / 100).toFixed(2)}">Đúng số</button></div>
      <div class="bl"><span>Tiền thừa</span><b class="num">${t >= cash ? money(t - cash) : '—'}</b></div>${t && t < cash ? `<div class="err">Còn thiếu ${money(cash - t)}</div>` : ''}`
      : '<div class="muted small">Quẹt thẻ trên máy EFTPOS độc lập, máy báo APPROVED rồi bấm xác nhận (D-04).</div>'}
    <label class="row"><input type="checkbox" style="width:18px" data-act="taxinv" ${p.tax ? 'checked' : ''}> In tax invoice (khách yêu cầu)</label></div>`,
    `<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="paydo" ${p.method === 'CASH' && t < cash ? 'disabled' : ''}>${p.method === 'CASH' ? 'Đã thu tiền mặt' : 'Đã thu EFTPOS'}</button>`);
}
function receipt(o, tax) {
  const c = calc(o), L = billLines(o), W = 34, pad = (a, b) => a + ' '.repeat(Math.max(1, W - a.length - b.length)) + b;
  const lines = [tax ? '          TAX INVOICE' : '          HL RESTAURANT', '      123 Pitt St, Sydney NSW', '        ABN 12 345 678 901', '-'.repeat(W),
    pad(`Bàn ${o.table}`, new Date().toLocaleString('en-AU', { dateStyle: 'short', timeStyle: 'short' })), '-'.repeat(W),
    ...L.map(i => pad(`${i.qty} ${MENU[i.menuId].en}`.slice(0, 24), money(i.unit * i.qty))), '-'.repeat(W), pad('Subtotal', money(c.sub)),
    ...(c.disc ? [pad('Discount', money(-c.disc))] : []), ...(c.sur ? [pad(`Public holiday ${S.settings.surcharge}%`, money(c.sur))] : []),
    pad('TOTAL', money(c.total)), pad('GST included', money(c.gst)), '-'.repeat(W),
    ...o.payments.map(p => pad(p.method === 'CASH' ? 'Cash' : 'EFTPOS', money(p.amount))), ...(o.payments.some(p => p.change) ? [pad('Change', money(o.payments.reduce((a, p) => a + (p.change || 0), 0)))] : []),
    '', ...(S.settings.holiday ? ['A surcharge of 15% applies on public holidays'] : []), '      Cảm ơn quý khách!'];
  return `<div class="receipt">${esc(lines.join('\n'))}</div>`;
}
function scrTakeaway(nav) {
  const tas = Object.values(S.orders).filter(o => o.type === 'TA').sort((a, b) => b.createdAt - a.createdAt);
  const o = S.orders[route.arg];
  let right = `<div class="empty">Tạo đơn mang về mới hoặc chọn đơn ở danh sách</div>`;
  if (o && o.type === 'TA') {
    const q = fold(ui.q.trim()), list = D.menu.filter(m => S.menu[m.id].status !== 'INACTIVE' && (q ? fold(m.vi + ' ' + m.en).includes(q) : m.cat === ui.cat));
    const c = calc(o), editable = o.billStatus !== 'PAID';
    right = `<div class="cols"><div><h3>${o.table} · ${esc(o.customer || 'Khách mang về')}</h3>
      ${editable ? `<input style="margin:10px 0" placeholder="Tìm món" value="${esc(ui.q)}" data-in="q"><div class="cats">${D.cats.map(c2 => `<button class="${c2.id === ui.cat ? 'on' : ''}" data-act="cat" data-c="${c2.id}">${esc(c2.vi)}</button>`).join('')}</div>
      ${list.map(m => `<div class="dish ${canOrder(m.id) ? '' : 'off'}"><div class="nm"><b>${esc(m.vi)}</b><small>${money(priceOf(m))}</small></div>${canOrder(m.id) ? `<button class="add" data-act="ta-add" data-o="${o.id}" data-m="${m.id}">+</button>` : chip('Hết', 'red')}</div>`).join('')}` : '<p class="muted">Đơn đã thanh toán và gửi bếp.</p>'}</div>
      <div><h3>Đơn</h3><table class="t">${live(o).map(i => `<tr><td>${i.qty}× ${esc(name(i))}</td><td>${istat(i)}</td><td class="right num">${money(i.unit * i.qty)}</td><td>${i.status === 'NEW' ? `<button class="btn sm ghost" data-act="ta-rm" data-o="${o.id}" data-i="${i.id}">✕</button>` : ''}</td></tr>`).join('')}</table>
      <div class="bl tot"><span>Tổng</span><span class="num">${money(c.total)}</span></div><div class="bl muted"><span>GST included</span><span class="num">${money(c.gst)}</span></div>
      ${editable ? `<button class="btn pri block" style="margin-top:12px" data-act="pay" data-o="${o.id}" ${live(o).length ? '' : 'disabled'}>Thu tiền và gửi bếp</button><p class="muted small">BR-13: đơn mang về thu tiền đủ rồi mới gửi bếp.</p>` : ''}</div></div>`;
  }
  const html = `${nav}<div class="split2"><div class="list"><div style="padding:12px 16px"><button class="btn pri block" data-act="ta-new">+ Đơn mang về mới</button></div>
    ${tas.map(x => `<a class="li ${o && o.id === x.id ? 'on' : ''}" href="#/cashier/takeaway/${x.id}" style="text-decoration:none;color:inherit"><b>${x.table}</b><div class="grow">${esc(x.customer || '—')}<div class="small muted">${OS[orderStatus(x)]}</div></div><b class="num">${money(calc(x).total)}</b></a>`).join('')}</div>
    <div class="body">${right}</div></div>`;
  return { scr: 'SCR-19', html };
}
function scrShift(nav) {
  const by = { EFTPOS: 0, CASH: 0 };
  S.sales.forEach(s => s.payments.forEach(p => by[p.method] += p.amount));
  const tot = S.sales.reduce((a, s) => a + s.total, 0), open = openOrders();
  const counted = Math.round(parseFloat(ui.counted || '0') * 100), diff = ui.counted ? counted - by.CASH : 0;
  const html = `${nav}<div class="body"><div style="max-width:640px"><h2>Chốt ca (US-25)</h2><p class="muted">Ca ${new Date().toLocaleDateString('en-AU')} · ${S.sales.length} bill đã thanh toán</p>
    <div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi"><small>Doanh thu</small><b class="num">${money(tot)}</b></div><div class="kpi"><small>EFTPOS</small><b class="num">${money(by.EFTPOS)}</b></div><div class="kpi"><small>Tiền mặt theo hệ thống</small><b class="num">${money(by.CASH)}</b></div></div>
    ${open.length ? `<div class="err">Còn ${open.length} bill mở — không chốt ca được (BR-21): ${open.map(o => o.table).join(', ')}</div>` : ''}
    <div class="stack" style="margin-top:14px"><label class="f">Tiền mặt đếm thực tế (AUD)<input data-in="counted" inputmode="decimal" value="${esc(ui.counted || '')}" placeholder="${(by.CASH / 100).toFixed(2)}"></label>
    ${ui.counted ? `<div class="bl"><span>Chênh lệch</span><b class="num" style="color:${Math.abs(diff) > 500 ? 'var(--red)' : 'var(--green)'}">${money(diff)}</b></div>` : ''}
    ${Math.abs(diff) > 500 ? `<label class="f">Lý do chênh lệch (bắt buộc khi > AUD 5)<input data-in="reason" value="${esc(ui.reason || '')}"></label>` : ''}
    <button class="btn pri" data-act="closeshift" ${open.length || !ui.counted || (Math.abs(diff) > 500 && !ui.reason) ? 'disabled' : ''}>Chốt ca</button>
    ${S.shift ? `<div class="card">Đã chốt lúc ${hm(S.shift.at)} bởi ${esc(userOf(S.shift.by).display_name)} · chênh lệch ${money(S.shift.diff)}</div>` : ''}</div></div></div>`;
  return { scr: 'SCR-12', html };
}

/* ---------------- Trang Quản lý ---------------- */
const MNAV = [['approvals', 'Duyệt yêu cầu', 'MANAGER', 'SCR-14'], ['menu', 'Quản lý menu', 'MANAGER', 'SCR-13'], ['reports', 'Báo cáo', 'MANAGER', 'SCR-15'],
  ['settings', 'Cấu hình', 'MANAGER', 'SCR-18'], ['users', 'Người dùng', 'ADMIN', 'SCR-16'], ['audit', 'Nhật ký thao tác', 'ADMIN', 'SCR-17']];
VIEWS.manager = sess => {
  const allowed = MNAV.filter(n => n[2] === sess.role);
  let v = allowed.find(n => n[0] === route.view) || allowed[0];
  const pend = S.approvals.filter(a => a.status === 'PENDING').length;
  const side = `<aside class="side"><div style="font-weight:800;padding:4px 12px 10px">Trang Quản lý</div>
    ${allowed.map(n => `<a href="#/manager/${n[0]}" class="${n === v ? 'on' : ''}">${n[1]}${n[0] === 'approvals' && pend ? `<span class="badge">${pend}</span>` : ''}</a>`).join('')}
    <span class="grow"></span><div class="small muted" style="padding:8px 12px">${esc(sess.display_name)} · ${ROLE_VI[sess.role]}</div><a href="#" data-act="lock">Đăng xuất</a></aside>`;
  const body = { approvals: mApprovals, menu: mMenu, reports: mReports, settings: mSettings, users: mUsers, audit: mAudit }[v[0]]();
  return { scr: v[3], html: `${side}<div class="main">${banners()}<div class="hd"><h2 class="grow">${v[1]}</h2>${body.tools || ''}</div><div class="body">${body.html}</div></div>` };
};
function mApprovals() {
  const pend = S.approvals.filter(a => a.status === 'PENDING'), done = S.approvals.filter(a => a.status !== 'PENDING').slice(-10).reverse();
  const desc = a => { const o = S.orders[a.orderId]; if (a.kind === 'VOID') { const i = o.items.find(x => x.id === a.itemId); return `Hủy ${i.qty} × ${esc(name(i))} (${IS[i.prev || i.status][0]}) · ${money(i.unit * i.qty)}`; }
    return `Giảm giá ${a.discount.type === 'PCT' ? a.discount.value + '%' : a.discount.type === 'FREE' ? 'miễn phí' : money(a.discount.value)} · ước tính ${money(a.amount)}`; };
  return { html: `<p class="muted" style="margin-top:0">Yêu cầu hủy món đã nấu (BR-05) và giảm giá vượt 10% hoặc miễn phí món (BR-11).</p>
    ${pend.map(a => `<div class="card" style="margin-bottom:10px"><div class="row between"><b>${a.kind === 'VOID' ? 'Hủy món' : 'Giảm giá'} · Bàn ${S.orders[a.orderId].table}</b><span class="muted small">${hm(a.at)} · ${esc(userOf(a.by).display_name)}</span></div>
      <div style="margin:6px 0">${desc(a)}</div><div class="small muted">Lý do: ${esc(a.reason)}</div>
      <div class="row" style="margin-top:10px"><button class="btn sm ok" data-act="appr" data-a="${a.id}" data-d="APPROVED">Duyệt</button><button class="btn sm dan" data-act="appr" data-a="${a.id}" data-d="REJECTED">Từ chối</button></div></div>`).join('') || '<div class="empty">Không có yêu cầu chờ duyệt</div>'}
    ${done.length ? `<h3 style="margin:18px 0 8px">Đã xử lý</h3><table class="t"><tr><th>Giờ</th><th>Loại</th><th>Bàn</th><th>Nội dung</th><th>Kết quả</th></tr>${done.map(a => `<tr><td>${hm(a.at)}</td><td>${a.kind === 'VOID' ? 'Hủy món' : 'Giảm giá'}</td><td>${S.orders[a.orderId].table}</td><td>${desc(a)}</td><td>${a.status === 'APPROVED' ? chip('Đã duyệt', 'green') : chip('Từ chối', 'red')}</td></tr>`).join('')}</table>` : ''}` };
}
function mMenu() {
  const f = ui.mfilter, q = fold(f.q);
  const list = D.menu.filter(m => (!f.cat || m.cat === f.cat) && (!q || fold(m.vi + m.en + m.id).includes(q)));
  return { tools: `<button class="btn sm pri" data-act="medit" data-m="">+ Thêm món</button>`,
    html: `<div class="row" style="margin-bottom:12px"><input style="max-width:260px" placeholder="Tìm theo tên, mã" value="${esc(f.q)}" data-in="mq"><select style="max-width:200px" data-in="mcat"><option value="">Tất cả danh mục</option>${D.cats.map(c => `<option value="${c.id}" ${f.cat === c.id ? 'selected' : ''}>${esc(c.vi)}</option>`).join('')}</select><span class="muted small">${list.length}/${D.menu.length} món</span></div>
    <table class="t"><tr><th>Mã</th><th>Tên món</th><th>Danh mục</th><th>Trạm</th><th class="right">Giá</th><th class="right">Lunch</th><th>Dị ứng</th><th>Trạng thái</th><th></th></tr>
    ${list.map(m => { const st = S.menu[m.id]; return `<tr><td class="muted">${m.id}</td><td><b>${esc(m.vi)}</b><div class="small muted">${esc(m.en)}</div></td><td>${esc(D.cats.find(c => c.id === m.cat).vi)}</td><td>${STN[m.station].vi}</td>
      <td class="right num">${money(m.price)}</td><td class="right num">${m.lunch ? money(m.lunch) : '—'}</td><td>${m.allergens.map(a => `<span class="alg">${a}</span>`).join('')}</td>
      <td>${st.status === 'INACTIVE' ? chip('Ngừng bán') : st.status === 'SOLDOUT' ? chip('Hết', 'red') : st.status === 'LIMITED' ? chip('Còn ' + st.qty, 'amber') : chip('Đang bán', 'green')}</td>
      <td><button class="btn sm" data-act="medit" data-m="${m.id}">Sửa</button></td></tr>`; }).join('')}</table>` };
}
function menuForm(mid) {
  const m = mid ? MENU[mid] : { id: 'M' + String(D.menu.length + 1).padStart(2, '0'), cat: 'C1', vi: '', en: '', price: 0, lunch: null, station: 'HOT', allergens: [], mods: [], active: true };
  ui.medit = { ...m, allergens: [...m.allergens], mods: [...m.mods], isNew: !mid };
  modal(mid ? `Sửa món ${m.id}` : 'Thêm món', `<div class="stack"><div class="cols" style="gap:10px"><label class="f">Tên tiếng Việt *<input data-in="fvi" value="${esc(m.vi)}"></label><label class="f">Tên tiếng Anh *<input data-in="fen" value="${esc(m.en)}"></label>
    <label class="f">Danh mục<select data-in="fcat">${D.cats.map(c => `<option value="${c.id}" ${c.id === m.cat ? 'selected' : ''}>${esc(c.vi)}</option>`).join('')}</select></label>
    <label class="f">Trạm chế biến<select data-in="fst">${D.stations.map(s => `<option value="${s.id}" ${s.id === m.station ? 'selected' : ''}>${s.vi}</option>`).join('')}</select></label>
    <label class="f">Giá (AUD, gồm GST) *<input data-in="fprice" inputmode="decimal" value="${(m.price / 100).toFixed(2)}"></label><label class="f">Giá Lunch Special<input data-in="flunch" inputmode="decimal" value="${m.lunch ? (m.lunch / 100).toFixed(2) : ''}" placeholder="Bỏ trống nếu không có"></label></div>
    <div><b class="small">Chất gây dị ứng (Bếp trưởng xác nhận)</b><div class="algs" style="margin-top:6px">${D.allergens.map(a => `<button class="${m.allergens.includes(a.id) ? 'on' : ''}" data-act="falg" data-a="${a.id}">${esc(a.vi)}</button>`).join('')}</div></div>
    <div><b class="small">Nhóm tùy chọn</b><div class="row wrap" style="margin-top:6px">${Object.entries(D.modifiers).map(([g, G]) => `<label class="row"><input type="checkbox" style="width:18px" data-act="fmod" data-g="${g}" ${m.mods.includes(g) ? 'checked' : ''}>${esc(G.vi)}</label>`).join('')}</div></div>
    <div class="err" id="ferr" style="display:none"></div><p class="muted small" style="margin:0">Đổi giá chỉ áp cho món gọi sau thời điểm lưu (BR-08) và được ghi nhật ký.</p></div>`,
    `<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="msave">Lưu</button>`, true);
}
function mReports() {
  const s = S.sales, tot = s.reduce((a, x) => a + x.total, 0), by = { EFTPOS: 0, CASH: 0 }, hours = {}, dish = {}, prep = {};
  s.forEach(x => { x.payments.forEach(p => by[p.method] += p.amount); const h = new Date(x.at).getHours(); hours[h] = (hours[h] || 0) + x.total;
    x.items.forEach(i => { const d = dish[i.menuId] = dish[i.menuId] || { q: 0, a: 0 }; d.q += i.qty; d.a += i.amount; });
    x.prep.forEach(p => { const r = prep[p.station] = prep[p.station] || { n: 0, m: 0 }; r.n++; r.m += p.mins; }); });
  const top = Object.entries(dish).sort((a, b) => b[1].q - a[1].q).slice(0, 10), maxH = Math.max(...Object.values(hours), 1), maxM = Math.max(by.EFTPOS, by.CASH, 1);
  const logs = S.audit.filter(a => ['Hủy món', 'Giảm giá', 'Duyệt hủy món', 'Từ chối hủy món', 'Duyệt giảm giá', 'Từ chối giảm giá'].includes(a.action)).slice(0, 12);
  return { tools: `<button class="btn sm" data-act="csv">Xuất CSV</button>`, html: `<div class="kpis"><div class="kpi"><small>Doanh thu hôm nay</small><b class="num">${money(tot)}</b></div><div class="kpi"><small>Số bill</small><b>${s.length}</b></div>
    <div class="kpi"><small>Giá trị TB/bill</small><b class="num">${money(s.length ? Math.round(tot / s.length) : 0)}</b></div><div class="kpi"><small>GST thu hộ</small><b class="num">${money(s.reduce((a, x) => a + x.gst, 0))}</b></div></div>
    <div class="cols"><section class="card"><h3 style="margin-bottom:10px">Theo phương thức thanh toán</h3><div class="bars">${Object.entries(by).map(([k, v]) => `<div class="bar"><span>${k === 'CASH' ? 'Tiền mặt' : 'EFTPOS'}</span><i style="width:${v / maxM * 100}%"></i><b class="right num">${money(v)}</b></div>`).join('')}</div>
      <h3 style="margin:16px 0 10px">Theo giờ</h3><div class="bars">${Object.entries(hours).sort((a, b) => a[0] - b[0]).map(([h, v]) => `<div class="bar"><span>${h}:00</span><i style="width:${v / maxH * 100}%"></i><span class="right num">${money(v)}</span></div>`).join('')}</div></section>
    <section class="card"><h3 style="margin-bottom:10px">Top 10 món bán chạy</h3><table class="t"><tr><th>#</th><th>Món</th><th class="right">SL</th><th class="right">Doanh thu</th></tr>${top.map(([mid, d], k) => `<tr><td>${k + 1}</td><td>${esc(MENU[mid].vi)}</td><td class="right">${d.q}</td><td class="right num">${money(d.a)}</td></tr>`).join('')}</table>
      <h3 style="margin:16px 0 10px">Thời gian chế biến TB (gửi → sẵn sàng)</h3><table class="t"><tr><th>Trạm</th><th class="right">Số món</th><th class="right">TB (phút)</th><th class="right">Ngưỡng</th></tr>${D.stations.map(st => { const r = prep[st.id] || { n: 0, m: 0 }; const avg = r.n ? (r.m / r.n).toFixed(1) : '—'; return `<tr><td>${st.vi}</td><td class="right">${r.n}</td><td class="right"><b>${avg}</b></td><td class="right">${st.late}</td></tr>`; }).join('')}</table></section></div>
    <section class="card" style="margin-top:16px"><h3 style="margin-bottom:10px">Nhật ký hủy món và giảm giá (US-32)</h3><table class="t"><tr><th>Giờ</th><th>Thao tác</th><th>Chi tiết</th><th>Người làm</th></tr>${logs.map(l => `<tr><td>${hm(l.at)}</td><td>${esc(l.action)}</td><td>${esc(l.detail)}</td><td>${esc(userOf(l.user).display_name)}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Chưa có</td></tr>'}</table></section>` };
}
function mSettings() {
  return { html: `<div class="cols"><section class="card stack"><h3>Phụ thu ngày lễ (US-28)</h3>
    <label class="f">Mức phụ thu (%)<input data-in="sur" inputmode="numeric" value="${S.settings.surcharge}"></label>
    <label class="row"><input type="checkbox" style="width:18px" data-act="tg" data-k="holiday" ${S.settings.holiday ? 'checked' : ''}> Mô phỏng hôm nay là ngày lễ</label>
    <div class="card" style="background:var(--soft)"><div class="small muted">Dòng hiển thị trên menu và hóa đơn (ACCC):</div><b>“A surcharge of ${S.settings.surcharge}% applies on public holidays”</b></div>
    <h3 style="margin-top:6px">Khung giờ giá (US-27)</h3><div>Lunch Special · Thứ 2–6 · 11:00–15:00 · ${D.menu.filter(m => m.lunch).length} món</div>
    <label class="row"><input type="checkbox" style="width:18px" data-act="tg" data-k="lunch" ${S.settings.lunch ? 'checked' : ''}> Mô phỏng đang trong giờ trưa</label>
    <h3 style="margin-top:6px">Ngưỡng món trễ (BR-06)</h3>${D.stations.map(s => `<div class="row between"><span>${s.vi}</span><b>${s.late} phút · đỏ khi ${Math.round(s.late * 1.5)} phút</b></div>`).join('')}</section>
    <section class="card"><h3 style="margin-bottom:10px">Ngày lễ NSW</h3><table class="t"><tr><th>Ngày</th><th>Tên</th><th>Trạng thái</th></tr>${D.holidays.map(h => `<tr><td class="num">${h.date}</td><td>${esc(h.name)}</td><td>${h.status === 'Confirmed' ? chip('Xác nhận', 'green') : chip('Cần xác nhận · Q-041', 'amber')}</td></tr>`).join('')}</table></section></div>` };
}
function mUsers() {
  S.users = S.users || D.users.map(u => ({ ...u }));
  return { tools: `<button class="btn sm pri" data-act="uadd">+ Thêm người dùng</button>`, html: `<table class="t"><tr><th>Tên</th><th>Tài khoản</th><th>Vai trò</th><th>Hợp đồng</th><th>Trạng thái</th><th></th></tr>
    ${S.users.map((u, k) => `<tr><td><b>${esc(u.display_name)}</b></td><td class="muted">${esc(u.username)}</td><td><select data-in="urole" data-k="${k}" style="max-width:150px">${Object.entries(ROLE_VI).map(([r, l]) => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${l}</option>`).join('')}</select></td>
      <td>${esc(u.employment)}</td><td>${u.status === 'Active' ? chip('Hoạt động', 'green') : chip('Đã khóa')}</td>
      <td class="right"><div class="row" style="justify-content:flex-end"><button class="btn sm" data-act="upin" data-k="${k}">Đặt lại PIN</button><button class="btn sm ${u.status === 'Active' ? 'dan' : 'ok'}" data-act="ulock" data-k="${k}">${u.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button></div></td></tr>`).join('')}</table>
    <p class="muted small">Ma trận quyền 6 vai trò theo SRS §5. Đổi vai trò, khóa tài khoản đều ghi nhật ký (BR-19).</p>` };
}
function mAudit() {
  const types = [...new Set(S.audit.map(a => a.action))].sort();
  const list = S.audit.filter(a => !ui.audit || a.action === ui.audit).slice(0, 200);
  return { html: `<div class="row" style="margin-bottom:12px"><select style="max-width:240px" data-in="aud"><option value="">Tất cả thao tác</option>${types.map(t => `<option ${ui.audit === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select><span class="muted small">${list.length} dòng · chỉ xem, không sửa/xóa (US-34)</span></div>
    <table class="t"><tr><th>Thời điểm</th><th>Người làm</th><th>Thao tác</th><th>Chi tiết</th></tr>${list.map(a => `<tr><td class="num">${hm(a.at)}</td><td>${esc(userOf(a.user).display_name)}</td><td>${esc(a.action)}</td><td>${esc(a.detail)}</td></tr>`).join('')}</table>` };
}

/* ---------------- hành động ---------------- */
const ACT = {
  'mclose': mclose, 'mclose-bg': (d, el, e) => { if (e.target === el) mclose(); },
  tg: d => { const k = d.k; S.settings[k] = !S.settings[k];
    if (k === 'offline' && !S.settings.offline) { toast(`Đã có mạng lại — đồng bộ ${S.pendingSync} thao tác, không mất đơn`, 'ok'); S.pendingSync = 0; }
    log('Đổi cấu hình', `${k} = ${S.settings[k]}`); save(false); render(); },
  reset: () => { if (!confirm('Đặt lại toàn bộ dữ liệu demo?')) return; S = seed(); save(false); render(); toast('Đã đặt lại dữ liệu demo'); },
  guide: () => modal('Kịch bản demo (≈ 5 phút)', `<ol style="padding-left:18px;margin:0">
    <li><b>Phục vụ</b> — đăng nhập Minh Đặng (PIN 1234). Mở bàn trống <b>T01</b> → 2 khách.</li>
    <li>Tìm “pho bo” → chọn <b>Phở bò tái</b> → cỡ Lớn, chọn dị ứng <b>Đậu phộng</b>, ghi chú → Thêm. Thêm 2 <b>Trà đá</b> bằng nút +.</li>
    <li>Bấm <b>Gửi bếp</b>. Mở tab mới cùng địa chỉ, chuyển sang <b>Bếp</b> (Khoa Lê): phiếu T01 có dải đỏ dị ứng.</li>
    <li>Bấm <b>Đã đọc dị ứng</b> → chạm món: Đang nấu → Sẵn sàng. Tab Phục vụ nhận 🔔 và rung.</li>
    <li>Bếp trưởng (Hùng Trần) → <b>Tổng hợp & tình trạng món</b> → bấm <b>Hết</b> cho “Phở bò tái”. Phục vụ thấy món mờ.</li>
    <li><b>Quản lý</b> (Linh Nguyễn) → Duyệt yêu cầu hủy món của T14.</li>
    <li><b>Thu ngân</b> (Thư Bùi) → bàn <b>T07</b> → bật <b>Ngày lễ</b> trên thanh trên → xem phụ thu 15% và GST → Tách bill chia đều 3 phần → thu tiền mặt.</li>
    <li>Bật <b>Mất mạng</b>, gọi thêm món — banner Offline đếm thao tác chờ; tắt để đồng bộ.</li>
    <li>Quản lý → <b>Báo cáo</b> → Xuất CSV; Admin → <b>Nhật ký thao tác</b>.</li></ol>`, '<button class="btn pri" data-act="mclose">Bắt đầu</button>', true),
  pickuser: d => { ui.loginUser = d.u; ui.pin = ''; render(); },
  pin: d => {
    if (d.k === '⌫') ui.pin = ui.pin.slice(0, -1); else if (ui.pin.length < 4) ui.pin += d.k;
    if (ui.pin.length === 4) {
      if (ui.pin === PIN) { S.sessions[route.app] = { ...userOf(ui.loginUser), username: ui.loginUser }; idle = Date.now(); log('Đăng nhập', `${APPS[route.app].name}`); save(false); toast(`Xin chào ${userOf(ui.loginUser).display_name}`, 'ok'); }
      else { ui.fails = (ui.fails || 0) + 1; toast(ui.fails >= 5 ? 'Sai 5 lần — tài khoản bị khóa, liên hệ Admin' : `Sai PIN (${ui.fails}/5)`, 'err'); }
      ui.pin = '';
    }
    render();
  },
  lock: (d, el, e) => { e.preventDefault(); delete S.sessions[route.app]; save(false); render(); },
  table: d => {
    const tb = S.tables[d.t];
    if (tb.status === 'AVAILABLE') { ui.guests = 2; return modal(`Mở bàn ${d.t}`, `<div class="row between"><b>Số khách</b><div class="step"><button data-act="g" data-d="-1">−</button><span id="gn">${ui.guests}</span><button data-act="g" data-d="1">+</button></div></div>`, `<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="open" data-t="${d.t}">Mở bàn</button>`); }
    if (tb.status === 'CLEANING') return modal(`Bàn ${d.t} cần dọn`, '<p>Xác nhận bàn đã dọn xong để chuyển về Trống (BR-17)?</p>', `<button class="btn" data-act="mclose">Chưa</button><button class="btn pri" data-act="clean" data-t="${d.t}">Đã dọn</button>`);
    const oid = tb.status === 'MERGED' ? S.tables[tb.mergedInto].order : tb.order;
    location.hash = `#/waiter/order/${oid}`;
  },
  g: d => { ui.guests = Math.min(20, Math.max(1, ui.guests + +d.d)); $('#gn').textContent = ui.guests; },
  open: d => { const o = newOrder(d.t, 'DINE'); Object.assign(S.tables[d.t], { status: 'OCCUPIED', guests: ui.guests, openedAt: Date.now(), waiter: cur().username }); log('Mở bàn', `${d.t} · ${ui.guests} khách`); save(); mclose(); location.hash = `#/waiter/menu/${o.id}`; },
  clean: d => { Object.assign(S.tables[d.t], { status: 'AVAILABLE', waiter: null }); save(); mclose(); render(); },
  cat: d => { ui.cat = d.c; render(); },
  soldout: d => { const m = MENU[d.m]; const alt = D.menu.filter(x => x.cat === m.cat && canOrder(x.id) && x.id !== m.id).slice(0, 3); toast(`${m.vi} đã hết. Gợi ý: ${alt.map(x => x.vi).join(', ')}`, 'err'); },
  dish: d => sheetDish(d.m),
  quick: d => { addItem(S.orders[route.arg], d.m, 1, [], [], ''); render(); },
  'sheet-bg': (d, el, e) => { if (e.target === el) el.remove(); }, 'sheet-close': () => document.querySelector('.sheetwrap')?.remove(),
  mod: (d, el) => { const s = ui.sheet, G = D.modifiers[d.g], k = +d.k; if (G.required) s.sel[d.g] = k; else { const a = s.sel[d.g] = s.sel[d.g] || []; el.checked ? a.push(k) : a.splice(a.indexOf(k), 1); } s.note = $('#note')?.value || s.note; drawSheet(MENU[s.mid], S.menu[s.mid]); },
  alg: d => { const s = ui.sheet; s.note = $('#note')?.value || s.note; s.allergens = s.allergens.includes(d.a) ? s.allergens.filter(x => x !== d.a) : [...s.allergens, d.a]; drawSheet(MENU[s.mid], S.menu[s.mid]); },
  qty: d => { const s = ui.sheet; s.note = $('#note')?.value || s.note; s.qty = Math.max(1, Math.min(20, s.qty + +d.d)); drawSheet(MENU[s.mid], S.menu[s.mid]); },
  'sheet-add': () => {
    const s = ui.sheet, m = MENU[s.mid]; s.note = $('#note')?.value || '';
    const miss = m.mods.find(g => D.modifiers[g].required && s.sel[g] == null);
    if (miss) { s.err = miss; toast(`Chọn ${D.modifiers[miss].vi}`, 'err'); return drawSheet(m, S.menu[s.mid]); }
    const mods = Object.entries(s.sel).flatMap(([g, v]) => (Array.isArray(v) ? v : [v]).map(k => ({ g, ...D.modifiers[g].options[k] })));
    document.querySelector('.sheetwrap')?.remove();
    addItem(S.orders[route.arg], s.mid, s.qty, mods, s.allergens, s.note.slice(0, 100)); render();
  },
  rm: d => { const o = S.orders[route.arg]; o.items = o.items.filter(i => i.id !== d.i); save(); render(); },
  send: d => { sendOrder(S.orders[d.o]); log('Gửi bếp', `${S.orders[d.o].table} · lượt ${S.orders[d.o].round}`); save(false); render(); },
  serve: d => { const o = S.orders[route.arg]; setItem(o, o.items.find(i => i.id === d.i), 'SERVED'); save(); render(); },
  'serve-n': d => { const n = S.notes.find(x => x.id === d.n), o = S.orders[n.orderId], i = o.items.find(x => x.id === n.itemId); if (i && i.status === 'READY') setItem(o, i, 'SERVED'); n.done = true; save(); render(); },
  seen: d => { S.notes.find(x => x.id === d.n).done = true; save(false); },
  readall: () => { const u = cur().username; S.notes.forEach(n => { if (n.to === u && n.kind !== 'READY') n.done = true; }); save(false); render(); },
  cancel: d => {
    const o = S.orders[route.arg], i = o.items.find(x => x.id === d.i), needs = i.status !== 'QUEUED';
    modal(needs ? 'Yêu cầu hủy món' : 'Hủy món', `<p><b>${i.qty} × ${esc(name(i))}</b> · ${IS[i.status][0]}</p>${needs ? '<div class="warn">Món đã bắt đầu nấu — cần Quản lý duyệt (BR-05)</div>' : ''}
      <label class="f" style="margin-top:10px">Lý do *<select id="reason">${D.cancelReasons.map(r => `<option>${esc(r.vi)}</option>`).join('')}</select></label>`,
      `<button class="btn" data-act="mclose">Đóng</button><button class="btn dan" data-act="cancel-do" data-i="${i.id}">${needs ? 'Gửi yêu cầu' : 'Hủy món'}</button>`);
  },
  'cancel-do': d => {
    const o = S.orders[route.arg], i = o.items.find(x => x.id === d.i), reason = $('#reason').value;
    if (i.status === 'QUEUED') { i.prev = i.status; i.status = 'CANCELLED'; i.cancelledAt = Date.now(); const ms = S.menu[i.menuId]; if (ms.status === 'LIMITED') ms.qty += i.qty; log('Hủy món', `${o.table} · ${i.qty} × ${name(i)} · ${reason}`); toast('Đã hủy món, bếp đã được cập nhật', 'ok'); }
    else { i.prev = i.status; i.status = 'VOID_PENDING'; S.approvals.push({ id: id('A'), kind: 'VOID', orderId: o.id, itemId: i.id, reason, by: cur().username, at: Date.now(), status: 'PENDING' }); log('Yêu cầu hủy món', `${o.table} · ${name(i)} · ${reason}`); toast('Đã gửi yêu cầu tới Quản lý'); }
    save(); mclose(); render();
  },
  more: d => { const o = S.orders[d.o], free = D.tables.filter(t => S.tables[t.code].status === 'AVAILABLE'), occ = D.tables.filter(t => t.code !== o.table && S.tables[t.code].status === 'OCCUPIED');
    modal(`Bàn ${o.table}`, `<div class="stack"><label class="f">Chuyển sang bàn trống (BR-18)<select id="mv">${free.map(t => `<option>${t.code}</option>`).join('')}</select></label><button class="btn" data-act="move" data-o="${o.id}" ${free.length ? '' : 'disabled'}>Chuyển bàn</button>
      <label class="f">Ghép bàn khác vào bàn này<select id="mg">${occ.map(t => `<option>${t.code}</option>`).join('')}</select></label><button class="btn" data-act="merge" data-o="${o.id}" ${occ.length ? '' : 'disabled'}>Ghép bàn</button>
      ${live(o).every(i => i.status === 'NEW') ? `<button class="btn dan" data-act="cancel-order" data-o="${o.id}">Hủy đơn (BR-20)</button>` : ''}</div>`); },
  move: d => { const o = S.orders[d.o], to = $('#mv').value, from = S.tables[o.table]; S.tables[to] = { ...from, order: o.id }; Object.assign(from, { status: 'CLEANING', order: null, guests: 0 }); log('Chuyển bàn', `${o.table} → ${to}`); o.table = to; save(); mclose(); render(); toast(`Đã chuyển sang ${to}`, 'ok'); },
  merge: d => { const o = S.orders[d.o], other = $('#mg').value, ot = S.tables[other], oo = S.orders[ot.order];
    oo.items.forEach(i => o.items.push(i)); oo.items = []; oo.status = 'CANCELLED'; S.tables[o.table].guests += ot.guests;
    Object.assign(ot, { status: 'MERGED', mergedInto: o.table, order: null }); log('Ghép bàn', `${other} → ${o.table}`); save(); mclose(); render(); toast(`Đã ghép ${other} vào ${o.table}`, 'ok'); },
  'cancel-order': d => { const o = S.orders[d.o]; o.items.forEach(i => { i.status = 'CANCELLED'; }); o.status = 'CANCELLED'; Object.assign(S.tables[o.table], { status: 'AVAILABLE', order: null, guests: 0, waiter: null }); log('Hủy đơn', o.table); save(); mclose(); location.hash = '#/waiter/tables'; },
  // bếp
  kitem: d => { const o = S.orders[d.o], i = o.items.find(x => x.id === d.i);
    if (i.status === 'QUEUED') { if (i.allergens.length && !i.ack) return toast('Đọc và xác nhận cảnh báo dị ứng trước khi nấu (BR-04)', 'err'); setItem(o, i, 'COOKING'); }
    else if (i.status === 'COOKING') setItem(o, i, 'READY');
    else if (i.status === 'READY') setItem(o, i, 'SERVED');
    else return;
    save(); render(); },
  ack: d => { const o = S.orders[d.o], i = o.items.find(x => x.id === d.i); i.ack = true; log('Xác nhận dị ứng', `${o.table} · ${name(i)} · ${i.allergens.join(',')}`); save(); render(); },
  undo: d => { const o = S.orders[d.o], i = o.items.find(x => x.id === d.i), back = i.status === 'READY' ? 'COOKING' : 'QUEUED'; i.status = back; S.notes.forEach(n => { if (n.itemId === i.id) n.done = true; }); log('Hoàn tác trạng thái', `${o.table} · ${name(i)} → ${IS[back][0]}`); save(); render(); },
  'done-all': d => { const o = S.orders[d.o]; let blocked = 0;
    o.items.filter(i => i.round === +d.r && MENU[i.menuId].station === d.s && ['QUEUED', 'COOKING'].includes(i.status)).forEach(i => { if (i.status === 'QUEUED' && i.allergens.length && !i.ack) { blocked++; return; } setItem(o, i, 'READY'); });
    if (blocked) toast(`${blocked} món chờ xác nhận dị ứng`, 'err'); save(); render(); },
  picked: d => { const o = S.orders[d.o]; o.items.filter(i => i.round === +d.r && MENU[i.menuId].station === d.s && i.status === 'READY').forEach(i => setItem(o, i, 'SERVED')); save(); render(); },
  print: d => { const o = S.orders[d.o], items = o.items.filter(i => i.round === +d.r && MENU[i.menuId].station === d.s && i.status !== 'CANCELLED');
    modal('In phiếu bếp (máy in dự phòng · NFR-08)', `<div class="receipt">${esc([`PHIẾU BẾP · ${STN[d.s].vi.toUpperCase()}`, `${o.table} · Lượt ${d.r} · ${hm(items[0]?.sentAt || Date.now())}`, '-'.repeat(30),
      ...items.flatMap(i => [`${i.qty} x ${name(i)}`, ...i.mods.map(m => `   - ${m.name}`), ...(i.note ? [`   * ${i.note}`] : []), ...(i.allergens.length ? [`   !!! DI UNG: ${i.allergens.map(a => ALG[a].en.toUpperCase()).join(', ')}`] : [])])].join('\n'))}</div>`,
      '<button class="btn pri" data-act="mclose">Đã in</button>'); },
  kview: (d, el, e) => { e.preventDefault(); ui.kdsView = d.s; render(); },
  'soldout-set': d => { markSoldOut(d.m); save(); render(); toast(`${MENU[d.m].vi} → Hết, đã chặn trên mọi app`, 'ok'); },
  limit: d => modal(`Số phần còn lại · ${esc(MENU[d.m].vi)}`, `<label class="f">Số phần (0–999)<input id="lim" inputmode="numeric" value="${S.menu[d.m].qty ?? ''}"></label>`, `<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="limit-do" data-m="${d.m}">Lưu</button>`),
  'limit-do': d => { const v = $('#lim').value.trim(); if (!/^\d{1,3}$/.test(v)) return toast('Số phần không hợp lệ', 'err');
    const n = +v; if (n === 0) markSoldOut(d.m); else { S.menu[d.m] = { status: 'LIMITED', qty: n }; log('Đặt số phần', `${d.m} ${MENU[d.m].vi} → còn ${n}`); } save(); mclose(); render(); },
  reopen: d => { S.menu[d.m] = { status: 'AVAILABLE', qty: null }; log('Mở bán lại', `${d.m} ${MENU[d.m].vi}`); save(); render(); },
  // thu ngân
  disc: d => { const o = S.orders[d.o];
    modal('Giảm giá (US-22)', `<div class="stack"><div class="row"><select id="dt" style="max-width:150px"><option value="PCT">Theo %</option><option value="AMT">Số tiền (AUD)</option><option value="FREE">Miễn phí cả bill</option></select><input id="dv" inputmode="decimal" placeholder="VD 10"></div>
      <label class="f">Lý do *<select id="dr">${D.discountReasons.map(r => `<option>${esc(r.vi)}</option>`).join('')}</select></label><div class="muted small">≤ 10%: áp ngay · > 10% hoặc miễn phí: chờ Quản lý duyệt (BR-11)</div></div>`,
      `${o.discount ? '<button class="btn ghost" data-act="disc-clear" data-o="' + o.id + '">Bỏ giảm giá</button>' : ''}<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="disc-do" data-o="${o.id}">Áp dụng</button>`); },
  'disc-clear': d => { S.orders[d.o].discount = null; save(); mclose(); render(); },
  'disc-do': d => { const o = S.orders[d.o], type = $('#dt').value, raw = parseFloat($('#dv').value || '0'), reason = $('#dr').value, sub = calc({ ...o, discount: null }).sub;
    const value = type === 'PCT' ? raw : type === 'FREE' ? 100 : Math.round(raw * 100);
    if (type !== 'FREE' && (!raw || raw < 0 || (type === 'PCT' && raw > 100))) return toast('Giá trị giảm không hợp lệ', 'err');
    const disc = { type: type === 'FREE' ? 'PCT' : type, value, reason, status: needApproval(type, value, sub) ? 'PENDING' : 'APPLIED' };
    o.discount = disc;
    const amount = disc.type === 'PCT' ? Math.round(sub * value / 100) : value;
    if (disc.status === 'PENDING') { S.approvals.push({ id: id('A'), kind: 'DISCOUNT', orderId: o.id, discount: { type, value }, amount, reason, by: cur().username, at: Date.now(), status: 'PENDING' }); toast('Đã gửi yêu cầu duyệt giảm giá'); }
    log('Giảm giá', `${o.table} · ${type === 'PCT' ? value + '%' : type === 'FREE' ? 'miễn phí' : money(value)} · ${reason} · ${money(amount)}${disc.status === 'PENDING' ? ' · chờ duyệt' : ''}`);
    save(); mclose(); render(); },
  printbill: d => { const o = S.orders[d.o]; o.billStatus = 'PRINTED'; S.tables[o.table].status = 'AWAITING'; log('In bill tạm', o.table); save();
    modal(`Bill tạm ${o.table}`, receipt(o, false), '<button class="btn pri" data-act="mclose">Đóng</button>'); render(); },
  pay: d => payModal(S.orders[d.o]),
  pm: d => { ui.pay.method = d.m; drawPay(); },
  quickcash: d => { ui.pay.tendered = d.v; drawPay(); },
  taxinv: (d, el) => { ui.pay.tax = el.checked; },
  paydo: () => {
    const p = ui.pay, o = S.orders[p.o], amount = p.method === 'CASH' ? r5(p.amount) : p.amount;
    if (o.type === 'DINE' && calc(o).total >= 100000 && p.tax && !confirm('Bill ≥ AUD 1.000: đã ghi tên/ABN người mua lên tax invoice (BR-16)?')) return;
    const t = Math.round(parseFloat(p.tendered || '0') * 100);
    o.payments.push({ amount: p.method === 'CASH' ? p.amount : amount, method: p.method, tendered: p.method === 'CASH' ? t : null, change: p.method === 'CASH' ? t - amount : 0, at: Date.now(), part: p.part });
    if (p.part != null) { o.split.parts[p.part].paid = true; o.billStatus = o.split.parts.every(x => x.paid) ? 'PAID' : 'PARTIAL'; }
    const done = p.part != null ? o.split.parts.every(x => x.paid) : paid(o) >= calc(o).total;
    if (done) { closePaid(o); if (o.type === 'TA') { o.billStatus = 'PAID'; sendOrder(o); } }
    else if (p.part == null) o.billStatus = 'PARTIAL';
    save();
    if (done && o.type === 'DINE') history.pushState(null, '', '#/cashier/tables');
    render();
    modal(done ? 'Đã thanh toán' : 'Đã thu một phần', `${receipt(o, p.tax)}${p.method === 'CASH' && t - amount > 0 ? `<p style="text-align:center;font-size:18px"><b>Trả lại khách: ${money(t - amount)}</b></p>` : ''}`, '<button class="btn pri" data-act="mclose">Xong</button>', false);
  },
  smode: d => { const o = S.orders[d.o]; if (o.split.mode !== d.m && o.split.parts.some(p => p.items?.length) && !confirm('Đổi cách tách sẽ xóa phân bổ hiện tại. Tiếp tục?')) return;
    o.split = d.m === 'EQUAL' ? { mode: 'EQUAL', n: 2, parts: [{ paid: false }, { paid: false }] } : { mode: 'ITEM', n: 2, parts: [{ items: [], paid: false }, { items: [], paid: false }] }; o.billStatus = 'SPLIT'; save(); render(); },
  sn: d => { const o = S.orders[d.o], sp = o.split; sp.n = Math.min(10, Math.max(2, sp.n + +d.d)); sp.parts = Array.from({ length: sp.n }, () => ({ paid: false })); o.billStatus = 'SPLIT'; save(); render(); },
  ppick: (d, el, e) => { if (e.target.closest('button')) return; ui.part = +d.k; render(); },
  padd: d => { S.orders[d.o].split.parts.push({ items: [], paid: false }); save(); render(); },
  assign: (d, el, e) => { if (e.target.closest('button')) return; const o = S.orders[d.o], sp = o.split, k = Math.min(ui.part, sp.parts.length - 1);
    if (sp.parts[k].paid) return; sp.parts.forEach(p => p.items = p.items.filter(x => x !== d.i)); sp.parts[k].items.push(d.i); o.billStatus = 'SPLIT'; save(); render(); },
  unit: d => { const o = S.orders[d.o], i = o.items.find(x => x.id === d.i); i.qty -= 1; const c = { ...i, id: id('I'), qty: 1 }; o.items.splice(o.items.indexOf(i) + 1, 0, c); save(); render(); },
  paypart: d => payModal(S.orders[d.o], +d.k),
  'ta-new': () => { S.taSeq = (S.taSeq || 1) + 1; const code = 'TA-' + String(S.taSeq).padStart(2, '0'); const o = newOrder(code, 'TA'); o.customer = prompt('Tên khách (không bắt buộc)') || ''; save(); location.hash = `#/cashier/takeaway/${o.id}`; },
  'ta-add': d => { addItem(S.orders[d.o], d.m, 1, [], [], ''); render(); },
  'ta-rm': d => { const o = S.orders[d.o]; o.items = o.items.filter(i => i.id !== d.i); save(); render(); },
  closeshift: () => { const cash = S.sales.reduce((a, s) => a + s.payments.filter(p => p.method === 'CASH').reduce((x, p) => x + p.amount, 0), 0);
    S.shift = { at: Date.now(), by: cur().username, diff: Math.round(parseFloat(ui.counted) * 100) - cash, reason: ui.reason || '' }; log('Chốt ca', `Chênh lệch ${money(S.shift.diff)}${ui.reason ? ' · ' + ui.reason : ''}`); save(); render(); toast('Đã chốt ca', 'ok'); },
  // quản lý
  appr: d => { const a = S.approvals.find(x => x.id === d.a), o = S.orders[a.orderId]; a.status = d.d; a.decidedBy = cur().username;
    const ok = d.d === 'APPROVED';
    if (a.kind === 'VOID') { const i = o.items.find(x => x.id === a.itemId); if (ok) { i.status = 'CANCELLED'; i.cancelledAt = Date.now(); } else i.status = i.prev; log(ok ? 'Duyệt hủy món' : 'Từ chối hủy món', `${o.table} · ${name(i)} · ${a.reason}`); }
    else { o.discount.status = ok ? 'APPLIED' : 'REJECTED'; if (!ok) o.discount = null; log(ok ? 'Duyệt giảm giá' : 'Từ chối giảm giá', `${o.table} · ${a.reason} · ${money(a.amount)}`); }
    const to = o.type === 'DINE' ? (a.kind === 'VOID' ? S.tables[o.table].waiter : 'cashier') : 'cashier';
    S.notes.unshift({ id: id('N'), to: a.kind === 'VOID' ? to : a.by, table: o.table, orderId: o.id, text: `${a.kind === 'VOID' ? 'Yêu cầu hủy món' : 'Giảm giá'} ${ok ? 'đã được duyệt' : 'bị từ chối'}`, at: Date.now(), kind: 'APPROVAL', done: false });
    save(); render(); toast(ok ? 'Đã duyệt' : 'Đã từ chối', ok ? 'ok' : ''); },
  medit: d => menuForm(d.m),
  falg: (d, el) => { const a = ui.medit.allergens; a.includes(d.a) ? a.splice(a.indexOf(d.a), 1) : a.push(d.a); el.classList.toggle('on'); },
  fmod: (d, el) => { const a = ui.medit.mods; el.checked ? a.push(d.g) : a.splice(a.indexOf(d.g), 1); },
  msave: () => { const m = ui.medit, err = [];
    if (!m.vi.trim() || !m.en.trim()) err.push('Nhập đủ tên tiếng Việt và tiếng Anh'); if (!(m.price > 0)) err.push('Giá phải lớn hơn 0');
    if (err.length) { const e = $('#ferr'); e.style.display = 'block'; e.textContent = err.join(' · '); return; }
    const old = MENU[m.id];
    if (m.isNew) { const nm = { ...m }; delete nm.isNew; D.menu.push(nm); MENU[nm.id] = nm; S.menu[nm.id] = { status: 'AVAILABLE', qty: null }; log('Thêm món', `${nm.id} ${nm.vi} · ${money(nm.price)}`); }
    else { if (old.price !== m.price) log('Sửa giá', `${m.id} ${m.vi}: ${money(old.price)} → ${money(m.price)}`); Object.assign(old, { ...m, isNew: undefined }); }
    S.menuEdits = S.menuEdits || {}; S.menuEdits[m.id] = { ...MENU[m.id] }; save(); mclose(); render(); toast('Đã lưu món, menu cập nhật trên mọi app', 'ok'); },
  csv: () => { const rows = [['time', 'table', 'subtotal', 'discount', 'surcharge', 'total', 'gst', 'payment']].concat(S.sales.map(s => [new Date(s.at).toISOString(), s.table, s.sub / 100, s.discount / 100, s.surcharge / 100, s.total / 100, s.gst / 100, s.payments.map(p => p.method).join('+')]));
    const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' }), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `hl-oms-revenue-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); toast('Đã xuất CSV', 'ok'); },
  uadd: () => modal('Thêm người dùng', `<div class="stack"><label class="f">Họ tên *<input id="un"></label><label class="f">Tài khoản *<input id="uu"></label><label class="f">Vai trò<select id="ur">${Object.entries(ROLE_VI).map(([r, l]) => `<option value="${r}">${l}</option>`).join('')}</select></label><label class="f">PIN 4–6 số *<input id="up" inputmode="numeric"></label></div>`, '<button class="btn" data-act="mclose">Hủy</button><button class="btn pri" data-act="uadd-do">Tạo</button>'),
  'uadd-do': () => { const n = $('#un').value.trim(), u = $('#uu').value.trim(), p = $('#up').value.trim();
    if (!n || !u || !/^\d{4,6}$/.test(p)) return toast('Nhập đủ họ tên, tài khoản, PIN 4–6 số', 'err'); if (S.users.some(x => x.username === u)) return toast('Tài khoản đã tồn tại', 'err');
    S.users.push({ username: u, display_name: n, role: $('#ur').value, employment: 'Part-time', status: 'Active' }); log('Tạo tài khoản', `${u} · ${ROLE_VI[$('#ur').value]}`); save(); mclose(); render(); },
  upin: d => { log('Đặt lại PIN', S.users[+d.k].username); save(); toast(`Đã gửi PIN tạm cho ${S.users[+d.k].display_name}`, 'ok'); },
  ulock: d => { const u = S.users[+d.k]; u.status = u.status === 'Active' ? 'Inactive' : 'Active'; log(u.status === 'Active' ? 'Mở khóa tài khoản' : 'Khóa tài khoản', u.username); save(); render(); },
};
document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el) return; const f = ACT[el.dataset.act]; if (f) f(el.dataset, el, e); });
document.addEventListener('input', e => {
  const k = e.target.dataset.in; if (!k) return;
  const v = e.target.value;
  if (k === 'q') { ui.q = v; const pos = e.target.selectionStart; render(); const el = document.querySelector('[data-in="q"]'); if (el) { el.focus(); el.setSelectionRange(pos, pos); } }
  else if (k === 'tendered') { ui.pay.tendered = v; drawPay(); const el = $('#tendered'); el.focus(); el.setSelectionRange(v.length, v.length); }
  else if (k === 'counted' || k === 'reason') { ui[k] = v; render(); const el = document.querySelector(`[data-in="${k}"]`); el.focus(); el.setSelectionRange(v.length, v.length); }
  else if (k === 'mq') { ui.mfilter.q = v; render(); const el = document.querySelector('[data-in="mq"]'); el.focus(); el.setSelectionRange(v.length, v.length); }
  else if (k === 'sur') { const n = parseInt(v, 10); if (n >= 0 && n <= 30) { S.settings.surcharge = n; log('Đổi phụ thu', n + '%'); save(false); } }
  else if (k.startsWith('f') && ui.medit) { const f = { fvi: 'vi', fen: 'en', fcat: 'cat', fst: 'station' }[k]; if (f) ui.medit[f] = v; if (k === 'fprice') ui.medit.price = Math.round(parseFloat(v || '0') * 100); if (k === 'flunch') ui.medit.lunch = v ? Math.round(parseFloat(v) * 100) : null; }
});
document.addEventListener('change', e => {
  const k = e.target.dataset.in;
  if (k === 'mcat') { ui.mfilter.cat = e.target.value; render(); }
  if (k === 'aud') { ui.audit = e.target.value; render(); }
  if (k === 'urole') { const u = S.users[+e.target.dataset.k]; log('Đổi vai trò', `${u.username}: ${ROLE_VI[u.role]} → ${ROLE_VI[e.target.value]}`); u.role = e.target.value; save(); render(); }
  if (k === 'fcat' || k === 'fst') ui.medit[k === 'fcat' ? 'cat' : 'station'] = e.target.value;
});

/* ---------------- khởi động ---------------- */
load();
if (S.menuEdits) Object.values(S.menuEdits).forEach(m => { if (MENU[m.id]) Object.assign(MENU[m.id], m); else { D.menu.push(m); MENU[m.id] = m; } });
const qp = new URLSearchParams(location.search);
if (qp.get('as')) { const [app, u] = qp.get('as').split(':'); if (APPS[app]) S.sessions[app] = { ...userOf(u), username: u }; }
render();
