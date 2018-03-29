const pump = require('pump')
const bl = require('bl')

var isFn = function (fn) {
  return typeof fn === 'function'
}

const pumpcat = (...streams) => {
  const callback = streams.pop()

  if (!isFn(callback)) throw new Error('pumpcat expects last param to be callback.')

  if (streams.length < 2) throw new Error('pumpcat requires two streams per minimum')

  var error
  return pump(...streams, err => {
    error = err
  }).pipe(bl((err, buf) => {
    if (!error) error = err
    callback(error, buf)
  }))
}

module.exports = pumpcat
