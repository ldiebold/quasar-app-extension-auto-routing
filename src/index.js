const { generateRoutes } = require('vue-route-generator')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const createIndexTemplate = require('./createIndexTemplate')

module.exports = function (api) {
  const pagesDir = api.resolve.app(api.prompts.pagesDir)
  const layoutsDir = api.resolve.app(api.prompts.layoutsDir)
  const ignorePattern = api.prompts.ignorePattern
  const outFile = api.resolve.app(api.prompts.outFile)
  const pagesImportPrefix = api.prompts.pagesImportPrefix
  const routePrefix = api.prompts.routePrefix

  const autoRouteWatcher = chokidar.watch(
    pagesDir,
    { ignored: ignorePattern } // ignore dotfiles
  )

  createIndexTemplate(routePrefix, layoutsDir, outFile)

  writeRoutesFile()

  autoRouteWatcher
    .on('add', () => writeRoutesFile())
    .on('unlink', () => writeRoutesFile())

  function writeRoutesFile () {
    const code = generateRoutes({
      pages: pagesDir,
      importPrefix: pagesImportPrefix,
      ...api.prompts.generatorConfig
    })
  
    if(!fs.existsSync(outFile)) {
      fs.writeFileSync(outFile, '')
    }
  
    if (
      fs.existsSync(outFile) &&
      fs.readFileSync(outFile, 'utf8').trim() === code.trim()
    ) {
      return
    }
  
    fs.writeFileSync(outFile, code)
  }
}