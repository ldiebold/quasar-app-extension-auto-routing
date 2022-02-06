const { generateRoutes } = require('vue-route-generator')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')

const defaultConfig = {
  pagesDir: path.resolve(__dirname, './src/pages'),
  layoutsDir: path.resolve(__dirname, './src/layouts'),
  ignorePattern: /(^|[\/\\])\../,
  outFile: path.resolve(__dirname, 'src/routes/.routes.js')
}

const defaultGenerateRoutesConfig = {
  importPrefix: 'pages/'
}

module.exports = class AutoRoutingWebpackPlugin {
  constructor (config = {}, generateRoutesConfig = {}) {
    this.mergedConfig = Object.assign({}, defaultConfig, config)
    this.mergedGenerateRoutesConfig = Object.assign({}, defaultGenerateRoutesConfig, generateRoutesConfig)

    const { pagesDir, layoutsDir } = this.mergedConfig.pagesDir

    this.autoRouteWatcher = chokidar.watch(
      [pagesDir, layoutsDir],
      { ignored: config.ignorePattern } // ignore dotfiles
    )

    this.autoRouteWatcher
      .on('add', this.writeRoutesFile)
      .on('unlink', this.writeRoutesFile)

    this.writeRoutesFile()
  }

  writeRoutesFile () {
    const { pagesDir, outFile } = this.mergedConfig.pagesDir

    const code = generateRoutes({
      pages: pagesDir,
      importPrefix: 'pages/',
      ...this.mergedGenerateRoutesConfig
    })

    if (
      fs.existsSync(outFile) &&
      fs.readFileSync(outFile, 'utf8').trim() === code.trim()
    ) {
      return
    }

    fs.writeFileSync(outFile, code)
  }
};