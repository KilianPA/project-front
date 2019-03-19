/*
export function someAction (context) {
}
*/
export function login (context, data) {
  context.commit('LOGIN', data)
}
export function logout (context) {
  context.commit('LOGOUT')
}
