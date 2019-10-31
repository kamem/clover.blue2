export const state = () => ({
  mode: 'light'
})

export const mutations = {
  CHANGE_MODE(state, mode) {
    localStorage.mode = mode
    const html = document.querySelector('html')
    html.className = ''
    html.classList.add(mode)
    state.mode = mode
  }
}

export const actions = {
  changeMode({ commit }, mode) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const darkModeOn = darkModeMediaQuery.matches
    commit('CHANGE_MODE', mode || (darkModeOn ? 'dark' : 'light'))
  }
}
