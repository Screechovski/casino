export default {
    namespaced: true,
    state: () => ({
        name: null,
        balance: null,
        isUser: null,
        betValue: 0,
        betColor: null,
    }),
    getters: {
        name: state => state.name,
        balance: state => state.balance,
        isUser: state => state.isUser,
        betValue: state => state.betValue,
        betColor: state => state.betColor,
        canBet: state => state.betValue > 0 && state.betValue < state.balance && state.betColor !== null
    },
    mutations: {
        setName(state, name){
            state.name = name;
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
        setUserData(state, { name = null, balance = null}) {
            if (name && balance){
                state.isUser = true;
                state.balance = balance;
                state.name = name;
            } else {
                console.error("user/actions/setUserData", { name, balance })
            }
        }
    },
    actions: {
        setName(context, value) {
            context.commit('setName', value)
        },
        async sendName(context){
            const { name, balance } = await context.dispatch("register");

            context.commit('setUserData', { name, balance });
        },
        async login(context){
            const { user } = await context.dispatch("check");

            if (user === null) {
                context.commit('setIsUser', false)
            } else {
                context.commit('setUserData', {
                    name: user.name,
                    balance: user.balance,
                })
            }
        },
        async check(context){
            const checkResult = await fetch("/check");
            const { data } = await checkResult.json();

            return data;
        },
        async register(context){
            const registerResult = await fetch("/register", {
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
        setBetColor(context, value){
            context.commit('setBetColor', value);
        }
    }
}