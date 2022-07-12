import { addBets, getBets, updateUser, getUser } from "./db";
import { getValue, getColor, COLORS_DATA } from "./game-regulations";
import { generateColorsLine } from "./helper";

let has = false;
let users = {};
let betsUser = [];
let canBet = true;

export let lastGame = [];

const requestValidator = (anchor, data = { id: null }) => {
    if (data.id === null) throw Error(anchor + ": id is null");
}

export const main = io => socket => {
    socket.on("USER_CONNECTED", userConnected(io, socket))
    socket.on("disconnect", userDisconnected(io, socket))
    socket.on("USER_BETTING", userBetting(io, socket))

    if (!has) {
        setInterval(() => {
            closeBets(io)();
            setTimeout(roll(io), 1000);
            setTimeout(openBets(io), 7000);
        }, 22000)
        has = true;
    }
}

const userConnected = (io, socket) => (jsonData) => {
    const data = JSON.parse(jsonData);
    console.log("USER_CONNECTED", data);
    requestValidator("userConnected", data);
    users[socket.id] = {
        ...data,
        socketId: socket.id,
        lastGame,
    }
    io.to(socket.id).emit("LAST_GAME", JSON.stringify({ lastGame }))
    console.log("USER_CONNECTED", data.name);
}

const userDisconnected = (io, socket) => (data) => {
    delete users[socket.id];
    console.log("user_disconnected", socket.id);
}

const roll = (io) => async () => {
    if (Object.values(users).length > 0) {
        const color = getColor(getValue());
        lastGame = generateColorsLine(color);

        console.log("ROLLED:", color);

        await addBets(color);

        console.log("betsUser", betsUser);

        betsUser.forEach(bet => {
            const win = color === bet.color;
            const multiplyedValue = COLORS_DATA[color].multiply(bet.value);
            if (win) {
                /*console.log(users);
                console.log(bet.socketId);
                const user = getUser(u => u.socketId === bet.socketId);

                console.log(user);*/

                /*user.balance += multiplyedValue;

                updateUser(user.id, user);*/
            }
            setTimeout(() => {
                io.to(bet.socketId).emit(
                    "ROLL_END",
                    JSON.stringify({
                        win,
                        value: win ? multiplyedValue : bet.value
                    })
                );
            }, 5000)
        })

        betsUser = [];

        let wonsHistory = await getBets();

        io.emit("ROLLED", JSON.stringify({
            color,
            colorsLine: lastGame,
            wonsHistory,
        }));
    }
}

const openBets = (io) => () => {
    canBet = true;
    console.log("BETS_OPENED");
    io.emit("BETS_OPENED");
}

const closeBets = (io) => () => {
    canBet = false;
    console.log("BETS_CLOSED");
    io.emit("BETS_CLOSED");
}

const userBetting = (io, socket) => async (jsonData) => {
    const data = JSON.parse(jsonData)

    requestValidator("userBetting", data);

    const { color, value } = data;
    const betMan = await getUser(u => u.id === users[socket.id].id);

    if (value <= betMan.balance) {
        betMan.balance -= value;
        betsUser.push({ value, color, name: betMan.name, socketId: socket.id });

        io.to(socket.id).emit("UPDATE_BALANCE", JSON.stringify({ balance: betMan.balance }));
    } else {
        io.to(socket.id).emit("USER_BETTING_ERROR", JSON.stringify({ message: "no money", type: "red" }));
    }

    await updateUser(users[socket.id].id, betMan);
    io.emit("USER_BETTING", JSON.stringify({ ...users[socket.id], color, value }));
}