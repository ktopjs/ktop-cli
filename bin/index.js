#!/usr/bin/env node --experimental-repl-await
const packageJson = require('../package')
const { Command } = require('commander')
const program = new Command()
// version
program.version(packageJson.version, '-v, --version')
// new [] 可选参数 <> 必填参数
program.command('new <dirPath>')
  .description('new a project with path')
  // // sqlite3, mysql, postgresql, mssql, oracle
  .requiredOption('-d, --database [string]', 'db(mysql, sqlite3...)', 'sqlite3')
  .action(require('./actions/new'))

// db:migrate
program.command('db:migrate [filename]')
  .description('run migration files')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .action(require('./actions/db/migrate'))

// db:rollback
program.command('db:rollback')
  .description('rollback last migration file')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .action(require('./actions/db/rollback'))

// db:seed
program.command('db:seed')
  .description('run seed files')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .action(require('./actions/db/seed'))


// console
program.command('console')
  .alias('c')
  .description('console')
  .action(require('./actions/console'))

program.parse(process.argv)
