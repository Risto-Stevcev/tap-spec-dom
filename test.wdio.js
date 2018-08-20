const webdriverio = require('webdriverio')
const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
}

webdriverio
  .remote(options)
  .init()
  .url('http://localhost:8080')
  .saveScreenshot('actual.png')
  .end()
