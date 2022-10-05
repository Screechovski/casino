import {readFile, writeFile} from 'fs';

export const Users = {
  get: () =>
    new Promise((resolve, reject) => {
      try {
        readFile('database/users.json', 'utf8', (error, data) =>
          resolve(JSON.parse(data))
        );
      } catch (error) {
        reject('db getUsers', error);
      }
    }),
  getAll: (callback) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await this.get();
        const user = users.find(callback);

        user ? resolve(user) : resolve(null);
      } catch (error) {
        reject('db getUser', error);
      }
    }),
  set: (ip, name) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await this.get();
        const user = {
          id: users.length,
          name,
          ip,
          balance: 1000,
          betsHistory: []
        };

        writeFile('database/users.json', JSON.stringify([...users, user]), resolve);
      } catch (error) {
        reject('db setUser', error);
      }
    }),
  update: (id, params) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await this.get();
        const newUsers = users.map((u) => {
          if (u.id === id) {
            return {
              ...u,
              ...params,
              id
            };
          }
          return u;
        });

        writeFile('database/users.json', JSON.stringify(newUsers), () => {
          resolve(newUsers.find(({id}) => id === id));
        });
      } catch (error) {
        reject('db updateUser', error);
      }
    })
};
