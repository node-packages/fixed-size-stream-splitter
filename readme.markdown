# fixed-size-stream-splitter

split a stream into many fixed-size streams

Unlike similar modules such as
[block-stream](https://www.npmjs.com/package/block-stream),
this package does not buffer each fixed-size chunk into memory.

fixed-size-stream-splitter may be more appropriate for very large chunks that
may not fit easily into memory.

# example

``` js
var splitter = require('fixed-size-stream-splitter')
var concat = require('concat-stream')

process.stdin.pipe(splitter(5, function (stream) {
  stream.pipe(concat(function (body) {
    console.log(body.toString())
  }))
}))
```

output

```
$ echo -n abcdefghijklmnop | node split.js
abcde
fghij
klmno
p
```

# api

``` js
var splitter = require('fixed-size-stream-splitter')
```

## var wstream = splitter(size, cb)
## var wstream = splitter(opts, cb)

Return a writable stream `wstream` that will split its input into streams of
`opts.size` bytes. Each stream is available in `cb(stream)`.

Use `opts.offset` to emit a first chunk that is smaller than `opts.size` by
`opts.offset % opts.size` bytes.

# install

```
npm install fixed-size-stream-splitter
```

# license

MIT
