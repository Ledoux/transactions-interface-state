export function getToggledArray (element, array) {
  let toggledArray
  if (!array) {
    return [element]
  } else if (array.includes(element)) {
    return array.filter(arrayElement => arrayElement !== element)
  } else {
    return array.concat([element])
  }
}
