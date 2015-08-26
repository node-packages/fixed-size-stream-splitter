var test = require('tape')
var splitter = require('../')
var concat = require('concat-stream')
var randomBytes = require('crypto').randomBytes
var chunky = require('chunky')

test('chunks', function (t) {
  t.plan(656)
  var data = randomBytes(64 * 1024)
  var chunks = chunky(data)
  var index = 0
  var w = splitter(100, function (stream) {
    var i = index
    index += 100
    stream.pipe(concat(function (body) {
      t.deepEqual(body, data.slice(i, i + 100))
    }))
  })
  ;(function next () {
    if (chunks.length === 0) return w.end()
    w.write(chunks.shift())
    process.nextTick(next)
  })()
})
