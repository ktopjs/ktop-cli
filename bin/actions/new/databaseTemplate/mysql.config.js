const packageJson = require('../package.json')
const base = {
  client: 'mysql',
  connection: {
    charset: 'utf8mb4',
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : `${packageJson.name.replace(/-/g, '_')}_${process.env.NODE_ENV}`
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
    ...base,
    connection: {
      ...base.connection
    }
  },
  test: {
    ...base,
    connection: {
      ...base.connection
    }
  }
}
module.exports = config
