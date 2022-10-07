import {getColor, getValue} from './gameRegulations';

let preventColors = [];

export const HTTP_CODES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  ACCESS_DENIED_403: 403,
  NOT_FOUND_404: 404,

  SERVER_ERROR_500: 500
};

export const cleanItems = (array) => {
  if (array.length > 25) {
    return array.slice(Math.max(array.length - 25, 1));
  }
  return array;
};

export const generateColorsLine = (color) => {
  let fakeFirstHalf = [];
  let fakeLastHalf = [];
  let result = [];

  for (let i = preventColors.length; i < 35; i++) {
    fakeFirstHalf.push(getColor(getValue()));
  }
  for (let i = 0; i < 3; i++) {
    fakeLastHalf.push(getColor(getValue()));
  }

  result = [...preventColors, ...fakeFirstHalf, color, ...fakeLastHalf];
  preventColors = result.slice(result.length - 7, result.length);

  return result;
};

export class Timer {
  constructor(timerTime, callBack = () => {}, onEnd = () => {}, onStart = () => {}) {
    this.steps = timerTime / 1000;
    this.time = timerTime / 1000;
    this.timer = null;
    this.callBack = callBack;
    this.onEnd = onEnd;
    this.onStart = onStart;
  }

  start = () => {
    this.timer = setInterval(() => {
      if (this.steps === 1) {
        this.steps = this.time;
        this.callBack(1);
        this.onEnd();
        this.onStart();
      } else {
        this.callBack(this.steps--);
      }
    }, 1000);
  };
  getTime = () => this.steps;
}
