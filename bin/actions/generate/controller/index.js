const command = require('../../../libs/command')
module.exports = async (controllerName, attributes) => {
  command.logCurrentCmd()
}
