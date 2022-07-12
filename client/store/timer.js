const timer = {
    namespaced: true,
    state: () => ({
        time: 0,
        interval: null
    }),
    getters: {
        time: state => state.time,
    },
    mutations: {
        setTime: (state, value) => state.time = value,
        start: (state) => {
            setInterval(() => state.time--, 1000);
        }
    },
    actions: {
        setTime: (context, value = 15) => context.commit('setTime', value),
        start: (context) => context.commit('start')
    }
}

export default timer;