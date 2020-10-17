const path = require('path')
const shell = require('shelljs')
const command = require('../../../libs/command')
const logger = require('../../../libs/logger')
module.exports = async (file, attributes) => {
  command.logCurrentCmd()
  if (!/\.js/.test(file)) {
    file = `${file}.js`
  }
  const jobFile = path.resolve(process.cwd(), 'lib/tasks', file)
  const jobPath = path.resolve(jobFile, '../')
  shell.mkdir('-p', jobPath)
  if (!shell.test('-f', jobFile)) {
    shell.cp(path.resolve(__dirname, './jakefile.js'), jobFile)
    logger.info(`created file: ${jobFile}`)
  } else {
    logger.error(`exists file: ${jobFile}`)
  }
}
