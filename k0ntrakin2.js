// DATA 10 KONTRAKAN
const defaultProperties = [
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

// Data kontrakan dibaca dari localStorage (diubah oleh admin); bila kosong pakai data awal
const properties = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem("kontrakinProperties"));
    if (Array.isArray(saved)) return saved;
  } catch {}
  return defaultProperties.map((p) => ({ ...p }));
})();

// FUNGSI DASAR
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const money = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const discounted = (p) => Math.round(p.price * (1 - p.discount / 100));

const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

let currentUser = get("kontrakinUser");
let activePage = "home";
let searchPage = 0;
let searchResults = [...properties];
let selectedProperty = null;
let toastTimer;

// FUNGSI MENGAMANKAN TEKS
function escapeHTML(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

// NOTIFIKASI
function toast(message) {
  const el = $("#toast");

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2600);
}

// DATA FAVORIT
function favorites() {
  return get("kontrakinFavorites") || [];
}

function setFavorites(value) {
  set("kontrakinFavorites", value);
}

// DATA PENYEWAAN
function bookings() {
  return get("kontrakinBookings") || [];
}

function setBookings(value) {
  set("kontrakinBookings", value);
}

// UPDATE TAMPILAN LOGIN DAN PROFIL
function updateAuthUI() {
  $$(".guest-only").forEach((el) => {
    el.classList.toggle("hidden", !!currentUser);
  });

  $$(".tenant-only").forEach((el) => {
    el.classList.toggle("hidden", !currentUser);
  });

  if (currentUser) {
    const initial = (currentUser.name || "P").trim().charAt(0).toUpperCase();

    $("#profileAvatar").textContent = initial;
    $("#profileLargeAvatar").textContent = initial;

    $("#profileName").textContent = currentUser.name.split(" ")[0];

    $("#menuUserName").textContent = currentUser.name;

    $("#menuUserEmail").textContent = currentUser.email;

    $("#profileFullName").textContent = currentUser.name;

    $("#profileFullEmail").textContent = currentUser.email;

    $("#profileDetailName").textContent = currentUser.name;

    $("#profileDetailEmail").textContent = currentUser.email;
  }

  // Segarkan kartu agar tombol "Sewa" / "Login untuk sewa" selalu sesuai
  renderFeatured();
  if (activePage === "search") renderSearch();
  if (activePage === "promo") renderPromos();
  if (activePage === "favorites") renderFavorites();

  if (activePage === "favorites" && !currentUser) {
    showPage("home");
  }
}

// PINDAH HALAMAN NAVBAR
function showPage(name) {
  // Halaman khusus pengguna login
  if (
    ["favorites", "payment", "profile", "rent"].includes(name) &&
    !currentUser
  ) {
    openAuth("login");
    toast("Silakan registrasi dan login untuk melanjutkan.");
    return;
  }

  activePage = name;

  $$(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const target = $("#page-" + name);

  if (target) {
    target.classList.add("active");
  }

  $$(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === name);
  });

  $("#mainNav").classList.remove("open");
  $("#profileMenu").classList.add("hidden");

  if (name === "favorites") renderFavorites();
  if (name === "payment") renderPayments();
  if (name === "profile") updateAuthUI();
  if (name === "search") renderSearch();
  if (name === "promo") renderPromos();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// MEMBUAT KARTU KONTRAKAN
