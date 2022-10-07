import {isProd} from '../../config';

export const ruColorsName = (color) => {
  switch (color) {
    case 'gray':
      return 'серый';
    case 'orange':
      return 'оранжевый';
    case 'red':
      return 'красный';
    case 'green':
      return 'зелёный';
  }
};

export const url = (uri) => {
  if (isProd) {
    return '/casino' + uri;
  }
  return uri;
};

export const GRAY = 'gray';
export const ORANGE = 'orange';
export const RED = 'red';
export const GREEN = 'green';
export const COLORS_DATA = {
  [GRAY]: {
    name: GRAY,
    multiply: (val) => val * 2
  },
  [ORANGE]: {
    name: ORANGE,
    multiply: (val) => val * 3
  },
  [RED]: {
    name: RED,
    multiply: (val) => val * 5
  },
  [GREEN]: {
    name: GREEN,
    multiply: (val) => val * 50
  }
};
