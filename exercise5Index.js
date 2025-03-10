const http = require("http");
const express = require("express");
const moment = require("moment");
const users = require("./users");
const morgan = require("morgan");
const app = express();
const path = require("path");
const cors = require("cors");
const routers = require("./routers");

// middleware morgan
app.use(morgan("tiny"));

// middleware untuk akses program file statik di folder public
app.use(express.static(path.join(__dirname, "public")));

// middleware body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

// get semua users
app.get("/users", (req, res) => res.status(200).json(users));
// get users berdasarkan nama
app.get("/users/:name", (req, res) => {
  const userName = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === userName);

  // error data tidak ada
  if (!user) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }
  res.status(200).json(user);
});
app.use(express.json());

// menghubungkan file routers.js untuk menangani request
app.use(routers);

// middleware untuk 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});
// middleware error handling (500)
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://localhost:${port}`)
);

