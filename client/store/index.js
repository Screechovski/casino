import { io } from "socket.io-client";
import spinner from "./spinner"
import user from "./user"
import alerts from "./alerts"
import auth from "./auth"
import bet from "./bet"
import usersBets from "./users-bets"
import timer from "./timer"
import chat from "./chat"
import { createStore } from 'vuex'
import { isProduction, ruColorsName } from "../helper/common";

const url = uri => "/casino" + uri;

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
        casinoProfit: 0,
    }),
    getters: {
        wonsHistory: s => s.wonsHistory,
        getCasinoProfit: s => s.casinoProfit,
    },
    mutations: {
        setWonsHistory(state, wonsHistory) {
            state.wonsHistory = wonsHistory
        },
        setCasinoProfit: (state, value) => {
            state.casinoProfit = value;
        }
    },
    actions: {
        connect(context, { name, id }) {
            socket = io(isProduction ? "http://dmyavl.ru" : "http://localhost:3000", {
                path: '/socket.io',
                reconnectionDelayMax: 10000
            });

            socket.on('connect', () => {
                socket.emit("USER_CONNECTED", JSON.stringify({ id, name, }));

                socket.on("LAST_GAME", jsonData => {
                    const { lastGame } = JSON.parse(jsonData);

                    lastGame.length > 0 &&
                        context.dispatch("spinner/setColors", { colorsLine: lastGame })
                })

                socket.on("CASINO_PROFIT", data => {
                    context.commit('setCasinoProfit', JSON.parse(data).casinoProfit);
                })
                socket.on("BETS_IS_OPENED", () => {
                    context.commit('bet/setServerCanBet', true);
                })
                socket.on("BETS_IS_CLOSED", () => {
                    context.commit('bet/setServerCanBet', false);
                })
                socket.on("BETS_OPENED", () => {
                    context.commit('bet/setServerCanBet', true);
                    context.dispatch('timer/setTime');
                })
                socket.on("BETS_CLOSED", () => {
                    context.commit('bet/setServerCanBet', false);
                })
                socket.on("ROLLED", data => {
                    const payload = JSON.parse(data);

                    context.dispatch('spinner/startSpin', payload);
                    setTimeout(() => context.dispatch("usersBets/cleanAll"), 4900);
                })
                socket.on("USER_BETTING", jsonData => {
                    const data = JSON.parse(jsonData);
                    const { color, name, value: bet } = data;

                    context.dispatch('usersBets/addUserBet', { color, name, bet })
                })
                socket.on("ROLL_END", jsonData => {
                    const data = JSON.parse(jsonData);
                    const message = `Вы ${data.win ? "выиграли " : "проиграли"} ${data.value}`;

                    context.dispatch('alerts/addAlert', { message, type: data.win ? "green" : "red" });
                    if (data.win) context.dispatch('bet/addBalance', data.value);
                })
                socket.on("USER_BETTING_ERROR", jsonData => {
                    const data = JSON.parse(jsonData);
                    context.dispatch('alerts/addAlert', { message: data.message, type: "red" });
                })
                socket.on("UPDATE_BALANCE", jsonData => {
                    const data = JSON.parse(jsonData);
                    context.dispatch('bet/setBalance', data.balance);
                })
                socket.on("GAME_TIME", jsonData => {
                    const data = JSON.parse(jsonData);
                    context.dispatch('timer/setTime', data.timerTime);
                })
                socket.on("NEW_MESSAGE", jsonData => {
                    const data = JSON.parse(jsonData);
                    context.dispatch('chat/addMessage', data);
                })
            })
        },
        async getBets(context) {
            const betsResult = await fetch(url("/bets"), {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: context.rootGetters["user/id"] })
            });
            const { data } = await betsResult.json();

            context.commit('setWonsHistory', data);
        },
        async sendBet(context, color) {
            const value = context.rootGetters["bet/bettingValue"];

            if (value !== 0) {
                const message = `Вы поставили ${value} на ${ruColorsName(color)}`;

                socket.emit("USER_BETTING", JSON.stringify({
                    id: context.rootState.user.id,
                    color,
                    value
                }));
                context.dispatch('alerts/addAlert', { message, type: "green" });
            }
        },
        spinningEnd(context) {
            context.dispatch('getBets');
        },
        sendSocketMessage: (context, message) => {
            socket.emit("NEW_MESSAGE", JSON.stringify({
                timestamp: new Date().getTime(),
                message,
                ownerId: context.rootState.user.id,
                ownerName: context.rootState.user.name,
                socketId: socket.id
            }));
        }
    }
})