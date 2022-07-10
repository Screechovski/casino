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

export const register = async (req, res) => {
    const ip = getIP(req);
    const { name } = req.body;
    res.setHeader("Content-Type", "application/json; charset=utf8");
    if (!name) {
        return res.send(error({message: "invalid user name: " + name}));
    }
    try {
        await setUser(ip, name);
    } catch (e) {
        return res.send(error({message: "failed to create user", e}));
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

    res.setHeader("Content-Type", "application/json; charset=utf8")
    res.send(checkResult);
}

export const bets = async (req, res) => {
    const bets = await getBets();

    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.send(success(bets));
}