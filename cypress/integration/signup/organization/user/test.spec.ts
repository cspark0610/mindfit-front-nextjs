describe('User organization signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup/organization/user')
  })

  it('verify render', () =>
    cy.get('h1').should('contain.text', 'Registra tu usuario'))

  it('error login verify', () => {
    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'centriadevelopment@gmail.com',
      password: '123qwe!@#',
    })

    cy.get('strong.p-error').should(
      'contain.text',
      'Usuario o Contraseña incorrectos'
    )
  })

  it('success login verify', () => {
    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'josejmvasquez@gmail.com',
      password: '123qwe!@#',
    })

    cy.get('a.btn-primary').should('contain.text', 'Elige un plan')
  })
})
