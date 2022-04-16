const COLORS = ["gray", "orange", "red", "green"]
const START_VALUE = 0;
const GRAY_STEP = 26;
const ORANGE_STEP = 17;
const RED_STEP = 10;
const GREEN_STEP = 1;
const GRAY = [START_VALUE, START_VALUE + GRAY_STEP];
const ORANGE = [START_VALUE + GRAY_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP];
const RED = [START_VALUE + GRAY_STEP + ORANGE_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP];
const GREEN = [START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP + GREEN_STEP];

const result = {
    [COLORS[0]]: (value) => value * 2,
    [COLORS[1]]: (value) => value * 3,
    [COLORS[2]]: (value) => value * 5,
    [COLORS[3]]: (value) => value * 50,
}

const getWon = (color, bet) => {
    let isWin = true;
    let value = bet;
    const wonColor = getColor(getValue());
    if (wonColor !== color) {
        value *= -1;
        isWin = false;
    } else {
        value = result[color](bet) - bet;
    }

    return { color: wonColor, value: value, isWin };
}

function getColor(value){
    if (GRAY[0] < value && value < GRAY[1]) {
    return COLORS[0];
    } else if (ORANGE[0] < value && value < ORANGE[1]) {
        return COLORS[1];
    } else if (RED[0] < value && value < RED[1]) {
        return COLORS[2];
    } else if (GREEN[0] < value && value < GREEN[1]) {
        return COLORS[3];
    } else {
        logError(value);
    }
}

function logError(value) {
    console.warn("------------");
    console.log(value);
    console.log(GRAY);
    console.log(ORANGE);
    console.log(RED);
    console.log(GREEN);
    console.warn("------------");
}

function getValue(){
    return Math.random() * (START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP + GREEN_STEP - START_VALUE) + START_VALUE;
}

module.exports = {
    getWon,
    COLORS,
}