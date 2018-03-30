# pumpcat

pumpcat pipes streams together and concatenates strings or binary data and calls a callback with the result

pumpcat = pump + (concatination using bl)

```
npm install pumpcat
```

[![Build Status](https://travis-ci.org/aks-/pumpcat.svg?branch=master)](https://travis-ci.org/aks-/pumpcat)

![pumpcat](https://user-images.githubusercontent.com/8316625/38133735-1bb84112-342e-11e8-879a-1fb841433e07.png)

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
