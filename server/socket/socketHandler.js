import {generateColorsLine, Timer} from '../assets/helper';
import {Messages} from '../db/messages';
import {COLORS_DATA, getColor, getValue} from '../assets/gameRegulations';
import {Bets} from '../db/bets';
import {Users} from '../db/users';

let has = false;
let users = {};
let betsUser = [];
let canBet = true;

let casinoProfit = 0;
let timerTime = null;
export let lastGame = [];

const requestValidator = (anchor, data = {id: null}) => {
  if (data.id === null) throw Error(anchor + ': id is null');
};

export const main = (io) => (socket) => {
  socket.on('USER_CONNECTED', userConnected(io, socket));
  socket.on('disconnect', userDisconnected(io, socket));
  socket.on('USER_BETTING', userBetting(io, socket));
  socket.on('NEW_MESSAGE', userMessage(io, socket));

  if (!has) {
    has = new Timer(
      22000,
      (time) => {
        console.log(time);
        if (time <= 16) timerTime = time;
      },
      () => {
        setTimeout(roll(io), 1000);
        setTimeout(openBets(io), 7000);
      },
      closeBets(io)
    );

    has.start();
  }
};

const userConnected = (io, socket) => (jsonData) => {
  const data = JSON.parse(jsonData);
  console.log('USER_CONNECTED', data);
  requestValidator('userConnected', data);
  users[socket.id] = {
    ...data,
    socketId: socket.id,
    lastGame
  };

  io.to(socket.id).emit('LAST_GAME', JSON.stringify({lastGame}));
  io.to(socket.id).emit('GAME_TIME', JSON.stringify({timerTime}));

  if (canBet) {
    io.to(socket.id).emit('BETS_IS_OPENED');
  } else {
    io.to(socket.id).emit('BETS_IS_CLOSED');
  }

  io.to(socket.id).emit('LAST_GAME', JSON.stringify({lastGame}));

  console.log('USER_CONNECTED', data.name);
};

const userDisconnected = (io, socket) => () => {
  delete users[socket.id];
  console.log('user_disconnected', socket.id);
};

const userMessage = (io) => async (jsonData) => {
  const data = JSON.parse(jsonData);

  console.log('NEW_MESSAGE', {name: data.ownerName, message: data.message});

  io.emit('NEW_MESSAGE', jsonData);

  await Messages.set(data);
};

const roll = (io) => async () => {
  if (Object.values(users).length > 0) {
    const color = getColor(getValue());
    lastGame = generateColorsLine(color);

    console.log('ROLLED:', color);

    await Bets.set(color);

    console.log('betsUser', betsUser);

    for (const bet of betsUser) {
      const win = color === bet.color;
      const multipliedValue = COLORS_DATA[color].multiply(bet.value);

      if (win) {
        const user = await Users.getAll((u) => u.id === users[bet.socketId].id);

        user.balance += multipliedValue;
        casinoProfit -= multipliedValue;

        await Users.update(user.id, user);
      }

      setTimeout(() => {
        io.to(bet.socketId).emit(
          'ROLL_END',
          JSON.stringify({
            win,
            value: win ? multipliedValue : bet.value
          })
        );
      }, 5000);
    }

    setTimeout(() => {
      io.emit('CASINO_PROFIT', JSON.stringify({casinoProfit}));
    }, 6000);

    betsUser = [];

    let wonsHistory = await Bets.get();

    io.emit(
      'ROLLED',
      JSON.stringify({
        color,
        colorsLine: lastGame,
        wonsHistory
      })
    );
  }
};

const openBets = (io) => () => {
  canBet = true;
  console.log('BETS_OPENED');
  io.emit('BETS_OPENED');
};

const closeBets = (io) => () => {
  canBet = false;
  console.log('BETS_CLOSED');
  io.emit('BETS_CLOSED');
};

const userBetting = (io, socket) => async (jsonData) => {
  const data = JSON.parse(jsonData);

  requestValidator('userBetting', data);

  const {color, value} = data;
  const betMan = await Users.getAll((u) => u.id === users[socket.id].id);

  console.log('USER_BETTING', {name: betMan.name, color, value});

  if (value <= betMan.balance) {
    betMan.balance -= value;
    casinoProfit += value;
    betsUser.push({value, color, name: betMan.name, socketId: socket.id});

    io.to(socket.id).emit('UPDATE_BALANCE', JSON.stringify({balance: betMan.balance}));
  } else {
    io.to(socket.id).emit(
      'USER_BETTING_ERROR',
      JSON.stringify({message: 'no money', type: 'red'})
    );
  }

  await Users.update(users[socket.id].id, betMan);
  io.emit('USER_BETTING', JSON.stringify({...users[socket.id], color, value}));
};
