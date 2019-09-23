/// <reference types="Cypress" />
import moment from 'moment'
const host = 'http://localhost:1341/'

const pages = [
  {
    name: 'top',
    path: ''
  },
  {
    name: 'qiita',
    path: 'items/1c49f329356e80bf3ba2'
  },
  {
    name: 'dropbox',
    path: 'doc/9WDB0txcfl2q72GhoeOtX'
  },
  {
    name: 'instagram',
    path: 'p/B2JgI33A57Z'
  },
  {
    name: 'youtube',
    path: 'watch/VVV6UVdrY0YzcWxXUEc4TjZYbVNMSkVnLjJXal9mV2ZNQ0JV'
  }
]

pages.forEach(({ name, path }) => {
  context(name, () => {
    beforeEach(() => {
      cy.visit(`${host}${path}`)
    })

    it(`${name} screenshot`, () => {
      cy.screenshot(`${name}/normal/${moment().format()}`)
    })
  })
})

pages.forEach(({ name, path }) => {
  context(`small_${name}`, () => {
    beforeEach(() => {
      cy.viewport(320, 480)
      cy.visit(`${host}${path}`)
    })

    it(`${name} screenshot`, () => {
      cy.screenshot(`${name}/small/${moment().format()}`)
    })
  })
})
