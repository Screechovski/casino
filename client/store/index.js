import {io} from 'socket.io-client';
import {createStore} from 'vuex';
import {ruColorsName} from '../helper/common';
import {API} from '../api';
import {spinner} from './modules/spinner';
import {user} from './modules/user';
import {alerts} from './modules/alerts';
import {auth} from './modules/auth';
import {bet} from './modules/bet';
import {usersBets} from './modules/users-bets';
import {timer} from './modules/timer';
import {chat} from './modules/chat';
const {isProd} = require('../../config');

let socket = null;

export default new createStore({
  namespaced: true,
  modules: {
    spinner,
    user,
    alerts,
    auth,
    bet,
    usersBets,
    timer,
    chat
  },
  state: () => ({
    wonsHistory: [],
    casinoProfit: 0
  }),
  getters: {
    wonsHistory: (s) => s.wonsHistory,
    getCasinoProfit: (s) => s.casinoProfit
  },
  mutations: {
    setWonsHistory(state, wonsHistory) {
      state.wonsHistory = wonsHistory;
    },
    setCasinoProfit: (state, value) => {
      state.casinoProfit = value;
    }
  },
  actions: {
    connect(context, {name, id}) {
      socket = io(isProd ? 'http://dmyavl.ru' : 'http://localhost:3000', {
        path: '/socket.io',
        reconnectionDelayMax: 10000
      });

      socket.on('connect', () => {
        socket.emit('USER_CONNECTED', JSON.stringify({id, name}));

        socket.on('LAST_GAME', (jsonData) => {
          const {lastGame} = JSON.parse(jsonData);

          lastGame.length > 0 &&
            context.dispatch('spinner/setColors', {colorsLine: lastGame});
        });

        socket.on('CASINO_PROFIT', (data) => {
          context.commit('setCasinoProfit', JSON.parse(data).casinoProfit);
        });
        socket.on('BETS_IS_OPENED', () => {
          context.commit('bet/setServerCanBet', true);
        });
        socket.on('BETS_IS_CLOSED', () => {
          context.commit('bet/setServerCanBet', false);
        });
        socket.on('BETS_OPENED', () => {
          context.commit('bet/setServerCanBet', true);
          context.dispatch('timer/setTime');
        });
        socket.on('BETS_CLOSED', () => {
          context.commit('bet/setServerCanBet', false);
        });
        socket.on('ROLLED', (data) => {
          const payload = JSON.parse(data);

          context.dispatch('spinner/startSpin', payload);
          setTimeout(() => context.dispatch('usersBets/cleanAll'), 4900);
        });
        socket.on('USER_BETTING', (jsonData) => {
          const data = JSON.parse(jsonData);
          const {color, name, value: bet} = data;

          context.dispatch('usersBets/addUserBet', {color, name, bet});
        });
        socket.on('ROLL_END', (jsonData) => {
          const data = JSON.parse(jsonData);
          const message = `Вы ${data.win ? 'выиграли ' : 'проиграли'} ${data.value}`;

          context.dispatch('alerts/addAlert', {
            message,
            type: data.win ? 'green' : 'red'
          });
          if (data.win) context.dispatch('bet/addBalance', data.value);
        });
        socket.on('USER_BETTING_ERROR', (jsonData) => {
          const data = JSON.parse(jsonData);
          context.dispatch('alerts/addAlert', {
            message: data.message,
            type: 'red'
          });
        });
        socket.on('UPDATE_BALANCE', (jsonData) => {
          const data = JSON.parse(jsonData);
          context.dispatch('bet/setBalance', data.balance);
        });
        socket.on('GAME_TIME', (jsonData) => {
          const data = JSON.parse(jsonData);
          context.dispatch('timer/setTime', data.timerTime);
        });
        socket.on('NEW_MESSAGE', (jsonData) => {
          const data = JSON.parse(jsonData);
          context.dispatch('chat/addMessage', data);
        });
      });
    },
    async getBets(context) {
      const {bets} = await API.getBets(context.rootGetters['user/id']);

      context.commit('setWonsHistory', bets);
    },
    async sendBet(context, color) {
      const value = context.rootGetters['bet/bettingValue'];

      if (value !== 0) {
        const message = `Вы поставили ${value} на ${ruColorsName(color)}`;

        socket.emit(
          'USER_BETTING',
          JSON.stringify({
            id: context.rootState.user.id,
            color,
            value
          })
        );
        context.dispatch('alerts/addAlert', {message, type: 'green'});
      }
    },
    spinningEnd(context) {
      context.dispatch('getBets');
    },
    sendSocketMessage: (context, message) => {
      socket.emit(
        'NEW_MESSAGE',
        JSON.stringify({
          timestamp: new Date().getTime(),
          message,
          ownerId: context.rootState.user.id,
          ownerName: context.rootState.user.name,
          socketId: socket.id
        })
      );
    }
  }
});
