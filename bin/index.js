#!/usr/bin/env node --experimental-repl-await
process.env.GLOBAL_DEFINE_KTOP_PROJECT_RUNNING_IN_CONSOLE = true
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
  .option('-r, --registry [string]', 'db(mysql, sqlite3...)')
  .action(require('./actions/new'))

// db:create
program.command('db:create')
  .description('create database')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/db/create'))

// db:drop
program.command('db:drop')
  .description('drop database')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/db/drop'))

// db:migrate
program.command('db:migrate')
  .description('run migration files')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/db/migrate'))

// db:rollback
program.command('db:rollback')
  .description('rollback last migration file')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/db/rollback'))

// db:seed
program.command('db:seed')
  .description('run seed files')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/db/seed'))


// routes
program.command('routes')
  .description('list all routes')
  .action(require('./actions/routes'))

// jobs
program.command('jobs')
  .description('list all jobs')
  .action(require('./actions/jobs'))

// job
program.command('task <file>')
  .description('run task')
  .action(function (file) {
    let args = process.argv.slice(process.argv.indexOf(file) + 1, process.argv.length)
    require('./actions/task')(file, args, this)
  })

// console
program.command('console')
  .alias('c')
  .description('console')
  .requiredOption('-e, --env [string]', 'NODE_ENV value', '')
  .action(require('./actions/console'))

program.command('generate <cmd>')
  .alias('g')
  .description('generate [controller|model|migration|job]')
  .arguments('<arg> [value]')
  .requiredOption('-f, --file [string]', 'custom database config file', './config/database.config.js')
  .action(function (cmd, value) {
    let args = process.argv.slice(process.argv.indexOf(value) + 1, process.argv.length)
    switch (cmd) {
      case 'controller':
        require('./actions/generate/controller')(value, args, this)
        break
      case 'model':
        require('./actions/generate/model')(value, args, this)
        break
      case 'migration':
        require('./actions/generate/migration')(value, args, this)
        break
      case 'task':
        require('./actions/generate/task')(value, args, this)
        break
      default:
    }
  })

program.parse(process.argv)
