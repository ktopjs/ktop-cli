const path = require('path')
const logger = require('../../libs/logger')
module.exports = async function () {
  const application = require(path.resolve(process.cwd(), 'config/application'))
  application.routers.forEach(router => {
    router.stack.map(i => logger.info(`${i.methods.join(',')} ${i.path}`))
  })
}