function propertyCard(p) {
  const saved = favorites().includes(p.id);
  const price = discounted(p);

  return `
    <article class="property-card">

      <div class="property-photo">
        <img
          src="${escapeHTML(p.image)}"
          alt="${escapeHTML(p.name)}"
          onerror="this.style.display='none'"
        >

        ${
          p.discount
            ? `<span class="photo-label">SALE ${p.discount}%</span>`
            : ""
        }

        <button
          class="favorite-btn ${saved ? "saved" : ""}"
          data-action="favorite"
          data-id="${p.id}"
          aria-label="Simpan favorit"
        >
          ${saved ? "♥" : "♡"}
        </button>

      </div>

      <div class="property-body">

        <div class="property-location">
          ⌖ ${escapeHTML(p.area)}
        </div>

        <h3 class="property-title">
          ${escapeHTML(p.name)}
        </h3>

        <div class="property-meta">
          <span>▣ ${p.rooms} kamar</span>
          <span>♧ ${p.baths} kamar mandi</span>
          <span>${escapeHTML(p.size)}</span>
        </div>

        <div class="price-row">

          <div class="price">

            ${
              p.discount
                ? `<span class="old-price">${money(p.price)}</span>`
                : ""
            }

            ${money(price)}

            <small>/ bulan</small>

          </div>

          ${p.discount ? `<span class="discount">-${p.discount}%</span>` : ""}

        </div>

        <div class="card-actions">

          <button
            class="btn btn-outline"
            data-action="detail"
            data-id="${p.id}"
          >
            Lihat detail
          </button>

          ${
            currentUser
              ? `<button
                  class="btn btn-primary"
                  data-action="rent"
                  data-id="${p.id}"
                >
                  Sewa sekarang
                </button>`
              : `<button
                  class="btn btn-primary"
                  data-action="open-auth"
                  data-mode="login"
                >
                  Login untuk sewa
                </button>`
          }

        </div>

      </div>
    </article>
  `;
}

// KONTRAKAN BERANDA
function renderFeatured() {
  $("#homeFeatured").innerHTML = properties
    .slice(0, 3)
    .map(propertyCard)
    .join("");
}

// PENCARIAN DAN SLIDE 5 KONTRAKAN
function renderSearch() {
  const q = ($("#searchInput").value || "").toLowerCase().trim();

  const area = $("#areaFilter").value;
  const sort = $("#sortFilter").value;

  searchResults = properties.filter(
    (p) =>
      (p.name + " " + p.area).toLowerCase().includes(q) &&
      (!area || p.area === area),
  );

  if (sort === "low") {
    searchResults.sort((a, b) => discounted(a) - discounted(b));
  }

  if (sort === "high") {
    searchResults.sort((a, b) => discounted(b) - discounted(a));
  }

  const totalPages = Math.max(1, Math.ceil(searchResults.length / 5));

  searchPage = Math.min(searchPage, totalPages - 1);

  $("#resultCount").textContent = `${searchResults.length} kontrakan ditemukan`;

  $("#slideLabel").textContent = `${searchPage + 1} / ${totalPages}`;

  $("#prevSlide").disabled = searchPage === 0;

  $("#nextSlide").disabled = searchPage >= totalPages - 1;

  $("#searchGrid").innerHTML =
    searchResults
      .slice(searchPage * 5, searchPage * 5 + 5)
      .map(propertyCard)
      .join("") ||
    `
      <div class="empty-state" style="grid-column:1/-1">
        <h3>Kontrakan tidak ditemukan</h3>
        <p>Coba kata kunci atau daerah lainnya.</p>
      </div>
    `;
}

// HALAMAN FAVORIT
function renderFavorites() {
  const items = properties.filter((p) => favorites().includes(p.id));

  $("#favoritesGrid").innerHTML = items.map(propertyCard).join("");

  $("#emptyFavorites").classList.toggle("hidden", items.length > 0);
}

// HALAMAN PROMO
function renderPromos() {
  const items = properties.filter((p) => p.discount > 0);

  $("#promoGrid").innerHTML = items.map(propertyCard).join("");
}

// DETAIL KONTRAKAN
function openDetail(id) {
  const p = properties.find((x) => x.id === Number(id));

  if (!p) return;

  selectedProperty = p;

  $("#detailContent").innerHTML = `

    <div class="detail-visual"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" onerror="this.style.display='none'"></div>

    <div class="property-location">
      ⌖ ${escapeHTML(p.area)}
    </div>

    <h2>${escapeHTML(p.name)}</h2>

    <p>${escapeHTML(p.desc)}</p>

    <div class="detail-facts">
      <span>▣ ${p.rooms} kamar tidur</span>
      <span>♧ ${p.baths} kamar mandi</span>
      <span>${escapeHTML(p.size)}</span>
    </div>

    <div class="detail-price">
      ${money(discounted(p))} / bulan

      ${p.discount ? `<span class="discount">Diskon ${p.discount}%</span>` : ""}
    </div>

    <p>
      ${
        p.discount
          ? `Harga awal ${money(p.price)}.
             Potongan ${p.discount}% =
             ${money(p.price - discounted(p))}.`
          : "Harga sesuai informasi kontrakan."
      }
    </p>

    <div class="card-actions">

      <button
        class="btn btn-outline"
        data-action="favorite"
        data-id="${p.id}"
      >
        ${favorites().includes(p.id) ? "♥ Hapus favorit" : "♡ Tambah favorit"}
      </button>

      <button
        class="btn btn-primary"
        data-action="rent"
        data-id="${p.id}"
      >
        Ajukan sewa
      </button>

    </div>
  `;

  $("#detailModal").classList.remove("hidden");
}

