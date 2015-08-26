var splitter = require('../')
var concat = require('concat-stream')

process.stdin.pipe(splitter(5, function (stream) {
  stream.pipe(concat(function (body) {
    console.log(body.toString())
  }))
}))
