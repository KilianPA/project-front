import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './routes'
import {LocalStorage} from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  var whitelist = ['users.login', 'users.create', 'users.created', 'users.edit', 'index']

  Router.beforeEach((to, from, next) => {
    if (whitelist.includes(to.name)) {
      next()
    } else {
      if (LocalStorage.get.item('token')) {
        axios({
          method: 'get',
          url: process.env.API + 'user',
          headers: {'Authorization': 'Bearer ' + LocalStorage.get.item('token')}
        }).then(response => {
          if (response.status === 200) {
            LocalStorage.set('user', response.data)
            next()
          }
        })
      } else {
        next({name: 'index'})
      }
    }
  })

  return Router
}
