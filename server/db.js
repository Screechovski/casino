const fs = require('fs');

const getDBUsers = () => {
    const fileContent = fs.readFileSync('database.json', 'utf8');
    return JSON.parse(fileContent);
}

module.exports = {
    hasUser: (ip) => {
        const user = getDBUsers().find(user => user.ip === ip);
        return user ? user : null;
    },
    setUser: (ip, userName) => {
        const users = getDBUsers();

        fs.writeFileSync('database.json', JSON.stringify([...users, { userName, ip, balance: 1000 }]))
    }
}