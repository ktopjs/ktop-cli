const path = require('path')
const logger = require('../../libs/logger')
module.exports = async function () {
  const application = require(path.resolve(process.cwd(), 'config/application'))
  application.jobs.forEach((job, idx) => {
    logger.info(`${idx + 1}. ${job.constructor.name}, rule: ${job.rule}`)
  })
}
