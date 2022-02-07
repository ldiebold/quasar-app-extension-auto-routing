module.exports = function (api) {
  /**
   * This supplies a default "layout" and
   * sets up the auto-routing folder
   */
  api.render('templates')

  /**
   * Almost all users will likely want that same setup for
   * auto-routing, so we simply setup the
   * defaults without prompting.
   */
  api.extendJsonFile('quasar.extensions.json', {
    'auto-routing': {
      pagesDir: 'src/pages',
      routePrefix: '',
      layoutsDir: 'src/layouts',
      ignorePattern: /(^|[\/\\])\../,
      outFile: 'src/router/auto-routing/generated-routes.js',
      pagesImportPrefix: 'pages/',
      generatorConfig: {}
    }
  })
}
