const express = require('express');
const app = express();
const mysql = require('mysql');

let mySqlClient = mysql.createConnection({
    host : '10.34.6.142:8888',
    user : 'root',
    password: ''
})

app.post('/login')


app.listen(4242, '10.34.6.142')