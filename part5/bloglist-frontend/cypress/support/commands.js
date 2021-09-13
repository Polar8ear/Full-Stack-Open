/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {
  const loginURL = 'http://localhost:3003/api/login'
  cy.request({
    url: loginURL,
    method: 'POST',
    body: user,
  })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.body))
      cy.wrap(response.body.token).as('token')
    })
})

Cypress.Commands.add('likeBlogOf', (blogToBeLiked) => {
  cy.get('#blogs')
    .contains(blogToBeLiked.title)
    .within(function () {
      cy.get('.likeBtn').click()
    })
})

Cypress.Commands.add('viewBlogOf', (blogToBeViewed) => {
  cy.get('#blogs')
    .contains(blogToBeViewed.title)
    .within(function () {
      cy.get('.viewBtn').click()
    })
})
