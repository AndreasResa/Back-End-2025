const http = require("http");
const express = require("express");
const app = express();
const moment = require("moment");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const { users } = require("./users");

//Middleware
app.use(morgan("tiny"));

//Semua user
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

//User tertentu
app.get("/users/:name", (req, res) => {
  const { name } = req.params;
  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );

  if (!user) {
    return res.status(404).json({
      message: "Data user tidak ditemukan",
    });
  }

  res.status(200).json(user);
});

// Menangani routing 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

// Error server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

app.use(errorhandler());

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});