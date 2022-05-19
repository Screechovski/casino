import { bets, checkProxy, register } from './route-handler';
import { main } from './socket-helper';
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http');
const app = express()
const { Server  } = require("socket.io");

const server = http.createServer(app);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/check', checkProxy)
app.post('/register', register)
app.get('/bets', bets)


server.listen(3000, () => console.log('Example app listening on port 3000'))

const io = new Server(server);
io.on('connection', main(io));
