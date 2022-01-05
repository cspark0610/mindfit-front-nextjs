import 'cypress-file-upload'

// utils
import { phoneFormatter } from '../../commons'

// types
import { CompanyDataType } from '../../../src/types/models/Company'

Cypress.Commands.add(
  // @ts-ignore
  'companySignupWithForm',
  (companyData: CompanyDataType) => {
    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('have.attr', 'disabled')

    cy.get('div.p-fileupload > span > input').attachFile(companyData.picture)

    cy.get('input[name=name]')
      .type(companyData.name)
      .should('have.value', companyData.name)

    cy.get('input[name=phone]')
      .type(companyData.phone)
      .should('have.value', phoneFormatter(companyData.phone))

    cy.get('input[name=email]')
      .type(companyData.email)
      .should('have.value', companyData.email)

    cy.get('button:not([class^=btn-close])')
      .should('contain', 'Registra tu empresa')
      .should('not.have.attr', 'disabled')
  }
)
