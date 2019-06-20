/*
export function someAction (context) {
}
*/
export function addSearch (context, search) {
  context.commit('ADD_SPOTIFY_SEARCH', search)
}

export function setCurrentDiv (context, div) {
  context.commit('SET_CURRENT_DIV', div)
}

export function addForm (context, data) {
  if (data.key === 'artist') {
    context.commit('ADD_FORM_ARTIST', data)
  } else {
    context.commit('ADD_FORM_SONG', data)
  }
}
