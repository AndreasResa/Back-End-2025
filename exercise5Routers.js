const express = require("express");
const routers = express.Router();
const users = require("./users");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

routers.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Masukkan data yang akan diubah" });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);

  res.status(200).json({
    message: "User berhasil ditambahkan",
    data: newUser,
  });
});

// download
routers.get("/assets", (req, res) => {
  const filename = "logofik.png";
  res.sendFile(path.join(__dirname + "/assets/" + filename), {
    headers: {
      "Content-Disposition": 'attachment; filename="logofik-photo.png"',
    },
  });
});

// post upload
const imageFilter = (req, res, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};
const upload = multer({ dest: "public", imageFilter });

routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send("file berhasil diupload");
  } else {
    res.send("file gagal diuplaod");
  }
});

// put. edit berdasarkan nama
routers.put("/users/:name", (req, res) => {
  const { name: newName } = req.body;
  const userName = req.params.name.toLocaleLowerCase();

  if (!newName) {
    return res.status(400).json({
      message: "User tidak memasukan data pada request body",
    });
  }

  const user = users.find((u) => u.name.toLowerCase() === userName);

  if (!user) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }
  user.name = newName;

  res.status(200).json({
    message: "User berhasil diperbarui",
    data: user,
  });
});

// delete
routers.delete("/users/:name", (req, res) => {
  const userName = req.params.name.toLowerCase();
  const userIndex = users.findIndex((u) => u.name.toLowerCase() === userName);

  const deleteUser = users.splice(userIndex, 1)[0];

  res.status(200).json({
    message: "User berhasil dihapus",
    data: deleteUser,
  });
});