// FORMULIR PENGAJUAN SEWA
function openRent(id) {
  if (!currentUser) {
    openAuth("login");
    toast("Login terlebih dahulu untuk mengajukan sewa.");
    return;
  }

  const p = properties.find((x) => x.id === Number(id));

  if (!p) return;

  selectedProperty = p;

  $("#rentPropertySummary").innerHTML = `

    <div class="rent-summary">

      <div class="mini-photo"><img src="${escapeHTML(p.image)}" alt="" onerror="this.style.display='none'"></div>

      <div>
        <h3>${escapeHTML(p.name)}</h3>

        <p>${escapeHTML(p.area)}</p>

        <strong>
          ${money(discounted(p))} / bulan
        </strong>
      </div>

    </div>
  `;

  $("#rentName").value = currentUser.name;
  $("#rentEmail").value = currentUser.email;

  $("#rentForm").dataset.propertyId = p.id;
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  $("#rentForm [name=startDate]").min = today;

  $("#detailModal").classList.add("hidden");

  showPage("rent");
}

// MODAL REGISTRASI DAN LOGIN
function openAuth(mode = "register") {
  $("#detailModal").classList.add("hidden");
  $("#authModal").classList.remove("hidden");

  setAuthTab(mode);
}

function setAuthTab(mode) {
  const register = mode === "register";

  $("#registerForm").classList.toggle("hidden", !register);

  $("#loginForm").classList.toggle("hidden", register);

  $$(".auth-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === mode);
  });

  $("#authTitle").textContent = register
    ? "Buat akun Kontrakin"
    : "Login ke Kontrakin";

  $("#authSubtitle").textContent = register
    ? "Daftar terlebih dahulu untuk menggunakan fitur penyewa."
    : "Masuk menggunakan akun yang sudah terdaftar.";
}

// MENAMPILKAN PEMBAYARAN
function renderPayments() {
  const list = bookings();

  const pending = list.find(
    (b) =>
      b.userEmail === currentUser.email && b.status === "Menunggu registrasi pembayaran",
  );

  if (pending) {
    $("#paymentContent").innerHTML = `

      <div class="payment-summary">

        <h3>${escapeHTML(pending.propertyName)}</h3>

        <p>
          ${escapeHTML(pending.area)}
          ·
          ${escapeHTML(pending.duration)}
        </p>

        <div class="payment-total">
          ${money(pending.total)}
        </div>

        <small>
          Nominal sesuai harga bulanan × durasi
          yang dipilih (bulan).
        </small>

      </div>

      <form class="form-card payment-form" id="paymentForm">

        <h2>Registrasi pembayaran</h2>

        <label>Nama penyewa
          <input value="${escapeHTML(pending.name)}" readonly>
        </label>

        <label>Metode pembayaran
          <select name="method" required>
            <option value="">Pilih metode</option>
            <option>Transfer bank (simulasi)</option>
            <option>QRIS (simulasi)</option>
            <option>Tunai melalui pengelola (simulasi)</option>
          </select>
        </label>

        <label>Nama pengirim
          <input
            name="sender"
            required
            placeholder="Nama pada bukti pembayaran"
          >
        </label>

        <label>Catatan / nomor referensi (opsional)
          <textarea
            name="reference"
            rows="2"
            placeholder="Isi jika ada"
          ></textarea>
        </label>

        <div class="form-note">
          Ini hanya pencatatan pembayaran untuk prototype.
          Website belum terhubung ke bank, QRIS, atau
          payment gateway dan tidak memproses uang sungguhan.
        </div>

        <button class="btn btn-primary full-button" type="submit">
          Simpan registrasi pembayaran
        </button>

      </form>
    `;
  } else {
    $("#paymentContent").innerHTML = `

      <div class="empty-state">

        <div>▤</div>

        <h3>Belum ada pembayaran yang perlu dicatat</h3>

        <p>
          Ajukan sewa kontrakan terlebih dahulu.
          Setelah pengajuan, formulir pembayaran
          akan tersedia di halaman ini.
        </p>

        <button class="btn btn-primary" data-page="search">
          Cari kontrakan
        </button>

      </div>
    `;
  }

  // RIWAYAT PEMBAYARAN
  const mine = list.filter((b) => b.userEmail === currentUser.email);

  $("#historyList").innerHTML = mine.length
    ? mine
        .map(
          (b) => `

      <div class="history-item">

        <div>
          <strong>${escapeHTML(b.propertyName)}</strong>

          <small>
            ${escapeHTML(b.createdAt)}
            ·
            ${escapeHTML(b.duration)}
            ${b.method ? " · " + escapeHTML(b.method) : ""}
          </small>

          <small>${money(b.total)}</small>
        </div>

        <span class="status ${
          /dicatat|dikonfirmasi/.test(b.status) ? "success" : b.status === "Ditolak" ? "rejected" : ""
        }">
          ${escapeHTML(b.status)}
        </span>

      </div>

    `,
        )
        .join("")
    : `
      <p style="font-size:12px;color:var(--muted)">
        Belum ada riwayat pengajuan.
      </p>
    `;
}

