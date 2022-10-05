import {readFile, writeFile} from 'fs';
import {cleanItems} from '../assets/helper';

export const Bets = {
  get: () =>
    new Promise((resolve, reject) => {
      try {
        readFile('database/bets.json', 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        reject('db getBets', error);
      }
    }),
  set: (color) =>
    new Promise(async (resolve, reject) => {
      try {
        let bets = await this.get();

        if (bets.length > 25) {
          bets = cleanItems(bets);
        }
        writeFile('database/bets.json', JSON.stringify([...bets, color]), resolve);
      } catch (error) {
        reject('db addBets', error);
      }
    })
};
