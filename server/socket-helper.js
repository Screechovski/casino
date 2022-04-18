const { addBets, getBets } = require("./db");
const { getValue, getColor } = require("./game-regulations");
const { generateColorsLine } = require("./helper");

let has = false;
let users = {};
let betsUser = [];
let canBet = true;

const userOnline = (io, socket) => async (data) => {};

const main = io => socket => {
    socket.on("user_connected", userConnected(io, socket))
    socket.on("disconnect", userDisconnected(io, socket))
    socket.on("USER_BETTING", userBetting(io, socket))

    if (!has) {
        setInterval(()=>{
            closeBets(io)();
            setTimeout(roll(io), 1000);
            setTimeout(openBets(io), 7000);
        }, 22000)
        has = true;
    }
}

const userConnected = (io, socket) => (data) => {
    console.log("userConnected", data);
    users[socket.id] = {
        ...data,
        socketId: socket.id
    }
    console.log("user_connected", data.name);
}

const userDisconnected = (io, socket) => (data) => {
    delete users[socket.id];
    console.log("user_disconnected", socket.id);
}

const roll = (io) => () => {
    if (Object.values(users).length > 0) {
        const color = getColor(getValue());

        console.log("ROLLED:", color);

        addBets(color);

        io.emit("ROLLED", JSON.stringify({
            color,
            colorsLine: generateColorsLine(color),
            wonsHistory: getBets()
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

const userBetting = (io, socket) => ({color, value}) => {
    console.log("USER_BETTING", users[socket.id], color, value);
    io.emit("USER_BETTING", users[socket.id].id);
}

module.exports = {
    userOnline,
    main
}