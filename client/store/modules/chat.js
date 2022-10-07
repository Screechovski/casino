import {API} from '../../api';

let callbackThis = null;

export const chat = {
  namespaced: true,
  state: () => ({
    messages: [],
    message: ''
  }),
  getters: {
    message: (state) => state.message,
    messages: (state) => state.messages,
    canSendMessage: (state) => state.message.trim().length > 0
  },
  mutations: {
    appendMessage: (state, value) => {
      state.message = value;
    },
    addMessage: (state, data) => {
      state.messages.push(data);
    },
    setMessages: (state, data) => {
      state.messages = data;
    }
  },
  actions: {
    writeMessage: (context, value) => {
      context.commit('appendMessage', value.target.value);
    },
    sendMessage: (context) => {
      const message = context.state.message;

      if (message.trim() === '') return;

      context.dispatch('sendSocketMessage', context.state.message, {
        root: true
      });
      context.commit('appendMessage', '');
    },
    addMessage: (context, data) => {
      context.commit('addMessage', data);
      callbackThis && callbackThis();
    },
    getMessages: async (context) => {
      const {messages} = await API.getMessages();

      context.commit('setMessages', messages);
      callbackThis && callbackThis();
    },
    messagesWatcher: (context, callback) => {
      if (!callbackThis && callback) {
        callbackThis = callback;
      }
    }
  }
};
