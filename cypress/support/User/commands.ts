import 'cypress-file-upload'

// types
import { UserDataType } from '../../../src/types/models/User'

// @ts-ignore custom command
Cypress.Commands.add('userSignupWithForm', (userData: UserDataType) => {
  cy.get('button:not([class^=btn-close])')
    .should('contain', 'Registra tu usuario')
    .should('have.attr', 'disabled')

  cy.get('input[name=firstName]')
    .type(userData.firstName as string)
    .should('have.value', userData.firstName as string)

  cy.get('input[name=lastName]')
    .type(userData.lastName as string)
    .should('have.value', userData.lastName as string)

  cy.get('input[name=email]')
    .type(userData.email as string)
    .should('have.value', userData.email as string)

  cy.get('input[name=password]')
    .focus()
    .type(userData.password as string)
    .should('have.value', userData.password as string)

  cy.get('div.p-password-panel')
    .find('ul li')
    .first()
    .should('contain.html', 'i')
    .next()
    .should('contain.html', 'i')
    .next()
    .should('contain.html', 'i')
    .next()
    .should('contain.html', 'i')

  cy.get('input[name=password]').blur()

  cy.get('button:not([class^=btn-close])')
    .should('contain', 'Registra tu usuario')
    .should('not.have.attr', 'disabled')
})
