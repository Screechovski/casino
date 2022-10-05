import {getIP} from './helper';
import {getUser, setUser, getBets, getMessages} from './db';

const path = require('path');

const error = (data) => ({
  status: 'ERROR',
  data: data
});

const success = (data) => ({
  status: 'SUCCESS',
  data: data
});

export const register = async (req, res) => {
  const ip = getIP(req);
  const {name} = req.body;
  if (!name) {
    return res.json(error({message: 'invalid user name: ' + name}));
  }
  try {
    await setUser(ip, name);
    const user = await getUser((u) => u.ip === ip);
    res.send(success({user}));
  } catch (e) {
    console.log(e);
    res.json(error({message: 'failed to create user', e}));
    return;
  }
};

export const check = async (req, res) => {
  try {
    const ip = getIP(req);
    const user = await getUser((u) => u.ip === ip);
    const id = user ? user.id : null;

    res.json(success({id}));
  } catch (e) {
    console.log(e);
    res.json(error(e));
  }
};

export const bets = async (req, res) => {
  const bets = await getBets();

  res.json(success(bets));
};

export const user = async (req, res) => {
  const {id} = req.body;
  const user = await getUser((i) => i.id == id);

  delete user.ip;

  res.json(success(user));
};

export const messages = async (req, res) => {
  const messages = await getMessages((i) => i.id == id);

  res.json(success(messages));
};

export const index = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.sendFile(path.join(__dirname + '/index.html'));
};

export const js = (req, res) => {
  res.setHeader('Content-Type', 'text/javascript; charset=utf8');
  res.sendFile(path.join(__dirname + '/client.js'));
};
