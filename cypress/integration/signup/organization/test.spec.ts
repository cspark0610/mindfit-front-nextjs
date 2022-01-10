describe('User organization signup', () => {
  beforeEach(() => cy.visit('/signup/organization'))

  it('verify render', () => {
    cy.get('.container-fluid > div[class^="stepsCard"]').then((steps) => {
      expect(steps, '3 items').to.have.length(3)
      expect(steps.eq(0), 'first item').to.contain('Registra a tu empresa')
      expect(steps.eq(1), 'second item').to.contain('Elige un plan')
      expect(steps.eq(2), 'third item').to.contain('Invita a tus colaboradores')
    })

    cy.get('a').should('contain.text', '¡Empecemos!')
  })

  // @ts-ignore custom command
  it('verify not loged user', () => cy.verifyActiveSession(false))

  it("verify organization's signup forms", () => {
    cy.get('a').should('contain.text', '¡Empecemos!').click()

    // @ts-ignore custom command
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'centriadevelopment@gmail.com',
      password: '123qwe!@#',
    })

    cy.get('button:not([class^=btn-close])')
      .contains('Registra tu usuario')
      .click()

    cy.url().should('contain', '/company')

    // @ts-ignore custom command
    cy.verifyActiveSession(true)

    // @ts-ignore custom command
    cy.companySignupWithForm({
      picture: 'avatar.png',
      name: 'Centria',
      phone: '+584147545160',
      email: 'centriadevelopment@gmail.com',
    })

    cy.get('button:not([class^=btn-close])')
      .contains('Registra tu empresa')
      .click()

    cy.url().should('contain', '/signup/organization')

    // @ts-ignore custom command
    cy.logout()

    // @ts-ignore custom command
    cy.verifyActiveSession(false)
  })
})
