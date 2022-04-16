// const fs = require("fs");
const express = require('express')
const path = require('path')
const app = express()
const { bet, register, check, bets } = require('./server/routeHandler');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.get('/', (req, res) => {
//     res.setHeader("Content-Type", "text/html; charset=utf8");
//     res.send(index);
// })

app.get('/check', check)
app.post('/register', register)
app.post('/bet', bet)
app.get('/bets', bets)
app.listen(3000, () => console.log('Example app listening on port 3000'))