const chalk = require('chalk')
module.exports = {
  bgInfo (message, ...otherArgs) {
    return console.log(chalk.bgBlue(`${message}`, ...otherArgs))
  },
  info (message, ...otherArgs) {
    return console.log(chalk.blue(`${message}`, ...otherArgs))
  },
  warning (message, ...otherArgs) {
    return console.log(chalk.keyword('orange')(message), ...otherArgs)
  },
  error (message, ...otherArgs) {
    return console.log(chalk.bold.red(`Error: ${message}`), ...otherArgs)
  }
}
