const fs = require('fs');
const { cleanItems } = require('./helper');

const getUsers = () => {
    const fileContent = fs.readFileSync('database-users.json', 'utf8');
    return JSON.parse(fileContent);
}

const getUser = (callback) => {
    const user = getUsers().find(callback);
    return user ? user : null;
}

const setUser = (ip, name) => {
    const users = getUsers();
    const user = { id: users.length, name, ip, balance: 1000, betsHistory: [] };

    fs.writeFileSync('database-users.json', JSON.stringify([...users, user]))
}

const updateUser = (id, params) => {
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

    fs.writeFileSync('database-users.json', JSON.stringify(newUsers));
    return newUsers.find(({id}) => id === id);
}

const getBets = () => {
    const fileContent = fs.readFileSync('database-bets.json', 'utf8');
    return JSON.parse(fileContent);
}

const addBets = (color) => {
    let bets = getBets();

    if (bets.length > 25) {
        bets = cleanItems(bets);
    }

    fs.writeFileSync('database-bets.json', JSON.stringify([...bets, color]));
}

module.exports = {
    getUser,
    setUser,
    updateUser,
    getBets,
    addBets
}