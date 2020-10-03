const shell = require('shelljs')
const command = require('../../libs/command')

module.exports = async function (options) {
  command.logCurrentCmd()
  shell.exec(`npx knex --knexfile ${options.file} seed:run`)
}
