import {router} from './router/router';
import {main} from './socket/socketHandler';
import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
const {isProd} = require('../config');

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

app.use(isProd ? '/casino' : '', router);

server.listen(3000, () => console.log('Example app listening on port 3000'));

const io = new Server(server);
io.on('connection', main(io));
