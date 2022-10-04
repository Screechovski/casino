const bet = {
  namespaced: true,
  state: () => ({
    balance: null,
    bettingValue: 0,
    serverCanBet: false,
  }),
  getters: {
    bettingValue: (s) => s.bettingValue,
    balance: (s) => s.balance,
    canBet: (s) => {
      return s.bettingValue <= s.balance && s.serverCanBet && s.bettingValue > 0
    },
    serverCanBet: (s) => s.serverCanBet,
  },
  mutations: {
    setBalance(state, balance) {
      state.balance = balance
    },
    setBetValue(state, bettingValue) {
      state.bettingValue = bettingValue
    },
    setServerCanBet(state, serverCanBet) {
      state.serverCanBet = serverCanBet
    },
  },
  actions: {
    setBalance(context, balance = null) {
      if (balance === null) throw Error('balance is null')
      context.commit('setBalance', balance)
    },
    setBetValue(context, value) {
      context.commit('setBetValue', value)
    },
    setServerCanBet(context, value = null) {
      context.commit('setBetValue', value)
    },
    addBalance(context, value) {
      context.commit('setBalance', context.state.balance + value)
    },
  },
}

export default bet
