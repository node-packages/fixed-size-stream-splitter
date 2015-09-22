var test = require('tape')
var splitter = require('../')
var concat = require('concat-stream')

test('offset', function (t) {
  var expected = [
    'cde',
    'fghij',
    'klmno',
    'pqrst',
    'uvwxy',
    'z'
  ]
  t.plan(expected.length)
  var w = splitter({ size: 5, offset: 2 }, function (stream) {
    stream.pipe(concat(function (body) {
      var ex = expected.shift()
      t.equal(body.toString(), ex, ex)
    }))
  })
  w.write('cdefghijklmn')
  w.write('opqrs')
  w.write('t')
  w.write('u')
  w.write('vwxyz')
  w.end()
})
