/*
export function someAction (context) {
}
*/
export function addSearch (context, search) {
  context.commit('ADD_SPOTIFY_SEARCH', search)
}

export function addForm (context, data) {
  console.log(data)
  if (data.key === 'artist') {
    context.commit('ADD_FORM_ARTIST', data)
  } else {
    context.commit('ADD_FORM_SONG', data)
  }
}
