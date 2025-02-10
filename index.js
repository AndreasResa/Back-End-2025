const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const app = express();

app.get('/', (req, res) => res.send('Hello World'));
app.get('/about', (req, res) => res.status(200).json({
  status: "success",
  message: "About Page",
  date:[]
}));
app.post('/contoh', (req, res) => res.send('request method post'))
app.put('/contoh', (req, res) => res.send('request method put'))
app.delete('/contoh', (req, res) => res.send('request method delete'))
app.patch('/contoh', (req, res) => res.send('request method patch'))

app.all('/universal', (req, res) => res.send(`request method ${req.method}`))

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
