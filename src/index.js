const { generateRoutes } = require('vue-route-generator')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const createIndexTemplate = require('./createIndexTemplate')

module.exports = function (api) {
  const pagesDir = api.resolve.app(api.prompts.pagesDir)
  const layoutsDir = api.resolve.app(api.prompts.layoutsDir)
  const outDir = api.resolve.app(api.prompts.layoutsDir)
  const generatedRoutesFile = api.resolve.app(api.prompts.outDir + '/generated-routes.js')
  const indexFile = api.resolve.app(api.prompts.outDir + '/index.js')

  const ignorePattern = api.prompts.ignorePattern

  const pagesImportPrefix = api.prompts.pagesImportPrefix
  const routePrefix = api.prompts.routePrefix

  // ensure the destination and its files exist
  if(!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
  }

  const autoRouteWatcher = chokidar.watch(
    pagesDir,
    { ignored: ignorePattern } // ignore dotfiles
  )

  createIndexTemplate(routePrefix, layoutsDir, indexFile)

  writeRoutesFile()

  autoRouteWatcher
    .on('add', () => writeRoutesFile())
    .on('unlink', () => writeRoutesFile())

  function writeRoutesFile () {
    let code = generateRoutes({
      pages: pagesDir,
      importPrefix: pagesImportPrefix,
      ...api.prompts.generatorConfig
    })

    code = "/* eslint-disable */\n" + code
  
    if(!fs.existsSync(generatedRoutesFile)) {
      fs.writeFileSync(generatedRoutesFile, '')
    }
  
    if (
      fs.existsSync(generatedRoutesFile) &&
      fs.readFileSync(generatedRoutesFile, 'utf8').trim() === code.trim()
    ) {
      return
    }
  
    fs.writeFileSync(generatedRoutesFile, code)
  }
}