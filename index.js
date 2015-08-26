var Writable = require('readable-stream/writable')
var Readable = require('readable-stream/readable')
var inherits = require('inherits')

module.exports = SizeStream
inherits(SizeStream, Writable)

function SizeStream (n, cb) {
  if (!(this instanceof SizeStream)) return new SizeStream(n, cb)
  var self = this
  Writable.call(this)
  this.size = n
  this.pos = 0
  this.cb = cb
  this.once('finish', function () {
    self._current.push(null)
  })
  cb(this._current = newReadable())
}

SizeStream.prototype._write = function (buf, enc, next) {
  if (buf.length + this.pos < this.size) {
    this.pos += buf.length
    this._current.push(buf)
    return next()
  }
  for (var i = 0; i < buf.length; i += this.size) {
    var j = Math.min(buf.length, i + this.size - this.pos)
    this._current.push(buf.slice(i, j))
    if (j < buf.length) {
      this._current.push(null)
      this.cb(this._current = newReadable())
      this.pos = 0
    }
    else this.pos = buf.length - i
  }
  next()
}

function newReadable () {
  var r = new Readable
  r._read = function () {}
  return r
}
