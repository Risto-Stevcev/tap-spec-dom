# tap-spec-dom

TAP output formatted for the DOM

## Usage

```bash
npm install --save-dev tap-spec-dom
```

```javascript
const tape = require('tape')
const tapSpecDOM = require('tap-spec-dom')

// the container element for the tests
const tests = document.getElementById('tests')

// pass the element and tape stream to tapSpecDOM
tapSpecDOM(tests, tape.createStream({ objectMode: true })) 

tape('timing test', t => {
  t.equal(typeof Date.now, 'function')
  t.equal(99 + 1, 101, 'simple arithmetic')
  t.end()
})
```

Add `tap-spec-dom.css` to your document for some styling or create your own

## Running Tests

Run the servers:

```bash
npm run server
```

```bash
npm run selenium
```

Then run the tests:

```bash
npm test
```

The diff might fail because your resolution is different (TODO: set resolution on test), but it should look similar
