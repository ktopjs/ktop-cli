const base = {
  client: 'mssql',
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
