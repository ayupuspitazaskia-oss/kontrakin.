// Data kontrakan awal (sama dengan website penyewa)
const DEFAULTS = [
  {
    id: 1,
    name: "Rumah Asri Lowokwaru",
    area: "Lowokwaru, Malang",
    price: 1500000,
    discount: 10,
    rooms: 2,
    baths: 1,
    size: "60 m²",
    desc: "Kontrakan sederhana dengan suasana lingkungan yang nyaman dan akses ke fasilitas umum.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Kontrakan Minimalis Sukun",
    area: "Sukun, Malang",
    price: 1200000,
    discount: 0,
    rooms: 2,
    baths: 1,
    size: "45 m²",
    desc: "Hunian minimalis untuk kamu yang mencari tempat tinggal praktis.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Rumah Keluarga Dinoyo",
    area: "Dinoyo, Malang",
    price: 2000000,
    discount: 15,
    rooms: 3,
    baths: 1,
    size: "72 m²",
    desc: "Rumah dengan ruang lebih luas dan lingkungan yang cukup tenang.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Kontrakan Dekat Kampus",
    area: "Kedungkandang, Malang",
    price: 1000000,
    discount: 5,
    rooms: 1,
    baths: 1,
    size: "36 m²",
    desc: "Pilihan kontrakan sederhana dengan biaya sewa yang terjangkau.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Rumah Sejuk Batu",
    area: "Batu, Jawa Timur",
    price: 2500000,
    discount: 20,
    rooms: 3,
    baths: 2,
    size: "80 m²",
    desc: "Rumah dengan suasana sejuk dan halaman kecil.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Hunian Nyaman Sidoarjo",
    area: "Waru, Sidoarjo",
    price: 1800000,
    discount: 10,
    rooms: 2,
    baths: 1,
    size: "60 m²",
    desc: "Hunian praktis dengan akses menuju area aktivitas sehari-hari.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Rumah Sederhana Surabaya",
    area: "Rungkut, Surabaya",
    price: 2200000,
    discount: 0,
    rooms: 2,
    baths: 1,
    size: "65 m²",
    desc: "Rumah sederhana untuk kebutuhan tempat tinggal di Surabaya.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Kontrakan Ceria Pasuruan",
    area: "Pandaan, Pasuruan",
    price: 1300000,
    discount: 12,
    rooms: 2,
    baths: 1,
    size: "50 m²",
    desc: "Tempat tinggal dengan tata ruang fungsional.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Rumah Kecil Blitar",
    area: "Sananwetan, Blitar",
    price: 900000,
    discount: 0,
    rooms: 1,
    baths: 1,
    size: "32 m²",
    desc: "Kontrakan mungil dengan harga sewa ekonomis.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Hunian Keluarga Kediri",
    area: "Mojoroto, Kediri",
    price: 1700000,
    discount: 8,
    rooms: 2,
    baths: 1,
    size: "58 m²",
    desc: "Rumah dengan ruang yang cukup untuk kebutuhan keluarga kecil.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const rd = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? f; } catch { return f; } };
const wr = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = (v = "") => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const money = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const promoPrice = (p) => Math.round(p.price * (1 - (p.discount || 0) / 100));
const fmtDate = (d) => { const x = new Date(d + "T00:00:00"); return isNaN(x) ? d || "-" : x.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }); };

// Data bersama dengan website penyewa (localStorage)
const getP = () => rd("kontrakinProperties", null) || DEFAULTS.map((p) => ({ ...p }));
const saveP = (a) => wr("kontrakinProperties", a);
const users = () => rd("kontrakinUsers", []);
const books = () => rd("kontrakinBookings", []);
const approval = (b) => b.approval || (b.status === "Ditolak" ? "Ditolak" : "Menunggu");

const badge = (t, c = "") => `<span class="badge ${c}">${esc(t)}</span>`;
const empty = (n, t) => `<tr><td colspan="${n}" class="empty">${t}</td></tr>`;
const apprBadge = (a) => badge(a, { Menunggu: "warn", Diterima: "", Ditolak: "bad" }[a]);

