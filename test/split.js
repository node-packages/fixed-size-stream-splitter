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
      t.equal(body.toString(), expected.shift())
    }))
  })
  w.write('abcdefghijklmn')
  w.write('opqrs')
  w.write('t')
  w.write('u')
  w.write('vwxyz')
  w.end()
})
