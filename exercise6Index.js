const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const morgan = require("morgan");
// const errorhandler = require("errorhandler");
const app = express();
const routers = require("./routers");
const path = require("path");
const cors = require("cors");


app.use(morgan("tiny"));
// app.use(errorhandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//Routing
app.use(routers);

// middleware cors
app.use(
    cors({
      origin: "http://127.0.0.1:5500",
    })
  );

app.use(express.json());

app.use(routers);
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
  console.log(`Server running at http://${hostname}:${port}`)
);

