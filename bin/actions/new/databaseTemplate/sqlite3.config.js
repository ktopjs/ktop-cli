const path = require('path')
const packageJson = require('../package.json')
const base = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, `${packageJson.name.replace(/-/g, '_')}_${process.env.NODE_ENV}.sqlite`)
  },
  migrations: {
    directory: '../db/migrate',
    tableName: 'migrations'
  },
  seeds: {
    directory: '../db/seeds'
  }
}
const config = {
  development: {
    ...base,
    connection: {
      ...base.connection
    },
    debug: true
  },
  production: {
    ...base
  },
  test: {
    ...base
  }
}
module.exports = config
