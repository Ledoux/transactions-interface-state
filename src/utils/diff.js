export const diff = (object = {}, nextObject = {}) => {
  const diffObject = {}
  const checkedKeys = Object.keys(nextObject)
  checkedKeys.forEach(key => {
    const nextObjectValue = nextObject[key]
    const objectValue = object[key]
    if (nextObjectValue !== objectValue) {
      diffObject[key] = [nextObjectValue, objectValue]
    }
  })
  Object.keys(object).forEach(key => {
    if (checkedKeys.includes(key)) {
      return
    }
    diffObject[key] = [undefined, object[key]]
  })
  return diffObject
}
