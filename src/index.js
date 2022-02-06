const AutoRoutingWebpackPlugin = require("./AutoRoutingWebpackPlugin")

module.exports = function (api) {
  api.extendWebpack((cfg, context, api) => {
    cfg.plugins.push(new AutoRoutingWebpackPlugin())
  })
}

