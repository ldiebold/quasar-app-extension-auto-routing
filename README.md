Quasar App Extension auto-routing
===

\"Nuxt-like\" routing in Quasar projects

# Install
```bash
quasar ext add auto-routing
```
Quasar CLI will retrieve it from the NPM registry and install the extension to your project.

Lastly, dive into `src/router/routes.js` and use the generated routes:

```js
import generatedRoutes from './auto-routing' // 🤿 Here

const routes = [
  ...generatedRoutes, // 🤿 And here
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
```

# Linting
You may want to ignore linting on the auto-generated routes!
Add the following at the bottom of your `.eslintignore` file:
```
/src/router/auto-routing
```

That's it! Start adding pages to your `src/pages` directory and the routing will be automagically done for you!

Also take a look at `src/layouts/default.vue` to change the default used layout.

# A note about `routePrefix`
When adding a `routePrefix` in `quasar.extensions.json`, be sure to also set `"nested": true` inside `generatorConfig`. This is best shown with an example!

```js
{
  "auto-routing": {
    "pagesDir": "src/pages",
    "routePrefix": "/admin", // 🤿 Set a prefix for routes
    "layoutsDir": "src/layouts",
    "ignorePattern": "/(^|[/\\])../",
    "outDir": "src/router/auto-routing",
    "pagesImportPrefix": "pages/",
    "generatorConfig": {
      "nested": true // 🤿 Tell the generator to treat ALL routes as nested.
    }
  }
}
```

# References
Note that we can also proxy settings to [vue-route-generator](https://github.com/ktsn/vue-route-generator) with the `generatorConfig` property

- `pagesDir`: path to the page components
- `routePrefix`: prefix all routes (e.g. `/posts`). See section above on "routePrefix"
- `layoutsDir`: path to the layout components
- `ignorePattern`: files that match this pattern will be ignored by the generator in your `pages` and `layout` dir
- `outDir`: directory that holds generated routes
- `pagesImportPrefix`: When generating routes, this prefix is used. By default, we use Quasar's `pages` alias (`pages/`)
- `generatorConfig`: See [vue-route-generator "References"](https://github.com/ktsn/vue-route-generator) for all available options

# Find out more
Want to know how it all works? Take a look at [vue-route-generator](https://github.com/ktsn/vue-route-generator), which is what this App Extension is built on!

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
