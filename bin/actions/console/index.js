const path = require('path')
const repl = require('repl')
module.exports = async function () {
  process.env.NODE_OPTIONS = `--experimental-repl-await`
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
