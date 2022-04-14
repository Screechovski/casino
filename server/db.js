const fs = require('fs');

const getDBUsers = () => {
    const fileContent = fs.readFileSync('database.json', 'utf8');
    return JSON.parse(fileContent);
}

const hasUser = (ip) => {
    const user = getDBUsers().find(user => user.ip === ip);
    return user ? user : null;
}

const setUser = (ip, name) => {
    const users = getDBUsers();

    fs.writeFileSync('database.json', JSON.stringify([...users, { name, ip, balance: 1000 }]))
}

module.exports = {
    hasUser,
    setUser
}