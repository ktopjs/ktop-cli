const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const logger = require('../../libs/logger')
const command = require('../../libs/command')

module.exports = async function (dirPath, options) {
  command.logCurrentCmd()
  logger.info(`new project`)
  const fullPath = path.resolve(process.cwd(), dirPath)
  shell.mkdir('-p', fullPath)
  // shell.cp('-R', path.join(__dirname, './appTemplate/*') , fullPath)
  await command.downloadFile('https://github.com/ktopjs/ktop/archive/master.zip', path.resolve(fullPath, 'ktop-master.zip'))
  await command.unzipFile(path.resolve(fullPath, 'ktop-master.zip'), fullPath)
  await fs.copy(path.resolve(fullPath, 'ktop-master'), fullPath)
  // await fs.copy(path.resolve(__dirname, 'appTemplate/package.json'), fullPath)
  command.writeFileWithContext(path.resolve(__dirname, 'appTemplate/package.json'), path.resolve(fullPath, 'package.json'), { projectName:  path.basename(fullPath) })
  await shell.exec(`rm -rf ${path.resolve(fullPath, 'ktop-master')}`)
  await shell.exec(`rm -f ${path.resolve(fullPath, 'ktop-master.zip')}`)
  await shell.exec(`rm -rf ${path.resolve(fullPath, 'libs')}`)
  await shell.exec(`rm -rf ${path.resolve(fullPath, 'index.js')}`)

  shell.cd(fullPath)
  logger.info(`npm install ktop --save`)
  shell.exec(`npm install ktop --save --registry=${options.registry}`)
  // db
  switch (options.database) {
    case 'sqlite3':
      logger.info(`npm install sqlite3 --save`)
      shell.exec(`npm install sqlite3 --save --registry=${options.registry}`)
      fs.writeFileSync(path.join(fullPath, 'config/database.config.js'), fs.readFileSync(path.join(__dirname, 'databaseTemplate/sqlite3.config.js'), 'utf8'), 'utf8')
      shell.exec(`echo *.sqlite >> ${path.join(fullPath, '.gitignore')}`)
      break
    case 'mysql':
      logger.info(`npm install mysql mysql2 --save`)
      shell.exec(`npm install mysql mysql2 --save --registry=${options.registry}`)
      fs.writeFileSync(path.join(fullPath, 'config/database.config.js'), fs.readFileSync(path.join(__dirname, 'databaseTemplate/mysql.config.js'), 'utf8'), 'utf8')
      break
    case 'pg':
    case 'postgresql':
      logger.info(`npm install pg --save`)
      shell.exec(`npm install pg --save --registry=${options.registry}`)
      fs.writeFileSync(path.join(fullPath, 'config/database.config.js'), fs.readFileSync(path.join(__dirname, 'databaseTemplate/postgresql.config.js'), 'utf8'), 'utf8')
      break
    case 'mssql':
      logger.info(`npm install mssql --save`)
      shell.exec(`npm install mssql --save --registry=${options.registry}`)
      fs.writeFileSync(path.join(fullPath, 'config/database.config.js'), fs.readFileSync(path.join(__dirname, 'databaseTemplate/mssql.config.js'), 'utf8'), 'utf8')
      break
    case 'oracle':
      logger.info(`npm install oracledb --save`)
      shell.exec(`npm install oracledb --save --registry=${options.registry}`)
      fs.writeFileSync(path.join(fullPath, 'config/database.config.js'), fs.readFileSync(path.join(__dirname, 'databaseTemplate/oracle.config.js'), 'utf8'), 'utf8')
      break
    default:
      logger.error(`not found db type: only support: sqlite3, mysql, postgresql, mssql, oracle type`)
  }
  logger.info(`npm install`)
  shell.exec(`npm install`)
}
