const GRAY = "gray";
const ORANGE = "orange";
const RED = "red";
const GREEN = "green";
const COLORS_DATA = {
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
const COLORS_ARRAY = [GRAY, ORANGE, RED, GREEN];

function getColor(value){
    const arr = Object.values(COLORS_DATA);
    for (let c = 0; c < arr.length; c++) {
        const [min, max] = arr[c].range;
        if (min < value && value < max) {
            return arr[c].name;
        }
    }
}

function getValue(){
    const arr = Object.values(COLORS_DATA);
    const [,maxValue] = arr[arr.length - 1].range;
    return Math.random() * (maxValue);
}

module.exports = {
    GRAY: GRAY,
    ORANGE: ORANGE,
    RED: RED,
    GREEN: GREEN,
    COLORS_DATA: COLORS_DATA,
    COLORS_ARRAY: COLORS_ARRAY,
    getColor: getColor,
    getValue: getValue
}