// EVENT KLIK WEBSITE
document.addEventListener("click", (e) => {
  const page = e.target.closest("[data-page]");

  if (page) {
    e.preventDefault();
    showPage(page.dataset.page);
    return;
  }

  const action = e.target.closest("[data-action]");

  if (action) {
    const a = action.dataset.action;
    const id = action.dataset.id;

    if (a === "open-auth") {
      openAuth(action.dataset.mode || "register");
    }

    if (a === "close-auth") {
      $("#authModal").classList.add("hidden");
    }

    if (a === "close-detail") {
      $("#detailModal").classList.add("hidden");
    }

    if (a === "detail") {
      openDetail(id);
    }

    if (a === "rent") {
      openRent(id);
    }

    // TAMBAH DAN HAPUS FAVORIT
    if (a === "favorite") {
      if (!currentUser) {
        openAuth("login");
        toast("Login terlebih dahulu untuk menyimpan favorit.");
        return;
      }

      const arr = favorites();
      const n = Number(id);

      const updated = arr.includes(n)
        ? arr.filter((x) => x !== n)
        : [...arr, n];

      setFavorites(updated);

      toast(
        arr.includes(n) ? "Dihapus dari favorit." : "Ditambahkan ke favorit.",
      );

      renderFeatured();

      if (activePage === "search") renderSearch();
      if (activePage === "favorites") renderFavorites();
      if (activePage === "promo") renderPromos();

      if (!$("#detailModal").classList.contains("hidden") && selectedProperty) {
        openDetail(selectedProperty.id);
      }
    }

    // LOGOUT
    if (a === "logout") {
      currentUser = null;

      localStorage.removeItem("kontrakinUser");

      updateAuthUI();

      showPage("home");

      toast("Kamu berhasil logout.");
    }
  }

  const tab = e.target.closest("[data-auth-tab]");

  if (tab) {
    setAuthTab(tab.dataset.authTab);
  }
});

// REGISTRASI AKUN (disimpan di localStorage browser)
$("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));

  const users = get("kontrakinUsers") || [];

  const exists = users.some(
    (u) => u.email.toLowerCase() === data.email.toLowerCase(),
  );

  if (exists) {
    toast("Email sudah terdaftar. Silakan login.");
    setAuthTab("login");
    return;
  }

  users.push({
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password,
  });

  set("kontrakinUsers", users);

  e.currentTarget.reset();

  setAuthTab("login");

  $("#loginForm [name=email]").value = data.email;

  toast("Registrasi berhasil. Silakan login dengan akunmu.");
});
// LOGIN AKUN
$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));

  const users = get("kontrakinUsers") || [];

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === data.email.toLowerCase() &&
      u.password === data.password,
  );

  if (!user) {
    toast(
      "Email atau password tidak sesuai. Registrasi dahulu jika belum punya akun.",
    );
    return;
  }

  currentUser = {
    name: user.name,
    email: user.email,
  };

  set("kontrakinUser", currentUser);

  $("#authModal").classList.add("hidden");

  updateAuthUI();

  toast("Login berhasil. Selamat datang, " + user.name + "!");

  showPage("home");
});

