const shell = require('shelljs')
const _ = require('lodash')
const command = require('../../../libs/command')
module.exports = async (migrationName, attributes, options) => {
  command.logCurrentCmd()
  console.log(migrationName, attributes)
  migrationName = _.snakeCase(migrationName)
  shell.exec(`npx knex --knexfile ${options.file} migrate:make ${migrationName}`)
  // const tableName = migrationName.match(/[a-z]+$/)[0]
}
