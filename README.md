Quasar App Extension auto-routing
===

_Be sure to change this readme as appropriate for your app extension._

_Think about the organization of this file and how the information will be beneficial to the user._

> Add a short description of your App Extension. What does it do? How is it beneficial? Why would someone want to use it?

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

That's it!

# Find out more
Want to know how it all works? Take a look at [vue-route-generator](https://github.com/ktsn/vue-route-generator), which is what this App Extension is built on!

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
