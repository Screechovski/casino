export const GRAY = "gray";
export const ORANGE = "orange";
export const RED = "red";
export const GREEN = "green";
export const COLORS_DATA = {
    [GRAY]: {
        name: GRAY,
        class: "secondary"
    },
    [ORANGE]: {
        name: ORANGE,
        class: "warning"
    },
    [RED]: {
        name: RED,
        class: "danger"
    },
    [GREEN]: {
        name: GREEN,
        class: "success"
    }
};

/*


const COLORS_DATA = () => ({
    [colorsList[0]]: {
        name: COLORS[0],
        index: 0,
        class: "secondary",
        multuply: val => val * 2,
    },
    [colorsList[1]]: {
        name: COLORS[1],
        index: 1,
        class: "warning",
        multuply: val => val * 3,
    },
    [colorsList[2]]: {
        name: COLORS[2],
        index: 2,
        class: "danger",
        multuply: val => val * 5,
    },
    [colorsList[3]]: {
        name: COLORS[3],
        index: 3,
        class: "success",
        multuply: val => val * 50,
    },
})*/