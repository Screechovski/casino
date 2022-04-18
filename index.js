const express = require('express')
const path = require('path')
const { bet, register, check, bets } = require('./server/route-handler');
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const app = express()
const { Server } = require("socket.io");
const { userOnline } = require('./server/socket-helper');
const { getValue, getColor } = require('./server/game-regulations');
const { generateColorsLine } = require('./server/helper');

let hasSpinner = false;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log('new connection', socket.id);

    socket.on("user_connected", console.log)
    socket.on("disconnect", (data) => console.log(data, "user_disconnected"))

    if (!hasSpinner) {
        setInterval(()=> {
            const color = getColor(getValue());
            io.emit("ROLLED", JSON.stringify({
                color,
                colorsLine: generateColorsLine(color)
            }));
        }, 20000)
        hasSpinner = true;
    }
});


app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/check', check)
app.post('/register', register)
app.post('/bet', bet)
app.get('/bets', bets)
server.listen(3000, () => console.log('Example app listening on port 3000'))