// PENGAJUAN SEWA
$("#rentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentUser) return;

  const data = Object.fromEntries(new FormData(e.currentTarget));

  const p = properties.find(
    (x) => x.id === Number(e.currentTarget.dataset.propertyId),
  );

  if (!p) {
    toast("Pilih kontrakan terlebih dahulu.");
    return;
  }

  const months = parseInt(data.duration);

  const booking = {
    id: Date.now(),
    userEmail: currentUser.email,
    name: data.name,
    phone: data.phone,
    propertyId: p.id,
    propertyName: p.name,
    area: p.area,
    duration: data.duration,
    total: discounted(p) * months,
    startDate: data.startDate,
    notes: data.notes,
    createdAt: new Date().toLocaleDateString("id-ID"),
    status: "Menunggu registrasi pembayaran",
    method: "",
  };

  const all = bookings();
  all.push(booking);
  setBookings(all);
  e.currentTarget.reset();

  toast("Pengajuan sewa berhasil dicatat. Lanjutkan registrasi pembayaran.");

  showPage("payment");
});

// REGISTRASI PEMBAYARAN
document.addEventListener("submit", (e) => {
  if (e.target.id === "paymentForm") {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const all = bookings();

    const item = all.find(
      (b) =>
        b.userEmail === currentUser.email && b.status === "Menunggu registrasi pembayaran",
    );

    if (!item) return;

    item.method = data.method;
    item.sender = data.sender;
    item.reference = data.reference;

    item.status = "Pembayaran dicatat";

    setBookings(all);

    toast("Registrasi pembayaran berhasil disimpan.");

    renderPayments();
  }
});

// PENCARIAN KONTRAKAN
$("#searchInput").addEventListener("input", () => {
  searchPage = 0;
  renderSearch();
});

// FILTER DAERAH
$("#areaFilter").addEventListener("change", () => {
  searchPage = 0;
  renderSearch();
});

// URUTKAN HARGA
$("#sortFilter").addEventListener("change", () => {
  searchPage = 0;
  renderSearch();
});

// SLIDE SEBELUMNYA
$("#prevSlide").addEventListener("click", () => {
  if (searchPage > 0) {
    searchPage--;
    renderSearch();
  }
});

// SLIDE BERIKUTNYA
$("#nextSlide").addEventListener("click", () => {
  if (searchPage < Math.ceil(searchResults.length / 5) - 1) {
    searchPage++;
    renderSearch();
  }
});

// MENU RESPONSIVE
$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});

// MENU PROFIL
$("#profileButton").addEventListener("click", () => {
  $("#profileMenu").classList.toggle("hidden");

  $("#profileButton").setAttribute(
    "aria-expanded",
    !$("#profileMenu").classList.contains("hidden"),
  );
});

// TUTUP MENU PROFIL JIKA KLIK DI LUAR
document.addEventListener("click", (e) => {
  if (!e.target.closest("#profileWrap")) {
    $("#profileMenu").classList.add("hidden");
  }
});

// FILTER DAERAH OTOMATIS
const areas = [...new Set(properties.map((p) => p.area))];

areas.forEach((area) => {
  const option = document.createElement("option");

  option.value = area;
  option.textContent = area;

  $("#areaFilter").append(option);
});

// MENJALANKAN WEBSITE
renderFeatured();
renderSearch();
updateAuthUI();

// TUTUP MODAL DENGAN KLIK AREA GELAP ATAU TOMBOL ESC
$$(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.classList.add("hidden");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $$(".modal-backdrop").forEach((m) => m.classList.add("hidden"));
    $("#profileMenu").classList.add("hidden");
  }
});
