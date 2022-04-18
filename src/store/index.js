import Vue from 'vue';
import Vuex from 'vuex';
import { io } from "socket.io-client";
import spinner from "./modules/spinner"
import user from "./modules/user"
import alerts from "./modules/alerts"
import auth from "./modules/auth"
import bet from "./modules/bet"
const url = uri =>"http://localhost:3000" + uri;
let socket = null;

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    modules: {
        spinner,
        user,
        alerts,
        auth,
        bet
    },
    state: ()=>({
        wonsHistory: [],
        timerKey: 0,
    }),
    getters: {
        wonsHistory: s => s.wonsHistory,
        timerKey: s => s.timerKey
    },
    mutations: {
        setWonsHistory(state, wonsHistory) {
            state.wonsHistory = wonsHistory
        },
        setTimerKey(state) {
            state.timerKey = Date.now() + "_" + Math.random();
        }
    },
    actions: {
        async connect(context) {
            socket = io("http://localhost:3000/", { reconnectionDelayMax: 10000 });

            socket.on('connect', () => {
                console.log(context);
                socket.emit("user_connected", {
                    id: context.rootState.user.id,
                    name: context.rootState.user.name,
                });

                socket.on("BETS_OPENED", data => {
                    context.commit('bet/setServerCanBet', true);
                    context.commit('setTimerKey');
                })
                socket.on("BETS_CLOSED", data => {
                    context.commit('bet/setServerCanBet', false);
                })
                socket.on("ROLLED", data => {
                    context.dispatch('spinner/startSpin', JSON.parse(data));
                })
                socket.on("USER_BETTING", data => {
                    console.log(1, "USER_BETTING", context.rootState.user.id === data);
                })
            })
        },
        async getBets(context){
            const betsResult = await fetch(url("/bets"));
            const { data } = await betsResult.json();

            context.commit('setWonsHistory', data);
        },
        async sendBet(context, color) {
            socket.emit("USER_BETTING", {
                color,
                value: context.rootGetters["bet/bettingValue"]
            });
        },
        spinningEnd(context){
            context.dispatch('getBets');
        }
    }
})