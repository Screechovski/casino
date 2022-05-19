import { readFile, readFileSync, writeFileSync } from 'fs';
import { cleanItems } from './helper';

const getUsers = () => {
    const fileContent = readFileSync('database-users.json', 'utf8');
    return JSON.parse(fileContent);
}

export const getUser = (callback) => {
    const users = getUsers();
    const user = users.find(callback);
    return user ? user : null;
}

export const setUser = (ip, name) => {
    const users = getUsers();
    const user = { id: users.length, name, ip, balance: 1000, betsHistory: [] };

    writeFileSync('database-users.json', JSON.stringify([...users, user]))
}

export const updateUser = (id, params) => {
    const users = getUsers();
    const newUsers = users.map(u => {
        if (u.id === id){
            return {
                ...u,
                ...params,
                id
            }
        }
        return u;
    })

    writeFileSync('database-users.json', JSON.stringify(newUsers));
    return newUsers.find(({id}) => id === id);
}

export const getBets = () => {
    const fileContent = readFileSync('database-bets.json', 'utf8');
    return JSON.parse(fileContent);
}

export const addBets = (color) => {
    let bets = getBets();

    if (bets.length > 25) {
        bets = cleanItems(bets);
    }

    writeFileSync('database-bets.json', JSON.stringify([...bets, color]));
}