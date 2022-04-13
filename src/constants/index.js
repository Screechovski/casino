export const COLORS = ["bg-secondary", "bg-warning", "bg-danger", "bg-success"]
export const START_VALUE = 0;
export const GRAY_STEP = 26;
export const ORANGE_STEP = 17;
export const RED_STEP = 10;
export const GREEN_STEP = 1;
export const GRAY = [START_VALUE, START_VALUE + GRAY_STEP];
export const ORANGE = [START_VALUE + GRAY_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP];
export const RED = [START_VALUE + GRAY_STEP + ORANGE_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP];
export const GREEN = [START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP, START_VALUE + GRAY_STEP + ORANGE_STEP + RED_STEP + GREEN_STEP];
export const result = () => ({
    [COLORS[0]]: (value) => value * 2,
    [COLORS[1]]: (value) => value * 3,
    [COLORS[2]]: (value) => value * 5,
    [COLORS[3]]: (value) => value * 50,
})