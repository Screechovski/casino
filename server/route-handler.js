import { getIP } from './helper';
import { getUser, setUser, getBets } from './db';
const path = require('path')

const error = (data) => ({
    status: "ERROR",
    data: data
})

const success = (data) => ({
    status: "SUCCESS",
    data: data
})

export const register = (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    if (!name) {
        return res.json(error({ message: "invalid user name: " + name }));
    }
    try {
        setUser(ip, name);
    } catch (e) {
        return res.json(error({ message: "failed to create user", e }));
    }
    res.json(success({ user: getUser(u => u.ip === ip) }));
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

    res.json(checkResult);
}

export const bets = (req, res) => {
    const bets = getBets();
    res.json(success(bets));
}

export const index = (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
}