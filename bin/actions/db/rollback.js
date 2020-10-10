const shell = require('shelljs')
const command = require('../../libs/command')

module.exports = async function (options) {
  command.logCurrentCmd()
  process.env.NODE_ENV = options.env || process.env.NODE_ENV || 'development'
  // or knex migrate:down
  shell.exec(`npx knex --knexfile ${options.file} migrate:rollback`)
}
