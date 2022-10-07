import {url} from '../helper/common';

export const API = {
  async getUser(id) {
    const userResult = await fetch(url(`/user`), {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({id})
    });

    return await userResult.json();
  },
  async check() {
    const checkResult = await fetch(url('/check'));

    return await checkResult.json();
  },
  async register(name) {
    const registerResult = await fetch(url('/register'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({name})
    });

    return await registerResult.json();
  },
  async getBets(id) {
    const betsResult = await fetch(url('/bets'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({id})
    });

    return await betsResult.json();
  },
  async getMessages() {
    const messagesResult = await fetch(url('/messages'));

    return await messagesResult.json();
  },
  async promo(promo, id) {
    const promosResult = await fetch(url('/promo'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({promo, id})
    });

    return await promosResult.json();
  }
};
