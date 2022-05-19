import { getIP } from './helper';
import { getUser, setUser, getBets } from './db';

const error = (data) => JSON.stringify({
    status: "ERROR",
    data: data
})

const success = (data) => JSON.stringify({
    status: "SUCCESS",
    data: data
})

export const register = (req, res) => {
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

const check = (req) => new Promise((resolve, reject) => {
    try {
        const ip = getIP(req);
        const user = getUser(u => u.ip === ip);
        const id = user ? user.id : null;

        resolve(success({ id: id }));
    } catch (error) {
        reject(error({ error }));
    }
})

export const checkProxy = async (req, res) => {
    const checkResult = await check(req);

    res.setHeader("Content-Type", "application/json; charset=utf8")
    res.send(checkResult);
}

export const bets = (req, res) => {
    const bets = getBets();
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}