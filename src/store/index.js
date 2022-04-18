import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import { io } from "socket.io-client";
import spinner from "./modules/spinner"
const url = uri =>"http://localhost:3000" + uri;

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    modules: {
        spinner,
    },
    state: {
        name: null,
        balance: null,
        isUser: null,
        betValue: 0,
        betColor: null,
        betsHistory: [],
        alerts: [],
        betLoading: false,
        wonColor: null,
        wonsHistory: []
    },
    getters: {
        name: state => state.name,
        balance: state => state.balance,
        isUser: state => state.isUser,
        betValue: state => state.betValue,
        betColor: state => state.betColor,
        canBet: state => state.betValue > 0 && state.betValue <= state.balance,
        canSendBet: state => state.betValue > 0 && state.betValue <= state.balance && state.betColor !== null,
        alerts: state => state.alerts,
        betLoading: state => state.betLoading,
        wonColor: state => state.wonColor,
        wonsHistory: state => state.wonsHistory,
    },
    mutations: {
        setName(state, name){
            state.name = name;
        },
        addAlert(state, alert){
            state.alerts.push({ key: Date.now(), ...alert });
            if (state.alerts.length > 25){
               state.alerts = state.alerts.slice(Math.max(state.alerts.length - 25, 1))
            }
        },
        removeAlert(state, key){
            state.alerts = state.alerts.filter(i => i.key !== key);
        },
        setBalance(state, balance){
            state.balance = balance;
        },
        setIsUser(state, isUser){
            state.isUser = isUser;
        },
        setWonsHistory(state, wonsHistory){
            state.wonsHistory = wonsHistory;
        },
        setBetValue(state, value){
            state.betValue = value;
        },
        setBetColor(state, value){
            state.betColor = value;
        },
        setBetsHistory(state, value){
            state.betsHistory = value;
        },
        betLoading(state, value){
            state.betLoading = value;
        },
        wonColor(state, value){
            state.wonColor = value;
        },
        setWonsHistory(state, value){
            state.wonsHistory = value;
        }
    },
    actions: {
        setName(context, value) {
            context.commit('setName', value)
        },
        addAlert(context, value){
            context.commit('addAlert', value)
        },
        removeAlert(context, value){
            context.commit('removeAlert', value)
        },
        async connect(context, name) {
            const socket = io("http://localhost:3000/", { reconnectionDelayMax: 10000 });
            socket.emit("user_connected, name: ", name);

            socket.on('connect', () => {
                socket.on("ROLLED", data => {
                    context.dispatch('spinner/startSpin', JSON.parse(data));
                })
            })
        },
        async sendName(context){
            const { name, balance, betsHistory } = await context.dispatch("register");

            context.dispatch('connect', name);
            context.commit('setIsUser', true);
            context.commit('setName', name);
            context.commit('setBalance', balance);
            context.commit('setBetsHistory', betsHistory);
            router.push({ name: "game" });
        },
        async login(context){
            return context.dispatch("check")
                .then(({ user }) => {
                    if (user === null) {
                        context.commit('setIsUser', false);
                        router.push({ name: "hero" });
                    } else {
                        context.dispatch('connect', user.name);
                        context.commit('setIsUser', true);
                        context.commit('setName', user.name);
                        context.commit('setBalance', user.balance);
                        context.commit('setBetsHistory', user.betsHistory);
                        router.push({ name: "game" });
                    }
                    return true;
                })
        },
        async check(context){
            const checkResult = await fetch(url("/check"));
            const { data } = await checkResult.json();

            return data;
        },
        async register(context){
            const registerResult = await fetch(url("/register"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: context.getters.name })
            });
            const { data } = await registerResult.json();

            return data;
        },
        setBetValue(context, value){
            context.commit('setBetValue', value);
        },
        async setBetColor(context, value){
            context.commit('betLoading', true);
            const betResult = await fetch(url("/bet"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ betValue: context.state.betValue, betColor: value })
            });
            const { data } = await betResult.json();

            context.commit('wonColor', data.win.color);
            setTimeout(()=>{
                context.commit('addAlert', {
                    text: data.win.value,
                    color: data.bet.color,
                    isWin: data.bet.isWin
                })
                context.commit('setBalance', data.user.balance);
                context.commit('setBetsHistory', data.user.betsHistory);
                context.commit('setWonsHistory', data.win.wonsHistory);
                context.commit('betLoading', false);
            }, 5000)
        },
        async getBets(context){
            const betsResult = await fetch(url("/bets"));
            const { data } = await betsResult.json();

            context.commit('setWonsHistory', data);
        }
    }
})