import { defaultGettersList } from "../helper/store";

const usersBets = {
    namespaced: true,
    state:()=>({
        gray: [{
            name: "Artem",
            bet: 154
        },{
            name: "Andres",
            bet: 357
        }],
        orange: [{
            name: "Andres",
            bet: 24627
        }],
        red: [{
            name: "Petya",
            bet: 1367
        }],
        green: [{
            name: "Ivan",
            bet: 247
        }]
    }),
    getters: {
        ...defaultGettersList([
            "gray",
            "orange",
            "red",
            "green"
        ]),
        getAll: (state) => state,
        getGrayBetsSum: state =>
            state.gray.reduce((prev, cur) => prev + cur.bet, 0),
        getOrangeBetsSum: state =>
            state.orange.reduce((prev, cur) => prev + cur.bet, 0),
        getRedBetsSum: state =>
            state.red.reduce((prev, cur) => prev + cur.bet, 0),
        getGreenBetsSum: state =>
            state.green.reduce((prev, cur) => prev + cur.bet, 0),
    },
    mutations: {
        addUserBet: (state, data) => {
            const { color, name, bet } = data;
            state[color] = [{name, bet}, ...state[color]];
        },
        cleanAll: state => {
            state.gray = []
            state.orange = []
            state.red = []
            state.green = []
        }
    },
    actions: {
        addUserBet: (context, data) => {
            if (!("color" in data && "name" in data && "bet" in data)) throw Error("come key is undefined")
            context.commit("addUserBet", data);
        },
        cleanAll: (context) => {
            context.commit("cleanAll")
        }
    }
}

export default usersBets;