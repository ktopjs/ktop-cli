const shell = require('shelljs')
const command = require('../../libs/command')

module.exports = async function (filename, options) {
  command.logCurrentCmd()
  if (!filename) {
    shell.exec(`npx knex --knexfile ${options.file} migrate:latest`)
  } else {
    shell.exec(`npx knex --knexfile ${options.file} migrate:make ${filename}`)
  }
}
