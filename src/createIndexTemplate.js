const template = require('lodash.template')
const fs = require('fs')

/**
 * This template is used to create an index.js file that
 * will be imported and used inside routes.js
 */
const indexTemplate = `import { createRouterLayout } from 'vue-router-layout'
import generatedRoutes from './generated-routes'

const RouterLayout = createRouterLayout(layout => {
  return import('<%= layoutsDir %>/' + layout + '.vue')
})

export default [
  {
    path: '<%= routePrefix %>',
    component: RouterLayout,
    children: generatedRoutes
  }
]`

const compile = template(indexTemplate)

/**
 * 
 * @param {String} routePrefix prefix before pages (e.g. 'admin')
 * @param {String} layoutsDir directory where layouts are located
 * @param {String} outFile file to write to
 * @returns void
 */
module.exports = function createIndexTemplate(routePrefix, layoutsDir, outFile) {
  // Fill the template
  const code = compile({ routePrefix, layoutsDir, outFile })
  
  /**
   * The following ensures the destination exists
   * then writes the files
   */
  if(!fs.existsSync(outFile)) {
    fs.writeFileSync(outFile, '')
  }

  if (
    fs.existsSync(outFile) &&
    fs.readFileSync(outFile, 'utf8').trim() === code.trim() // don't write if nothing changed
  ) {
    return
  }

  fs.writeFileSync(outFile, code)
}
