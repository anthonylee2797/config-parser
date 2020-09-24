const fs = require('fs')

class ConfigParser {
  constructor(configFile) {
    this.configFile = configFile
  }
  getValue(configParam) {
    console.log(this.configFile[configParam])
  }
  getConfig() {
    console.log(this.configFile)
  }
}

const CONFIG_FILE = 'config.txt'

const config = fs.readFileSync(`${__dirname}/${CONFIG_FILE}`, 'utf-8').split('\n')

const configStore = {}

config.forEach((line) => {
  // ignores comments
  if (line.trim()[0] !== '#') {

    try {

      // separates keys and value from each line
      let value = line.split(/=(.+)/)[1].trim()
      let key = line.split('=')[0].trim()

      // assign value to true
      if (value === 'on' || value === 'yes' || value === 'true') {
        value = true

        // assign value to false
      } else if (value === 'off' || value === 'no' || value === 'false') {
        value = false

        // if value is a number, turn value into number
      } else if (!isNaN(value)) {
        value = parseFloat(value)
      }
      configStore[key] = value
    }

    catch (err) {
      return
    }
  }
})

const configGiven = new ConfigParser(configStore)

// logs config to screen
configGiven.getConfig()
// logs config paramater value
configGiven.getValue('server_id')



