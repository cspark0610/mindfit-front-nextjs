describe('login', () => {
  it('verify login with credentials', () => {
    // @ts-ignore custom command
    cy.verifyActiveSession(false)

    // @ts-ignore custom command
    cy.loginWithAPICredentials()

    // @ts-ignore custom command
    cy.verifyActiveSession(true)
  })
})

describe('logout', () => {
  it('verify logout', () => {
    // @ts-ignore custom command
    cy.verifyActiveSession(true)

    // @ts-ignore custom command
    cy.logout()

    // @ts-ignore custom command
    cy.verifyActiveSession(false)
  })
})
