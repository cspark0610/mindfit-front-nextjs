// @ts-ignore
Cypress.Commands.add('loginWithCredentials', () => {
  cy.visit(`${Cypress.env('BASE_URL')}/api/auth/signin/credentials`)

  cy.get('input[name=email]').type('centriadevelopment@gmail.com')
  cy.get('input[name=password]').type('123qwe!@#')
  cy.get('button[type=submit]').click()
})
