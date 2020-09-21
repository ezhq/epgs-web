import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const loginCheck = () => {
    return localStorage.getItem('user') !== null && localStorage.getItem('token') !== null
  }

  Router.beforeEach((to, from, next) => {
    console.log(`--->Route: beforeEach: to: name: `, to.name)

    // next()

    if (to.name === 'login') {
      next()
    } else if (loginCheck()) {
      next()
    } else {
      next({ name: 'login' })
    }

  })

  return Router
}
