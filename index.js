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
  this.pending = this.size
  this.cb = cb
  this.once('finish', function () {
    if (self._current) self._current.push(null)
  })
}

SizeStream.prototype._write = function (buf, enc, next) {
  if (buf.length === 0) return next()
  for (var i = 0; i < buf.length; i = j) {
    if (!this._current) {
      this.cb(this._current = this._newReadable())
    }
    var j = Math.min(buf.length, i + this.pending)
    this._current.push(buf.slice(i, j))
    this.pending -= j - i
    if (this.pending === 0) {
      this.pending = this.size
      this._current.push(null)
      this._current = null
    }
  }
  this._advance(next)
}

SizeStream.prototype._advance = function (next) {
  if (this._current === null) {
    next()
  }
  else if (this._ready) {
    this._ready = false
    next()
  }
  else this._next = next
}

SizeStream.prototype._newReadable = function () {
  var self = this
  var r = new Readable
  r._read = function () {
    var n = self._next
    if (n) {
      self._next = null
      n()
    }
    else self._ready = true
  }
  return r
}
