const { generateRoutes } = require('vue-route-generator')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')

module.exports = function (api) {
  const pagesDir = api.prompts.pagesDir || api.resolve.src('pages')
  const layoutsDir = api.prompts.layoutsDir || api.resolve.src('layouts')
  const ignorePattern = api.prompts.ignorePattern || /(^|[\/\\])\../
  const outFile = api.prompts.outFile || api.resolve.src('router/auto-routing/generated-routes.js')
  const pagesImportPrefix = api.prompts.pagesImportPrefix || 'pages/'

  const autoRouteWatcher = chokidar.watch(
    pagesDir,
    { ignored: ignorePattern } // ignore dotfiles
  )

  // TODO: is this even needed?
  autoRouteWatcher.add(layoutsDir)

  writeRoutesFile()

  autoRouteWatcher
    .on('add', () => writeRoutesFile())
    .on('unlink', () => writeRoutesFile())

  function writeRoutesFile () {
    const code = generateRoutes({
      pages: pagesDir,
      importPrefix: pagesImportPrefix,
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
