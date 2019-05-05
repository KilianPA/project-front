/*
export function someMutation (state) {
}
*/
export function ADD_SPOTIFY_SEARCH (state, search) {
  state.spotifySearch = search
}
export function ADD_FORM_ARTIST (state, data) {
  state.form[data.key] = data.value
}
export function ADD_FORM_SONG (state, data) {
  state.form[data.key] = data.value
}

export function SET_CURRENT_DIV (state, data) {
  state.currentDiv = data
}
