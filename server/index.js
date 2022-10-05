import {bets, check, index, register, user, js, messages} from './route-handler';
import {main} from './socket-helper';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const {Server} = require('socket.io');

const server = http.createServer(app);

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get(['/casino', '/casino/hero', '/casino/game'], index);
app.get('/casino/client.js', js);
app.get('/casino/check', check);
app.post('/casino/register', register);
app.post('/casino/bets', bets);
app.post('/casino/user', user);
app.get('/casino/messages', messages);

app.get('/*', (req, res) => {
  try {
    if (/\.(js|css|jpe?g|png|webp|json)$/i.test(req.originalUrl)) {
      res.sendFile(path.join(__dirname, `/public${req.originalUrl}`));
    } else {
      res.sendFile(path.join(__dirname, '/public/build/index.html'));
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '/public/build/index.html'));
  }
});

server.listen(3000, () => console.log('Example app listening on port 3000'));

const io = new Server(server);
io.on('connection', main(io));
