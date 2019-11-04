export const state = () => ({
  mode: 'light',
  visitedDate: null
})

export const getters = {
  visitedDate: state => state.visitedDate
}

export const mutations = {
  CHANGE_MODE(state, mode) {
    localStorage.mode = mode
    const html = document.querySelector('html')
    html.className = ''
    html.classList.add(mode)
    state.mode = mode
  },
  CHANGE_VISITED_DATE(state, date) {
    state.visitedDate = localStorage.visitedDate
    localStorage.visitedDate = date
  }
}

export const actions = {
  changeMode({ commit }, mode) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const darkModeOn = darkModeMediaQuery.matches
    commit('CHANGE_MODE', mode || (darkModeOn ? 'dark' : 'light'))
  },
  changeVisitedDate({ commit }, date) {
    commit('CHANGE_VISITED_DATE', date)
  }
}