const TITLES = { dashboard: "Dashboard", kontrakan: "Data Kontrakan", penyewa: "Data Penyewa", penyewaan: "Penyewaan", pembayaran: "Pembayaran", promo: "Kelola Promo" };
let cur = "dashboard";
let me = rd("kontrakinAdmin", null);
let toastTimer;

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- RENDER HALAMAN ---------- */
const R = {
  dashboard() {
    const b = books();
    const stats = [
      ["Total Kontrakan", getP().length, "Properti terdaftar"],
      ["Total Penyewa", users().length, "Akun terdaftar"],
      ["Pengajuan Sewa", b.length, "Data pemesanan"],
      ["Pembayaran", b.filter((x) => x.method).length, "Transaksi tercatat"],
    ];
    $("#stats").innerHTML = stats.map(([l, v, s]) => `<div class="stat"><span>${l}</span><strong>${v}</strong><small>${s}</small></div>`).join("");
    const rows = b.slice(-5).reverse();
    $("#tbRecent").innerHTML = rows.length
      ? rows.map((x) => `<tr><td>${esc(x.name)}</td><td>${esc(x.propertyName)}</td><td>${esc(fmtDate(x.startDate))}</td><td>${apprBadge(approval(x))}</td></tr>`).join("")
      : empty(4, "Belum ada pengajuan penyewaan.");
  },
  kontrakan() {
    const rented = new Set(books().filter((b) => b.status === "Pembayaran dikonfirmasi").map((b) => b.propertyId));
    const P = getP();
    $("#tbProp").innerHTML = P.length
      ? P.map((p) => `<tr>
          <td>${esc(p.name)}</td><td>${esc(p.area)}</td>
          <td>${p.discount ? `<span class="old">${money(p.price)}</span>` : ""}${money(promoPrice(p))}</td>
          <td>${p.rooms}</td>
          <td>${badge(p.status || (rented.has(p.id) ? "Disewa" : "Tersedia"))}</td>
          <td><div class="actions">
            <button class="btn sm soft" data-act="edit-prop" data-id="${p.id}">Edit</button>
            <button class="btn sm danger" data-act="del-prop" data-id="${p.id}">Hapus</button>
          </div></td></tr>`).join("")
      : empty(6, "Belum ada data kontrakan.");
  },
  penyewa() {
    const b = books();
    const u = users();
    $("#tbTenant").innerHTML = u.length
      ? u.map((x) => {
          const last = [...b].reverse().find((k) => (k.userEmail || "").toLowerCase() === x.email.toLowerCase());
          return `<tr><td>${esc(x.name)}</td><td>${esc(x.email)}</td><td>${esc(last?.phone || "-")}</td></tr>`;
        }).join("")
      : empty(3, "Belum ada penyewa terdaftar.");
  },
  penyewaan() {
    const b = [...books()].reverse();
    $("#tbRent").innerHTML = b.length
      ? b.map((x) => {
          const a = approval(x);
          return `<tr><td>${esc(x.name)}</td><td>${esc(x.propertyName)}</td><td>${esc(fmtDate(x.startDate))}</td><td>${apprBadge(a)}</td>
            <td>${a === "Menunggu" ? `<div class="actions">
              <button class="btn sm soft" data-act="appr" data-v="Diterima" data-id="${x.id}">Terima</button>
              <button class="btn sm danger" data-act="appr" data-v="Ditolak" data-id="${x.id}">Tolak</button></div>` : "-"}</td></tr>`;
        }).join("")
      : empty(5, "Belum ada pengajuan penyewaan.");
  },
  pembayaran() {
    const b = [...books()].reverse().filter((x) => x.method);
    const label = { "Pembayaran dikonfirmasi": ["Berhasil", ""], "Pembayaran dicatat": ["Menunggu verifikasi", "warn"], Ditolak: ["Ditolak", "bad"] };
    $("#tbPay").innerHTML = b.length
      ? b.map((x) => {
          const [t, c] = label[x.status] || [x.status, "warn"];
          return `<tr><td>${esc(x.name)}<small>${esc(x.propertyName)}</small></td><td>${esc(x.method)}</td><td>${money(x.total)}</td><td>${badge(t, c)}</td>
            <td>${x.status === "Pembayaran dicatat" ? `<div class="actions">
              <button class="btn sm soft" data-act="pay" data-v="ok" data-id="${x.id}">Konfirmasi</button>
              <button class="btn sm danger" data-act="pay" data-v="no" data-id="${x.id}">Tolak</button></div>` : "-"}</td></tr>`;
        }).join("")
      : empty(5, "Belum ada transaksi pembayaran.");
  },
  promo() {
    const P = getP().filter((p) => p.discount > 0);
    $("#tbPromo").innerHTML = P.length
      ? P.map((p) => `<tr><td>${esc(p.name)}<small>${esc(p.area)}</small></td><td>${p.discount}%</td><td>${money(promoPrice(p))}</td><td>${badge("Aktif")}</td>
          <td><div class="actions">
            <button class="btn sm soft" data-act="edit-promo" data-id="${p.id}">Edit</button>
            <button class="btn sm danger" data-act="del-promo" data-id="${p.id}">Hapus</button>
          </div></td></tr>`).join("")
      : empty(5, "Belum ada promo aktif.");
  },
};

