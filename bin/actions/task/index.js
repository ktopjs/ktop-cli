const path = require('path')
const shell = require('shelljs')
const logger = require('../../libs/logger')
const command = require('../../libs/command')
module.exports = async function (file, attributes) {
  command.logCurrentCmd()
  if (!/\.js/.test(file)) {
    file = `${file}.js`
  }
  const jobFile = path.resolve(process.cwd(), 'lib/tasks', file)
  if (!shell.test('-f', jobFile)) {
    return logger.error(`can not find file: ${jobFile}`)
  }
  const application = require(path.resolve(process.cwd(), 'config/application'))
  const job = require(jobFile)
  if (job && job.perform) {
    application.shareAttrsTo(job)
    job.desc && logger.info(job.desc)
    job.perform(...attributes)
    job.desc && logger.info(`finished`)
  } else {
    return logger.error(`job null or can not find perform method`)
  }
}
