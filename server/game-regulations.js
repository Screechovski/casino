export const GRAY = "gray";
export const ORANGE = "orange";
export const RED = "red";
export const GREEN = "green";
export const COLORS_DATA = {
    [GRAY]: {
        name: GRAY,
        range: [0, 26],
        chanse: 26,
        multiply: val => val * 2,
    },
    [ORANGE]: {
        name: ORANGE,
        range: [26, 43],
        change: 17,
        multiply: val => val * 3,
    },
    [RED]: {
        name: RED,
        range: [43, 53],
        change: 10,
        multiply: val => val * 5,
    },
    [GREEN]: {
        name: GREEN,
        range: [53, 54],
        change: 1,
        multiply: val => val * 50,
    },
}
export const COLORS_ARRAY = [GRAY, ORANGE, RED, GREEN];

export const getColor = (value) => {
    const arr = Object.values(COLORS_DATA);
    for (let c = 0; c < arr.length; c++) {
        const [min, max] = arr[c].range;
        if (min < value && value < max) {
            return arr[c].name;
        }
    }
}

export const getValue = () => {
    const arr = Object.values(COLORS_DATA);
    const [,maxValue] = arr[arr.length - 1].range;
    return Math.random() * (maxValue);
}

export const getWon = (color, bet) => {
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