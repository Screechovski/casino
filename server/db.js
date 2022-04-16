const fs = require('fs');
const { cleanItems } = require('./helper');

const getUsers = () => {
    const fileContent = fs.readFileSync('database-users.json', 'utf8');
    return JSON.parse(fileContent);
}

const getUser = (ip) => {
    const user = getUsers().find(user => user.ip === ip);
    return user ? user : null;
}

const setUser = (ip, name) => {
    const users = getUsers();
    const user = { name, ip, balance: 1000, betsHistory: [] };

    fs.writeFileSync('database-users.json', JSON.stringify([...users, user]))
}

const updateUser = (ip, params) => {
    const users = getUsers();
    const newUsers = users.map(u => {
        if (u.ip === ip){
            return {
                ...u,
                ...params,
                ip
            }
        }
        return u;
    })

    fs.writeFileSync('database-users.json', JSON.stringify(newUsers));
    return newUsers.find(({ip}) => ip === ip);
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