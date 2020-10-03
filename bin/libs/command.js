const logger = require('./logger')
const nunjucks = require('nunjucks')
const unzip = require('unzip-stream')
const fs = require('fs-extra')
const https = require('https')
const axios = require('axios')
const cusAxios = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
})
module.exports = {
  logCurrentCmd () {
    const [ nodePath, cmdPath, ...args ] = process.argv
    logger.bgInfo(`ktop ${args.join(' ')}`)
  },
  writeFileWithContext(fromFile, toFile, ctx) {
    fs.writeFileSync(toFile, nunjucks.renderString(fs.readFileSync(fromFile, "utf8"), ctx), "utf8")
  },
  replaceFileContext(filePath, ctx) {
    this.writeFileWithContext(filePath, filePath, ctx)
  },
  downloadFile (remoteUrl, toPathFile) {
    return new Promise(resolve => {
      cusAxios.get(remoteUrl, { responseType: 'stream' }).then(res => {
        res.data.pipe(fs.createWriteStream(toPathFile).on('close', () => {
          resolve()
        }))
      })
    })
  },
  unzipFile (zipFile, toFolder) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(zipFile).pipe(unzip.Extract({ path: toFolder }))
        .on('finish', resolve)
        // .on('close', resolve)
        .on('error', reject)
    })
  }
}
