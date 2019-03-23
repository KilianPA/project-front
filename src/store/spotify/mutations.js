/*
export function someMutation (state) {
}
*/
export function ADD_SPOTIFY_SEARCH (state, search) {
  state.spotifySearch = search
}
export function ADD_FORM_ARTIST (state, data) {
  console.log(state.form[data.key])
  state.form[data.key] = data.value
}
export function ADD_FORM_SONG (state, data) {
  console.log(state.form[data.key])
  state.form[data.key] = data.value
}

export function SET_CURRENT_DIV (state, data) {
  state.currentDiv = data
}
