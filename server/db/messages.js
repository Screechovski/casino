import {readFile, writeFile} from 'fs';

export const Messages = {
  get: () =>
    new Promise((resolve, reject) => {
      try {
        readFile('database/messages.json', 'utf8', (error, data) => {
          if (error) throw error;
          resolve(JSON.parse(data));
        });
      } catch (error) {
        reject('db getMessages', error);
      }
    }),
  set: (message) =>
    new Promise(async (resolve, reject) => {
      try {
        const messages = await this.get();

        writeFile(
          'database/messages.json',
          JSON.stringify([...messages, message]),
          resolve
        );
      } catch (error) {
        reject('db addMessage', error);
      }
    })
};
