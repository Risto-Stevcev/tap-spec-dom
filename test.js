const tape = require('tape')
const tapSpecDOM = require('.')

const tests = document.getElementById('tests')
const stream = tape.createStream({ objectMode: true })
tapSpecDOM(tests, stream)

tape('timing test', function (t) {
  t.equal(typeof Date.now, 'function');
  t.equal(99 + 1, 101, 'simple arithmetic');
  t.end()
})

tape('bar test', function (t) {
  t.ok(true)
  t.test('blah', tt => {
    tt.equal(354, 354)
    tt.equal(54, 53, 'dont blah')
  })
  t.end()
})


if (module.hot) {
  module.hot.accept(function() {
    tests.innerHTML = ''
  })
}