function show(name) {
  cur = name;
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === "v-" + name));
  $$(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.view === name));
  $("#pageTitle").textContent = TITLES[name];
  $("#sidebar").classList.remove("open");
  R[name]();
  window.scrollTo({ top: 0 });
}
const done = (msg) => { R[cur](); toast(msg); };

/* ---------- MODAL ---------- */
function openProp(id) {
  const p = getP().find((x) => x.id === id) || {};
  const f = $("#propForm");
  f.reset();
  f.dataset.id = p.id || "";
  $("#propTitle").textContent = p.id ? "Edit Kontrakan" : "Tambah Kontrakan";
  ["name", "area", "price", "size", "rooms", "baths", "status", "image", "desc"].forEach((k) => (f.elements[k].value = p[k] ?? ""));
  $("#propModal").classList.remove("hidden");
}

function openPromo(id) {
  const P = getP();
  if (!P.length) return toast("Tambahkan kontrakan terlebih dahulu.");
  $("#promoProp").innerHTML = P.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join("");
  const p = P.find((x) => x.id === id);
  if (p) $("#promoProp").value = p.id;
  $("#promoForm").elements.discount.value = p?.discount || "";
  $("#promoModal").classList.remove("hidden");
}

$("#propForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.currentTarget));
  const id = Number(e.currentTarget.dataset.id);
  const P = getP();
  const item = { name: d.name.trim(), area: d.area.trim(), price: Number(d.price), rooms: Number(d.rooms), baths: Number(d.baths), status: d.status, size: d.size.trim(), desc: d.desc.trim(), image: d.image.trim() || DEFAULTS[0].image };
  const ex = P.find((x) => x.id === id);
  if (ex) Object.assign(ex, item);
  else P.push({ id: Math.max(0, ...P.map((x) => x.id)) + 1, discount: 0, ...item });
  saveP(P);
  $("#propModal").classList.add("hidden");
  done(ex ? "Kontrakan diperbarui." : "Kontrakan ditambahkan.");
});

$("#promoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.currentTarget));
  const P = getP();
  const p = P.find((x) => x.id === Number(d.id));
  if (!p) return;
  p.discount = Math.min(90, Math.max(1, Number(d.discount)));
  saveP(P);
  $("#promoModal").classList.add("hidden");
  done("Promo disimpan.");
});

