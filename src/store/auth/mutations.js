/*
export function someMutation (state) {
}
*/
/*
export function someMutation (state) {
}
*/
import { LocalStorage } from 'quasar'

export function LOGIN (state, data) {
  LocalStorage.set('user', data)
}

export function LOGOUT (state, search) {
  LocalStorage.clear()
}
