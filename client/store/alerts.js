const alerts = {
  namespaced: true,
  state: () => ({
    alerts: []
  }),
  getters: {
    alerts: (state) => state.alerts
  },
  mutations: {
    addAlert(state, alert) {
      state.alerts.push(alert);
    },
    removeAlert(state, key) {
      state.alerts = state.alerts.filter((i) => i.key !== key);
    }
  },
  actions: {
    addAlert(context, {message = null, type = null}) {
      if (message === null || type === null) throw Error('message or type is null');
      const key = Date.now() + '_' + Math.random();
      context.commit('addAlert', {key, message, type});
      setTimeout(() => context.commit('removeAlert', key), 4000);
    },
    removeAlert(context, key) {
      context.commit('removeAlert', key);
    }
  }
};

export default alerts;