/* ---------- AKSI KLIK ---------- */
function updateBooking(id, fn) {
  const all = books();
  const b = all.find((x) => x.id === id);
  if (b) { fn(b); wr("kontrakinBookings", all); }
  done("Data diperbarui.");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal") && e.target.id !== "login") return e.target.classList.add("hidden");
  const t = e.target.closest("[data-view],[data-act]");
  if (!t) return;
  if (t.dataset.view) return show(t.dataset.view);
  const { act, id, v } = t.dataset;
  const n = Number(id);

  if (act === "menu") $("#sidebar").classList.toggle("open");
  if (act === "close") t.closest(".modal").classList.add("hidden");
  if (act === "add-prop") openProp();
  if (act === "edit-prop") openProp(n);
  if (act === "add-promo") openPromo();
  if (act === "edit-promo") openPromo(n);

  if (act === "del-prop") {
    const P = getP();
    const p = P.find((x) => x.id === n);
    if (p && confirm(`Hapus kontrakan "${p.name}"?`)) {
      saveP(P.filter((x) => x !== p));
      wr("kontrakinFavorites", rd("kontrakinFavorites", []).filter((x) => x !== n));
      done("Kontrakan dihapus.");
    }
  }
  if (act === "del-promo") {
    const P = getP();
    const p = P.find((x) => x.id === n);
    if (p && confirm(`Hapus promo untuk "${p.name}"?`)) { p.discount = 0; saveP(P); done("Promo dihapus."); }
  }
  if (act === "appr") updateBooking(n, (b) => { b.approval = v; if (v === "Ditolak") b.status = "Ditolak"; });
  if (act === "pay") updateBooking(n, (b) => {
    b.status = v === "ok" ? "Pembayaran dikonfirmasi" : "Ditolak";
    b.approval = v === "ok" ? "Diterima" : "Ditolak";
  });
  if (act === "logout") { me = null; localStorage.removeItem("kontrakinAdmin"); gate(); }
});

/* ---------- LOGIN ---------- */
if (!rd("kontrakinAdmins", []).length) wr("kontrakinAdmins", [{ name: "Administrator", email: "admin@kontrakin.com", password: "admin123" }]);

let mode = "login";
function setMode(m) {
  mode = m;
  $$(".reg-only").forEach((el) => el.classList.toggle("hidden", m === "login"));
  $$(".reg-only input").forEach((i) => (i.required = m === "register"));
  $("#loginBtn").textContent = m === "login" ? "Login" : "Buat akun admin";
  $("#switchMode").textContent = m === "login" ? "Belum punya akun? Registrasi" : "Sudah punya akun? Login";
  $("#loginHint").textContent = m === "login" ? "Akun demo: admin@kontrakin.com / admin123" : "Kode akses admin: KONTRAKIN-ADMIN";
}
$("#switchMode").addEventListener("click", () => setMode(mode === "login" ? "register" : "login"));

$("#authForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.currentTarget));
  const all = rd("kontrakinAdmins", []);
  if (mode === "register") {
    if (d.code !== "KONTRAKIN-ADMIN") return toast("Kode akses admin salah.");
    if (all.some((a) => a.email.toLowerCase() === d.email.toLowerCase())) return toast("Email sudah terdaftar.");
    all.push({ name: d.name.trim(), email: d.email.trim(), password: d.password });
    wr("kontrakinAdmins", all);
    setMode("login");
    return toast("Akun dibuat. Silakan login.");
  }
  const u = all.find((a) => a.email.toLowerCase() === d.email.toLowerCase() && a.password === d.password);
  if (!u) return toast("Email atau password salah.");
  me = { name: u.name, email: u.email };
  wr("kontrakinAdmin", me);
  e.currentTarget.reset();
  gate();
  show("dashboard");
});

function gate() {
  $("#login").classList.toggle("hidden", !!me);
  if (me) {
    $("#meName").textContent = me.name;
    $("#meAvatar").textContent = me.name.trim().charAt(0).toUpperCase();
  }
}

// Sinkron otomatis bila data berubah dari tab lain (misalnya website penyewa)
window.addEventListener("storage", () => me && R[cur]());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $$(".modal:not(#login)").forEach((m) => m.classList.add("hidden"));
});

setMode("login");
gate();
show("dashboard");
