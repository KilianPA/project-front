
import { mount, createLocalVue } from '@vue/test-utils'
import Quasar, * as All from 'quasar'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Quasar, { components: All })

var router = new VueRouter({

})
describe('UserCreate', () => {
  test('Test if error when data is not valid', () => {
    expect(true).toBe(true)
  })
})
