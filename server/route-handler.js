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

const bet = (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf8");

    const ip = getIP(req);
    const user = getUser(ip);
    if (user === null) {
        return res.send(error({message: "is not user"}));
    }
    const { betValue, betColor } = req.body;
    if (betValue > user.balance || betValue <= 0) {
        return res.send(error({message: "invalid bet value", betValue, betColor}));
    }
    if (!COLORS_ARRAY.includes(betColor)) {
        return res.send(error({message: "invalid bet color"}));
    }

    const { color, value, isWin } = getWon(betColor, betValue);
    const newUserData = updateUser(ip, {
        balance: user.balance + value,
        betsHistory: cleanItems([...user.betsHistory, { color: betColor, value: betValue, isWin }])
    })
    addBets(color);

    res.send(success({
        user: newUserData,
        bet: { color: betColor, value: betValue, isWin },
        win: { color, value, wonsHistory: getBets() }
    }));
}

const register = (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    res.setHeader("Content-Type", "application/json; charset=utf8");
    if (!name) {
        return res.send(error({message: "invalid user name: " + name}));
    }
    try {
        setUser(ip, name);
    } catch (error) {
        return res.send(error({message: "failed to create user", error}));
    }
    res.send(success(getUser(ip)));
}

const check = (req, res) => {
    const ip = getIP(req);
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success({user:getUser(ip)}));
}

const bets = (req, res) => {
    const bets = getBets();
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}


module.exports = {
    bet,
    register,
    check,
    bets
}