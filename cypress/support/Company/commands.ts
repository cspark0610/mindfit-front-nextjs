import 'cypress-file-upload'

// types
import { OrganizationDataType } from '../../../src/types/models/Organization'

Cypress.Commands.add(
  // @ts-ignore custom command
  'companySignupWithForm',
  (companyData: OrganizationDataType) => {
    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('have.attr', 'disabled')

    cy.get('div.p-fileupload > span > input').attachFile(
      companyData.profilePicture as File
    )

    cy.get('input[name=name]')
      .type(companyData.name as string)
      .should('have.value', companyData.name as string)

    cy.get('textarea[name=about]')
      .type(companyData.about as string)
      .should('have.value', companyData.about as string)

    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('not.have.attr', 'disabled')
  }
)
