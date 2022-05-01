const express = require('express')
const path = require('path')
const { register, check, bets } = require('./route-handler');
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const app = express()
const { Server } = require("socket.io");
const { main } = require('./socket-helper');


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

io.on('connection', main(io));


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/check', check)
app.post('/register', register)
app.get('/bets', bets)
server.listen(3000, () => console.log('Example app listening on port 3000'))