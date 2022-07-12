import router from "../router";

const url = uri => "http://localhost:3000/casino" + uri;

const auth = {
    namespaced: true,
    modules: {},
    state: {},
    getters: {},
    mutations: {},
    actions: {
        login: (context) => new Promise(async (resolve, reject) => {
            const checkResult = await context.dispatch("check");
            let name = "game";

            if (checkResult.id === null) {
                context.dispatch('user/setIsUser', false, { root: true });

                name = "hero";
            } else {
                const userDataResult = await context.dispatch("getUserData", checkResult.id);
                const { name, id, balance, betsHistory } = userDataResult;

                context.dispatch('connect', { name, id }, { root: true });
                context.dispatch('user/setUserData', {
                    name,
                    balance,
                    id,
                    betsHistory,
                    isUser: true,
                }, { root: true });
            }
            resolve(router.push({ name }));
        }),
        async check(context) {
            const checkResult = await fetch(url("/check"));
            const { data } = await checkResult.json();

            return data;
        },
        async register(context) {
            const registerResult = await fetch(url("/register"), {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: context.rootGetters["user/name"] })
            });
            const { data } = await registerResult.json();

            return data;
        },
        async getUserData(context, id) {
            const userResult = await fetch(url(`/user`), {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const { data } = await userResult.json();

            return data;
        }
    }
}

export default auth;