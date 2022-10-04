import { url } from './../helper/common'

let callbackThis = null

const chat = {
  namespaced: true,
  state: () => ({
    messages: [],
    message: '',
  }),
  getters: {
    message: (state) => state.message,
    messages: (state) => state.messages,
    canSendMessage: (state) => state.message.trim().length > 0,
  },
  mutations: {
    appendMessage: (state, value) => {
      state.message = value
    },
    addMessage: (state, data) => {
      state.messages.push(data)
    },
    setMessages: (state, data) => {
      state.messages = data
    },
  },
  actions: {
    writeMessage: (context, value) => {
      context.commit('appendMessage', value.target.value)
    },
    sendMessage: (context) => {
      const message = context.state.message

      if (message.trim() === '') return

      context.dispatch('sendSocketMessage', context.state.message, {
        root: true,
      })
      context.commit('appendMessage', '')
    },
    addMessage: (context, data) => {
      context.commit('addMessage', data)
      callbackThis && callbackThis()
    },
    getMessages: async (context) => {
      const messages = await fetch(url('/messages'))
      const { data } = await messages.json()

      context.commit('setMessages', data)
      callbackThis && callbackThis()
    },
    messagesWatcher: (context, callback) => {
      if (!callbackThis && callback) {
        callbackThis = callback
      }
    },
  },
}

export default chat
