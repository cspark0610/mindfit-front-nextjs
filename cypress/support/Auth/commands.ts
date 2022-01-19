// @ts-ignore custom command
Cypress.Commands.add('verifyActiveSession', (isActive: boolean) => {
  cy.request('/api/auth/session').then((res) => {
    expect(res.status).to.eq(200)

    cy.log(JSON.stringify(res.allRequestResponses[0]['Request URL']))

    isActive
      ? expect(res.body.user).to.have.property('name')
      : expect(res.body).not.to.have.property('user')
  })
})

// @ts-ignore custom command
Cypress.Commands.add('logout', () => {
  cy.visit('/api/auth/signout')
  cy.get('form').submit()
})

// @ts-ignore custom command
Cypress.Commands.add('loginWithAPICredentials', () => {
  cy.visit('/api/auth/signin')

  cy.get('input[name=email]')
    .type('centriadevelopment@gmail.com')
    .should('have.value', 'centriadevelopment@gmail.com')

  cy.get('input[name=password]')
    .type('123456789#')
    .should('have.value', '123456789#')

  cy.get('button').contains('credentials').click()
})
