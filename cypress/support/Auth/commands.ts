// @ts-ignore
Cypress.Commands.add('loginWithCredentials', () => {
  cy.visit(`${Cypress.env('BASE_URL')}/api/auth/signin/credentials`)

  cy.get('input[name=email]').type('centriadevelopment@gmail.com')
  cy.get('input[name=password]').type('123qwe!@#')
  cy.get('form')
    .invoke(
      'attr',
      'action',
      'http://localhost:3000/api/auth/callback/credentials'
    )
    .should(
      'have.attr',
      'action',
      'http://localhost:3000/api/auth/callback/credentials'
    )
  cy.get('button[type=submit]').click()
})
