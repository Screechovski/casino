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

export const register = async (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    if (!name) {
        return res.json(error({ message: "invalid user name: " + name }));
    }
    try {
        await setUser(ip, name);
    } catch (e) {
        return res.json(error({ message: "failed to create user", e }));
    }
    const user = await getUser(u => u.ip === ip);
    res.send(success({ user }));
}

export const check = async (req, res) => {
    let checkResult = null;

    try {
        const ip = getIP(req);
        const user = await getUser(u => u.ip === ip);
        const id = user ? user.id : null;

        checkResult = success({ id: id })
    } catch (error) {
        checkResult = error({ error });
    }

    res.json(checkResult);
}

export const bets = async (req, res) => {
    const bets = await getBets();

    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}