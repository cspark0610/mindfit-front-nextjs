describe('User organization signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup/organization/user')
  })

  it('login error verify', () => {
    cy.get('div.container-fluid')
      .find('button:not([class^=btn-close])')
      .should('contain', 'Registra tu usuario')
      .should('have.attr', 'disabled')

    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'centriadevelopment@gmail.com',
      password: '123qwe!@#',
    })

    cy.get('div.p-password-panel')
      .find('ul li')
      .first()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')

    cy.get('input[name=password]').type('123abc!@#').blur()

    cy.get('div.container-fluid')
      .find('button:not([class^=btn-close])')
      .should('contain', 'Registra tu usuario')
      .should('not.have.attr', 'disabled')

    cy.get('div.container-fluid').find('button:not([class^=btn-close])').click()
    cy.get('strong.p-error').should(
      'contain.text',
      'Usuario o Contraseña incorrectos'
    )
  })

  it('login success verify', () => {
    cy.get('div.container-fluid')
      .find('button:not([class^=btn-close])')
      .should('contain', 'Registra tu usuario')
      .should('have.attr', 'disabled')

    // @ts-ignore
    cy.userSignupWithForm({
      picture: 'avatar.png',
      firstName: 'Centria',
      lastName: 'Group',
      email: 'josejmvasquez@gmail.com',
      password: '123qwe!@#',
    })

    cy.get('div.p-password-panel')
      .find('ul li')
      .first()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')
      .next()
      .should('contain.html', 'i')

    cy.get('input[name=password]').type('123abc!@#').blur()

    cy.get('div.container-fluid')
      .find('button:not([class^=btn-close])')
      .should('contain', 'Registra tu usuario')
      .should('not.have.attr', 'disabled')

    cy.get('div.container-fluid').find('button:not([class^=btn-close])').click()
    cy.get('a.btn-primary').should('contain.text', 'Elige un plan')
  })
})
