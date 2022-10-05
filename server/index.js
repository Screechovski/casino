import {isProd} from '../config';
import {router} from './router/router';
import {main} from './socket/socketHandler';

const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const app = express();
const {Server} = require('socket.io');

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use(isProd ? '/casino' : '', router);

app.get('/*', (req, res) => {
  console.log(req.originalUrl, __dirname);
  try {
    if (/\.(js|css|jpe?g|png|webp|svg)$/i.test(req.originalUrl)) {
      res.sendFile(path.join(__dirname, `/public${req.originalUrl}`));
    } else {
      res.sendFile(path.join(__dirname, '/index.html'));
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
});

server.listen(3000, () => console.log('Example app listening on port 3000'));

const io = new Server(server);
io.on('connection', main(io));
