const packageJson = require('../package.json')
const base = {
  client: 'mysql',
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
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : `${packageJson.name.replace(/-/g, '_')}_development`
    },
    debug: true
  },
  production: {
    ...base,
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : `${packageJson.name.replace(/-/g, '_')}_production`
    }
  },
  test: {
    ...base,
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : `${packageJson.name.replace(/-/g, '_')}_test`
    }
  }
}
module.exports = config
