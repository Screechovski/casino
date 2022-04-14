import {
    COLORS,
    GRAY,
    GRAY_STEP,
    GREEN,
    GREEN_STEP,
    ORANGE,
    ORANGE_STEP,
    RED,
    RED_STEP,
    START_VALUE
} from "../constants"

export function getColor(value){
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

export function getValue(){
    return Math.random() * (START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP + GREEN_STEP - START_VALUE) + START_VALUE;
}

export const saveToLocalStorage = (key, value) => {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getFromLocalStorage = (key) => {
    if (localStorage && localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return null;
    }
};

// getColor(getValue())

// cleanItems(array){
//     if (array.length > 25) {
//         return array.slice(Math.max(array.length - 25, 1))
//     }
//     return array;
// }