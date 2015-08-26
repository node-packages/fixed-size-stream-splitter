var test = require('tape')
var splitter = require('../')
var concat = require('concat-stream')

test('split 5', function (t) {
  var expected = [
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'uvwxy',
    'z'
  ]
  t.plan(expected.length)
  var w = splitter(5, function (stream) {
    stream.pipe(concat(function (body) {
      var ex = expected.shift()
      t.equal(body.toString(), ex, ex)
    }))
  })
  w.write('abcdefghijklmn')
  w.write('opqrs')
  w.write('t')
  w.write('u')
  w.write('vwxyz')
  w.end()
})
