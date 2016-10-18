var assert = require('./assert')
var data = require('../data/data')
var countIf = require('../lib/index').countIf
var filter = require('../lib/index').filter
var map = require('../lib/index').map
var expectedArrayOfArrays = require('../data/array-of-arrays')
var expectedFormattedDates = require('../data/formatted-dates')

var meaningOfLife = '42'

function each(func, arr) {
    for (var i = 0; i < arr.length; i++) {
        func(arr[i])
    }
}

function getType(thing) {
    return typeof(thing)
}

function isNumber(thing) {
    return (getType(thing) === "number")
}

function isStringNumber(str) {
    var num = parseInt(str, 10)
    if (isNaN(num)) {
        return false
    }
    return (isNumber(num))
}

function toNumber(str) {
    var num = parseInt(str, 10)
    return num
}

function add(a, b) {
    return a + b;
}

function addStrings(a, b) {
    var a = toNumber(a)
    var b = toNumber(b)
    var sum = add(a, b)
    return sum.toString()
}

function addStringsOrNumbers(a, b) {
    var a = a
    var b = b
    var wasString = false
    if (!isNumber(a)) {
        a = toNumber(a)
        wasString = true
    }
    if (!isNumber(b)) {
        b = toNumber(b)
        wasString = true
    }
    var sum = add(a, b)
    if (wasString)
        sum = sum.toString()
    return sum
}

function isEmail(str) {
    if (str.includes('@') && str.includes('.'))
        return true
    return false

}

var isString = function(s) {
    return typeof s === 'string'
}

var mixedArray = [
    1,
    '21',
    null,
    Date.now(),
    5,
    meaningOfLife,
    42
]
var expectedNumberCount = 4 // do you know which 4 are numbers?
var expectedStringCount = 2
var numberCount = countIf(isNumber, mixedArray)
var stringCount = countIf(isString, mixedArray)

assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array')
assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')

var emails = filter(isEmail, data)
assert(emails.length, 44, 'filter and isEmail returns the correct number of emails')

var someNumbers = [2, 4, 6]
var expectedNumbers = [4, 8, 12]
var timesTwo = function(num) {
    return num * 2
}
var actualNumbers = map(timesTwo, someNumbers)
for (var i = 0; i < expectedNumbers.length; i++) {
    assert(expectedNumbers[i], actualNumbers[i], 'number mapped correctly')
}

function filterStringsWithCommas(str) {
    if (str.includes(','))
        return true
    return false
}

var stringsWithCommas = filter(filterStringsWithCommas, data)
assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')

/*
 * splitStringByCommas
 */
//
// function splitStringByCommas (str) {
//
// }
//
// var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)
// var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
//   return arr.every(function (str, j) {
//     return str === expectedArrayOfArrays[i][j]
//   })
// })
//
// assert(matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array')
