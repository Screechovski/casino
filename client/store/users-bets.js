import { defaultGettersList } from '../helper/store'

const usersBets = {
  namespaced: true,
  state: () => ({
    gray: [],
    orange: [],
    red: [],
    green: [],
  }),
  getters: {
    ...defaultGettersList(['gray', 'orange', 'red', 'green']),
    getAll: (state) => state,
    getGrayBetsSum: (state) =>
      state.gray.reduce((prev, cur) => prev + cur.bet, 0),
    getOrangeBetsSum: (state) =>
      state.orange.reduce((prev, cur) => prev + cur.bet, 0),
    getRedBetsSum: (state) =>
      state.red.reduce((prev, cur) => prev + cur.bet, 0),
    getGreenBetsSum: (state) =>
      state.green.reduce((prev, cur) => prev + cur.bet, 0),
  },
  mutations: {
    addUserBet: (state, data) => {
      const { color, name, bet } = data
      state[color] = [{ name, bet }, ...state[color]]
    },
    cleanAll: (state) => {
      state.gray = []
      state.orange = []
      state.red = []
      state.green = []
    },
  },
  actions: {
    addUserBet: (context, data) => {
      if (!('color' in data && 'name' in data && 'bet' in data))
        throw Error('come key is undefined')
      context.commit('addUserBet', data)
    },
    cleanAll: (context) => {
      context.commit('cleanAll')
    },
  },
}

export default usersBets
