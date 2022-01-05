describe('User organization signup', () => {
  beforeEach(() => {
    cy.visit('/signup/organization')
  })

  it('verify render', () => {
    cy.get('.container-fluid > div[class^="stepsCard"]').then((steps) => {
      expect(steps, '3 items').to.have.length(3)
      expect(steps.eq(0), 'first item').to.contain('Registra a tu empresa')
      expect(steps.eq(1), 'second item').to.contain('Elige un plan')
      expect(steps.eq(2), 'third item').to.contain('Invita a tus colaboradores')
    })
  })

  it('verify complete user signup', () => {
    cy.get('a').should('contain.text', '¡Empecemos!').click()

    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'centriadevelopment@gmail.com',
      password: '123qwe!@#',
    })
  })

  it('verify complete company signup', () => {
    // @ts-ignore
    cy.loginWithCredentials()

    cy.visit('/signup/organization/company')

    // @ts-ignore
    cy.companySignupWithForm({
      picture: 'avatar.png',
      name: 'Centria',
      phone: '+584147545160',
      email: 'centriadevelopment@gmail.com',
    })
  })
})
