import {readFile, writeFile} from 'fs';
import {cleanItems} from '../assets/helper';
import path from 'path';

const dbPath = path.join(__dirname, '../database/bets.json');

export const Bets = {
  get() {
    return new Promise((resolve, reject) => {
      try {
        readFile(dbPath, 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        reject('db bets get');
      }
    });
  },
  set(color) {
    return new Promise(async (resolve, reject) => {
      try {
        let bets = await this.get();

        if (bets.length > 25) {
          bets = cleanItems(bets);
        }
        writeFile(dbPath, JSON.stringify([...bets, color]), resolve);
      } catch (error) {
        console.log(error);
        reject('db bets set');
      }
    });
  }
};
