module.exports = function (api) {
  if(api.prompts.useLayouts) {
    api.render('templates')
  }
}
