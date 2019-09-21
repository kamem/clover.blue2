/// <reference types="Cypress" />

context('Top', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1341/')
  })

  it('タイトルがclover.blueと表示', () => {
    cy.title().should('include', 'clover.blue')
  })

  it('記事をクリックしたとき', () => {
    cy.get('#Qiita .list-item:first-of-type a')
      .click()
      .then($el => {
        const text = $el
          .text()
          .replace(/^\s+/g, '')
          .replace(/\n/gi, '')
          .replace(/\s+$/g, '')
        cy.title().should('include', `${text} - clover.blue`)
      })
  })
})
