const declaredom = require('declaredom')
const morphdom = require('morphdom')

const findSection = id => result =>
  result['data-test-id'] == id ? result :
    result.children ? result.children.map(findSection(id)).find(e => !!e) : null

module.exports = (element, stream) => {
  const assertTally = { success: 0, failure: 0 }
  const testResults = []

  const testSection = data =>
    ({
      tagName: 'section',
      'data-test-id': data.id,
      children: [
        { tagName: 'h2', text: data.name },
        { tagName: 'ul', children: [] }
      ]
    })

  stream.on('data', data => {
    switch (data.type) {
      case 'test':
        if ('parent' in data)
          testResults.find(findSection(data['parent'])).children[1].children.push({
            tagName: 'li',
            children: [testSection(data)]
          })
        else
          testResults.push(testSection(data))
        break
      case 'assert':
        assertTally[data.ok ? 'success' : 'failure']++
        testResults.map(findSection(data.test)).find(e => !!e).children[1].children.push({
          tagName: 'li',
          className: data.ok ? 'tap-success' : 'tap-failure',
          children: [
            { tagName: 'strong', text: data.ok ? '✓' : '✗' },
            { tagName: 'span', text: ` ${data.name}: ` },
          ].concat(data.ok ? [
            { tagName: 'strong', text: data.expected }
          ] : [
            { tagName: 'br' },
            { tagName: 'span', text: 'expected: ' },
            { tagName: 'strong', text: data.expected },
            { tagName: 'br' },
            { tagName: 'span', text: 'actual: ' },
            { tagName: 'strong', text: data.actual }
          ])
        })
        break
      default:
    }

    morphdom(tests, declaredom({
      tagName: 'div',
      id: 'tests',
      className: 'tap-tests',
      children: testResults.concat([{
        tagName: 'p',
        className: !assertTally.failure ? 'tap-success' : 'tap-failure',
        children: [
          { tagName: 'span', text: !assertTally.failure ? 'Success: ' : 'Failure: ' },
          { tagName: 'strong', text: assertTally.success },
          { tagName: 'span', text: ' / ' },
          { tagName: 'strong', text: assertTally.success + assertTally.failure }
        ]
      }])
    }))
  })
}
