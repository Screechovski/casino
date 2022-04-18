const { getColor, getValue } = require("./game-regulations");

const getIP = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;
const cleanItems = (array) => {
    if (array.length > 25) {
        return array.slice(Math.max(array.length - 25, 1))
    }
    return array;
}
let preventColors = [];
const generateColors = (color) => {
    let fakeFirstHalf = [];
    let fakeLastHalf = [];
    let result = [];

    for (let i = preventColors.length; i < 35; i++) {
       fakeFirstHalf.push(getColor(getValue()))
    }
    for (let i = 0; i < 3; i++) {
       fakeLastHalf.push(getColor(getValue()))
    }

    result = [...preventColors, ...fakeFirstHalf, color, ...fakeLastHalf];
    preventColors = result.slice(result.length - 7, result.length);

    return result;
}


module.exports = {
    getIP,
    cleanItems,
    generateColorsLine: generateColors,
}