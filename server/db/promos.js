import path from 'path';
import {readFile, writeFile} from 'fs';

const dbPath = path.join(__dirname, '../database/promos.json');

export const Promos = {
  get() {
    return new Promise((resolve, reject) => {
      try {
        readFile(dbPath, 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        reject('db promos has');
      }
    });
  },
  has(promo) {
    return new Promise(async (resolve, reject) => {
      try {
        const promos = await this.get();

        resolve(promos.includes(promo));
      } catch (error) {
        console.log(error);
        reject('db promos has');
      }
    });
  },
  remove(promo) {
    return new Promise(async (resolve, reject) => {
      try {
        const promos = await this.get();

        writeFile(dbPath, JSON.stringify(promos.filter((p) => p !== promo)), resolve);
      } catch (error) {
        console.log(error);
        reject('db promos has');
      }
    });
  }
};
