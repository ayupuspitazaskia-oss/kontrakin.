// Penghubung data website penyewa & admin ke server (server.js).
// Bila dibuka langsung dari file (tanpa server), data tetap lokal di browser.
(() => {
  if (!/^https?:$/.test(location.protocol)) return;

  const KEYS = ["kontrakinProperties", "kontrakinUsers", "kontrakinBookings"];
  const API = "/api/data";
  const rawSet = Storage.prototype.setItem;
  let pending = 0;

  const notify = (keys) =>
    window.dispatchEvent(new CustomEvent("kontrakin-sync", { detail: { keys } }));

  // Simpan data server ke localStorage; kembalikan daftar key yang berubah
  function applyData(data) {
    const changed = [];
    KEYS.forEach((k) => {
      if (data[k] == null) return;
      const s = JSON.stringify(data[k]);
      if (localStorage.getItem(k) !== s) {
        rawSet.call(localStorage, k, s);
        changed.push(k);
      }
    });
    return changed;
  }

  function push(k, v) {
    pending++;
    fetch(`${API}/${k}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: v })
      .then((r) => r.json())
      .then((merged) => {
        const ch = applyData({ [k]: merged });
        if (ch.length) notify(ch);
      })
      .catch(() => {})
      .finally(() => pending--);
  }

  // Ambil data terbaru dari server sebelum website mulai berjalan
  try {
    const x = new XMLHttpRequest();
    x.open("GET", API, false);
    x.send();
    if (x.status === 200) {
      const data = JSON.parse(x.responseText);
      applyData(data);
      KEYS.forEach((k) => {
        const local = localStorage.getItem(k);
        if (data[k] == null && local) push(k, local); // kirim data lokal lama ke server
      });
    }
  } catch {}

  // Setiap perubahan data bersama langsung dikirim ke server
  Storage.prototype.setItem = function (k, v) {
    rawSet.call(this, k, v);
    if (this === localStorage && KEYS.includes(k)) push(k, v);
  };

  // Cek pembaruan dari pengguna lain setiap 2,5 detik
  setInterval(() => {
    if (pending || document.hidden) return;
    fetch(API, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (pending) return;
        const ch = applyData(d);
        if (ch.length) notify(ch);
      })
      .catch(() => {});
  }, 2500);
})();
