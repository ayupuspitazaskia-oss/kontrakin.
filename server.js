// Server Kontrakin: melayani file website + menyimpan data bersama (data.json)
// Jalankan: node server.js  →  buka http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const DIR = __dirname;
const DB = path.join(DIR, "data.json");

// Data yang dibagi antara website penyewa dan admin
const KEYS = ["kontrakinProperties", "kontrakinUsers", "kontrakinBookings"];
// Daftar yang digabung (tidak saling menimpa) berdasarkan pengenal unik
const UNIQUE = {
  kontrakinUsers: (u) => String(u.email).toLowerCase(),
  kontrakinBookings: (b) => b.id,
};
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

let db = {};
try { db = JSON.parse(fs.readFileSync(DB, "utf8")); } catch {}
const save = () => fs.writeFileSync(DB, JSON.stringify(db, null, 2));

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const send = (code, body, type = "application/json") => {
      res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
      res.end(body);
    };

    // --- API data ---
    if (url.pathname === "/api/data" && req.method === "GET") {
      return send(200, JSON.stringify(db));
    }
    const m = url.pathname.match(/^\/api\/data\/(\w+)$/);
    if (m && req.method === "PUT") {
      const key = m[1];
      if (!KEYS.includes(key)) return send(400, '{"error":"key tidak dikenal"}');
      let body = "";
      req.on("data", (c) => {
        body += c;
        if (body.length > 5e6) req.destroy();
      });
      req.on("end", () => {
        try {
          let val = JSON.parse(body);
          const id = UNIQUE[key];
          if (id && Array.isArray(val)) {
            const map = new Map((db[key] || []).map((i) => [id(i), i]));
            val.forEach((i) => map.set(id(i), i));
            val = [...map.values()];
          }
          db[key] = val;
          save();
          send(200, JSON.stringify(val));
        } catch {
          send(400, '{"error":"data tidak valid"}');
        }
      });
      return;
    }

    // --- File website ---
    let p = decodeURIComponent(url.pathname);
    if (p === "/") p = "/k0ntrakin2.html";
    const file = path.join(DIR, p);
    const ext = path.extname(file).toLowerCase();
    if (!file.startsWith(DIR) || !MIME[ext] || path.basename(file) === "server.js") {
      return send(404, "Tidak ditemukan", "text/plain");
    }
    fs.readFile(file, (e, d) => (e ? send(404, "Tidak ditemukan", "text/plain") : send(200, d, MIME[ext])));
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log("\nKontrakin berjalan.");
    console.log(`  Penyewa : http://localhost:${PORT}/k0ntrakin2.html`);
    console.log(`  Admin   : http://localhost:${PORT}/k0ntrakin2-admin.html`);
    Object.values(os.networkInterfaces()).flat().filter((i) => i.family === "IPv4" && !i.internal)
      .forEach((i) => console.log(`  Jaringan: http://${i.address}:${PORT}/k0ntrakin2.html`));
    console.log("\nTekan Ctrl+C untuk berhenti.\n");
  });
