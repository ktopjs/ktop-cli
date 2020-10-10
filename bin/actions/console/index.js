const path = require('path')
const repl = require('repl')
module.exports = async function (options) {
  process.env.NODE_OPTIONS = `--experimental-repl-await`
  process.env.NODE_ENV = options.env || process.env.NODE_ENV || 'development'
  const replInstance = repl.start({
    prompt: 'ktop> ',
    useGlobal: true,
    useColors: true,
    experimentalReplAwait: true
    // replMode: repl.REPL_MODE_STRICT
  })
  const application = require(path.resolve(process.cwd(), 'config/application'))
  for (let key in application.models) {
    replInstance.context[key] = application.models[key]
  }
}
