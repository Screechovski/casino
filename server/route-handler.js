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
    try {
        const ip = getIP(req);
        console.log("ip", ip);
        const user = await getUser(u => u.ip === ip);
        console.log("user", user);
        const id = user ? user.id : null;

        res.json(success({ id: id }))
    } catch (error) {
        res.json(error({ error }))
    }
}

export const bets = async (req, res) => {
    const bets = await getBets();

    console.log("bets", bets);

    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}

export const user = async (req, res) => {
    const { id } = req.body;
    const user = await getUser(i => i.id == id);

    delete user.ip;

    res.json(success(user));
}

export const index = (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf8");
    res.sendFile(path.join(__dirname + '/index.html'));
}

export const js = (req, res) => {
    res.setHeader("Content-Type", "text/javascript; charset=utf8");
    res.sendFile(path.join(__dirname + '/client.js'));
}