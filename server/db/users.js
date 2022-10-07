import {readFile, writeFile} from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../database/users.json');

export const Users = {
  get() {
    return new Promise((resolve, reject) => {
      try {
        readFile(dbPath, 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        reject('db users get');
      }
    });
  },
  getAll(callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.get();
        const user = users.find(callback);

        user ? resolve(user) : resolve(null);
      } catch (error) {
        console.log(error);
        reject('db users getAll');
      }
    });
  },
  set(ip, name) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.get();
        const user = {
          id: users.length,
          name,
          ip,
          balance: 1000,
          betsHistory: []
        };

        writeFile(dbPath, JSON.stringify([...users, user]), resolve);
      } catch (error) {
        console.log(error);
        reject('db users set');
      }
    });
  },
  update(id, params) {
    return new Promise(async (resolve, reject) => {
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

        writeFile(dbPath, JSON.stringify(newUsers), () => {
          resolve(newUsers.find(({id}) => id === id));
        });
      } catch (error) {
        console.log(error);
        reject('db users update');
      }
    });
  }
};
