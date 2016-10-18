function countIf (testFunc, arr) {
  let count = 0
  for (var i = 0; i < arr.length; i++) {
    if (testFunc(arr[i])) count ++
  }
  return count
}

function filter (func, arr) {
  let emails = []
  for (var i = 0; i < arr.length; i++) {
    if (func (arr[i])) emails.push(arr[i])
  }
  return emails
}

function map (func, arr) {
  let result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(func(arr[i]))
  }
  return result
}

module.exports = {
  countIf: countIf,
  filter: filter,
  map: map
}
