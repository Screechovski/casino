import {API} from '../../api';
import router from '../../router';

export const auth = {
  namespaced: true,
  modules: {},
  state: {},
  getters: {},
  mutations: {},
  actions: {
    login: (context) =>
      new Promise(async (resolve, reject) => {
        const checkResult = await API.check();

        if (checkResult.id !== null) {
          const {user} = await API.getUser(checkResult.id);
          const {name, id, balance, betsHistory} = user;

          context.dispatch('connect', {name, id}, {root: true});
          context.dispatch(
            'user/setUserData',
            {
              name,
              balance,
              id,
              betsHistory,
              isUser: true
            },
            {root: true}
          );

          resolve(router.push({name: 'game'}));
          return;
        }

        context.dispatch('user/setIsUser', false, {root: true});
        resolve(router.push({name: 'hero'}));
      })
  }
};
