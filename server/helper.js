import { getColor, getValue } from "./game-regulations";

let preventColors = [];
export const getIP = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;

export const cleanItems = (array) => {
    if (array.length > 25) {
        return array.slice(Math.max(array.length - 25, 1))
    }
    return array;
}
export const generateColorsLine = (color) => {
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