describe('User organization signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup/organization')
  })

  it('verify render', () => cy.get('a').should('contain.text', '¡Empecemos!'))

  it('signup verify', () => {
    cy.get('a').should('contain.text', '¡Empecemos!').click()

    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'centriadevelopment@gmail.com',
      password: '123qwe!@#',
    })

    // @ts-ignore
    cy.companySignupWithForm({
      picture: 'avatar.png',
      name: 'Centria',
      phone: '+584147545160',
      email: 'centriadevelopment@gmail.com',
    })
  })
})
