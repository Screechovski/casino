export const ruColorsName = (color) => {
  switch (color) {
    case 'gray':
      return 'серый'
    case 'orange':
      return 'оранжевый'
    case 'red':
      return 'красный'
    case 'green':
      return 'зелёный'
  }
}

export const isProduction = true

export const url = (uri) => '/casino' + uri
