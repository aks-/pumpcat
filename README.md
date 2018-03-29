# pumpcat

pumpcat is a small node module that combines pumpp and bl to collect the concatinated buffer.

```
npm install pumpcat
```

## What problem does it solve?

All the problems that pump solves with added functionality of concatinating the buffer for you and let you handle the error.

## Usage

Simply pass the streams you want to pipe together to pumpstream and add a callback

``` js
const pumpcat = require('pumpcat')
const { Readable, PassThrough } = require('stream')

const source = new Readable
const dest = new PassThrough()

pumpcat(source, dest, function(err, collection) {
  if (err) console.log('oops error occured', err)
  console.log('here is collection of data you wanted', collection)
})

setTimeout(function() {
  dest.destroy() // when dest is closed pumpcat will destroy source
}, 1000)
```

You can use pumpcat to pipe more than two streams together as well

``` js
var transform = someTransformStream()

pumpcat(source, transform, anotherTransform, dest, function(err, collection) {
  if (!err) console.log('got collection. YAY!')
})
```

If `source`, `transform`, `anotherTransform` or `dest` closes all of them will be destroyed.

## License

MIT
