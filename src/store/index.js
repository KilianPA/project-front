import Vue from 'vue'
import Vuex from 'vuex'

import spotify from './spotify'
import auth from './auth'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      spotify,
      auth
    }
  })

  return Store
}
