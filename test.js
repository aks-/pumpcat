const pumpcat = require('./index')
const assert = require('assert')
const { Readable, PassThrough } = require('stream')

const testWithOneChunk = () => {
  const rs = new Readable
  const pass = new PassThrough()

  pumpcat(rs, pass, function (err, data) {
    assert.equal(data.toString(), 'woot')
  })

  rs.push('woot')
  rs.push(null)
}

const testWithTwoChunks = () => {
  const rs = new Readable
  const pass = new PassThrough()

  pumpcat(rs, pass, function (err, data) {
    assert(data.toString(), 'wootfoot')
  })

  rs.push('woot')
  rs.push('foot')
  rs.push(null)
}

const testWithOneError = () => {
  const rs = new Readable
  const pass = new PassThrough()

  const msg = 'haha fooled you!'
  pumpcat(rs, pass, function (err, data) {
    assert.equal(err.message, msg)
  })

  rs.push('woot')
  rs.emit('error', new Error(msg))
}

const testWithTwoErrorsOnOneStream = () => {
  const rs = new Readable
  const pass = new PassThrough()

  const msg = 'haha fooled you!'
  pumpcat(rs, pass, function (err, data) {
    assert.equal(err.message, msg)
  })

  rs.push('woot')
  rs.emit('error', new Error(msg))
  rs.emit('error', new Error('i should be not be reached'))
}

const testWithTwoErrorsOnTwoStreams = () => {
  const rs = new Readable
  const pass = new PassThrough()

  const msg = 'haha fooled you!'
  pumpcat(rs, pass, function (err, data) {
    assert.equal(err.message, msg)
  })

  rs.push('woot')
  pass.emit('error', new Error(msg))
  rs.emit('error', new Error('i should be not be reached'))
}

testWithOneChunk()
testWithTwoChunks()
testWithOneError()
testWithTwoErrorsOnOneStream()
testWithTwoErrorsOnTwoStreams()
