const { getValue, getColor, COLORS_DATA } = require("./game-regulations");

const getWon = (color, bet) => {
    let isWin = true;
    let value = bet;
    const wonColor = getColor(getValue());
    if (wonColor !== color) {
        value *= -1;
        isWin = false;
    } else {
        value = COLORS_DATA[color].multiply(bet) - bet;
    }

    return { color: wonColor, value, isWin };
}

module.exports = getWon;