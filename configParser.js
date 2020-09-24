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
  if (line.trim()[0] !== '#') {
    try {
      let value = line.split(/=(.+)/)[1].trim()
      let key = line.split('=')[0].trim()

      if (value === 'on' || value === 'yes' || value === 'true') {
        value = true
      } else if (value === 'off' || value === 'no' || value === 'false') {
        value = false
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

const configStore2 = new ConfigParser(configStore)
configStore2.getConfig()
configStore2.getValue('server_id')



