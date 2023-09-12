const baseColor = {
  primary: '#3f8c48',
  black: '#1F1F1F',
  white: '#ffffff',
  gray: '#454545',
  red: '#ff0009',
  border: '#D4D4D4',
  lightGray: '#b4b4b6',
}

const colors = {
  ...baseColor,
}

const getColorOpacity = (color, opacity) => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16)
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`
  }
  return color
}

export {colors, getColorOpacity}
