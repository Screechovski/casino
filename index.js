const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const { hasUser, setUser } = require('./server/db');
const { getIP } = require('./server/helper');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/check', (req, res) => {
    const ip = getIP(req);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ status: "SUCCESS", data: { ip, user: hasUser(ip) } }));
})

app.post('/register', (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    res.setHeader("Content-Type", "application/json");
    if (!name) {
        res.send(JSON.stringify({ status: "ERROR" }));
    } else {
        setUser(ip, name);
        res.send(JSON.stringify({ status: "SUCCESS", data: { ip, name, balance: 1000 } }));
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

