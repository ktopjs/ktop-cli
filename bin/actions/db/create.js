const path = require('path')
const command = require('../../libs/command')
const logger = require('../../libs/logger')
module.exports = async function (options) {
  command.logCurrentCmd()
  process.env.NODE_ENV = options.env || process.env.NODE_ENV || 'development'
  try {
    const knexConfig = require(path.join(process.cwd(), 'config/database.config.js'))[process.env.NODE_ENV]
    const database = knexConfig.connection.database
    delete knexConfig.connection.database
    if (!database) throw new Error('not find db name')
    const knex = require(path.join(process.cwd(), 'node_modules/knex'))(knexConfig)
    await knex.raw(`CREATE DATABASE ${database};`).finally(() => {
      knex.destroy()
    })
    logger.info(`create database ${database} success`)
  } catch (e) {
    console.log(e)
    logger.error('create db failed')
  }
}
