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
import 'cypress-file-upload'

// types
import { UserDataType } from '../../src/types/models/User'

// @ts-ignore
Cypress.Commands.add('userSignupWithForm', (userData: UserDataType) => {
  cy.get('div.p-fileupload > span > input').attachFile(userData.picture)

  cy.get('input[name=firstName]')
    .type(userData.firstName)
    .should('have.value', userData.firstName)

  cy.get('input[name=lastName]')
    .type(userData.lastName)
    .should('have.value', userData.lastName)

  cy.get('input[name=email]')
    .type(userData.email)
    .should('have.value', userData.email)

  cy.get('input[name=password]')
    .type(userData.password)
    .should('have.value', userData.password)
    .focus()
})
