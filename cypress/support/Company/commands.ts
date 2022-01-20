import 'cypress-file-upload'

// utils
import { phoneFormatter } from '../../commons'

// types
import { CompanyDataType } from '../../../src/types/models/Company'

Cypress.Commands.add(
  // @ts-ignore custom command
  'companySignupWithForm',
  (companyData: CompanyDataType) => {
    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('have.attr', 'disabled')

    cy.get('div.p-fileupload > span > input').attachFile(
      companyData.picture as File
    )

    cy.get('input[name=name]')
      .type(companyData.name as string)
      .should('have.value', companyData.name as string)

    cy.get('input[name=phone]')
      .type(companyData.phone)
      .should('have.value', phoneFormatter(companyData.phone as string))

    cy.get('input[name=email]')
      .type(companyData.email as string)
      .should('have.value', companyData.email as string)

    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('not.have.attr', 'disabled')
  }
)
