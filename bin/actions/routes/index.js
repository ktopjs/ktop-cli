const path = require('path')
const logger = require('../../libs/logger')
module.exports = async function () {
  const application = require(path.resolve(process.cwd(), 'config/application'))
  let idx = 0
  application.routers.forEach(router => {
    router.stack.forEach(item => {
      logger.info(`${++idx}. ${item.methods.join(',')} ${item.path}`)
    })
  })
}
