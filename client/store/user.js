import router from "../router";

const user = {
    namespaced: true,
    state: () => ({
        name: null,
        isUser: null,
        betsHistory: [],
        id: null,
    }),
    getters: {
        name: state => state.name ?? "",
        isUser: state => state.isUser,
        betsHistory: state => state.betsHistory,
        id: state => state.id
    },
    mutations: {
        setIsUser(state, isUser){
            state.isUser = isUser;
        },
        setBetsHistory(state, betsHistory){
            state.betsHistory = betsHistory;
        },
        setName(state, name){
            state.name = name;
        },
        setID(state, id){
            state.id = id;
        }
    },
    actions: {
        setIsUser(context, isUser = null){
            if (isUser === null) throw Error("isUser is null")
            context.commit('setIsUser', isUser);
        },
        setName(context, name = null){
            if (name === null) throw Error("name is null")
            context.commit('setName', name);
        },
        setBetsHistory(context, betsHistory = null){
            if (betsHistory === null) throw Error("betsHistory is null")
            context.commit('setBetsHistory', betsHistory);
        },
        setUserData(context, data = null){
            if (data === null) throw Error("data is null")
            const { name = null, isUser = null, betsHistory = null, id = null, balance = null } = data;
            if (name === null) throw Error("name is null")
            if (isUser === null) throw Error("isUser is null")
            if (betsHistory === null) throw Error("betsHistory is null")
            if (id === null) throw Error("id is null")
            if (balance === null) throw Error("balance is null")

            context.commit('setName', name);
            context.commit('setIsUser', isUser);
            context.commit('setBetsHistory', betsHistory);
            context.commit('setID', id);
            context.commit('bet/setBalance', balance, { root: true });
        },
        async sendName(context){
            const { user } = await context.dispatch("auth/register", {}, { root: true });

            context.dispatch('connect', { name: user.name, id: user.id }, { root: true });
            context.dispatch('setUserData', {
                name: user.name,
                isUser: true,
                balance: user.balance,
                id: user.id,
                betsHistory: user.betsHistory
            });

            router.push({ name: "game" });
        },
    }
}

export default user;