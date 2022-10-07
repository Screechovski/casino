import {readFile, writeFile} from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../database/messages.json');

export const Messages = {
  get() {
    return new Promise((resolve, reject) => {
      try {
        readFile(dbPath, 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        reject('db messages get');
      }
    });
  },
  set(message) {
    return new Promise(async (resolve, reject) => {
      try {
        const messages = await this.get();

        writeFile(dbPath, JSON.stringify([...messages, message]), resolve);
      } catch (error) {
        console.log(error);
        reject('db messages set');
      }
    });
  }
};
