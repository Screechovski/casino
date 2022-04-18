const alerts = {
    namespaced: true,
    state: () => ({
        alerts: [],
    }),
    getters: {
        alerts: state => state.alerts,
    },
    mutations: {
        addAlert(state, alert){
            state.alerts.push(alert);
        },
        removeAlert(state, key){
            state.alerts = state.alerts.filter(i => i.key !== key);
        },
    },
    actions: {
        addAlert(context, alert) {
            const key = Date.now();
            context.commit('addAlert', { key, ...alert });
            setTimeout(() => context.commit('removeAlert', key), 2000)
        },
        removeAlert(context, key){
            context.commit('removeAlert', key)
        },
    }
}

export default alerts;