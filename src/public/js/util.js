export function copyArray(arr) {
  return arr.map(function(row) {
    return row.slice()
  })
}

export function isEven(n) {
  return n % 2 === 0
}

export function isOdd(n) {
  return n % 2 !== 0
}

export function toNormalCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function rgbToHex(string) {

  const delimited = string.slice(4, string.length - 1)
  const rgb = delimited.split(',')
  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase()

}