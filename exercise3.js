const moment = require('moment');
const user = require('./user');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.status(200).json({
    message: 'This is the home page'
}))

app.get('/about', (req, res) => res.status(200).json({
    status: 'success',
    message: 'response success',
    description: 'exercise #3',
    date: moment().format('MMMM Do YYYY, h:mm:ss a')
}))

app.get('/users', (req, res) => res.status(200).json(user))



const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, ()=>console.log(`Server running at http://localhost:${port}`));


