const { getIP, cleanItems } = require('./helper');
const { getUser, setUser, updateUser, addBets, getBets } = require('./db');
const { COLORS_ARRAY, getWon } = require('./game-regulations');

const error = (data) => JSON.stringify({
    status: "ERROR",
    data: data
})

const success = (data) => JSON.stringify({
    status: "SUCCESS",
    data: data
})

const register = (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    res.setHeader("Content-Type", "application/json; charset=utf8");
    if (!name) {
        return res.send(error({message: "invalid user name: " + name}));
    }
    try {
        setUser(ip, name);
    } catch (e) {
        return res.send(error({message: "failed to create user", e}));
    }
    res.send(success({ user: getUser(u => u.ip === ip)}));
}

const check = (req, res) => {
    const ip = getIP(req);
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success({ user: getUser(u => u.ip === ip)}));
}

const bets = (req, res) => {
    const bets = getBets();
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}


module.exports = {
    register,
    check,
    bets
}