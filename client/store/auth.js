import router from "../router";

const url = uri => "http://localhost:3000" + uri;

const auth = {
    namespaced: true,
    modules: {},
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async login(context){
            /*return context.dispatch("check")
                .then(({ user }) => {
                    if (user === null) {
                        context.dispatch('user/setIsUser', false, { root: true });
                        router.push({ name: "hero" });
                    } else {
                        context.dispatch('connect', { name: user.name, id: user.id }, { root: true });
                        context.dispatch('user/setUserData', {
                            name: user.name,
                            isUser: true,
                            balance: user.balance,
                            id: user.id,
                            betsHistory: user.betsHistory
                        }, { root: true });

                        router.push({ name: "game" });
                    }
                    return true;
                })*/

                const checkResult = await context.dispatch("check");

                console.log(checkResult);

                return checkResult;
        },
        async check(context) {
            const checkResult = await fetch(url("/check"));
            const { data } = await checkResult.json();

            return data;
        },
        async register(context) {
            const registerResult = await fetch(url("/register"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: context.rootGetters["user/name"] })
            });
            const { data } = await registerResult.json();

            return data;
        },
    }
}

export default auth;