const shell = require('shelljs')
const command = require('../../libs/command')

module.exports = async function (options) {
  command.logCurrentCmd()
  // or knex migrate:down
  shell.exec(`npx knex --knexfile ${options.file} migrate:rollback`)
}
