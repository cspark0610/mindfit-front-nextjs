describe('User login', () => {
  beforeEach(() => cy.visit('/login'))

  it('verify render', () => {
    cy.get('img[alt="Mindfit Logo"]')
    cy.get('input[name=email]').should('have.value', '')
    cy.get('input[name=password]').should('have.value', '')
    cy.get('button').should('have.text', 'Iniciar sesión')
  })

  it('verify wrong login with form', () => {
    cy.get('input[name=email]').type('wrongemail@gmail.com')

    cy.get('input[name=password]').type('wrongpassword')

    cy.get('button').contains('Iniciar sesión').click()

    cy.wait(3000)

    cy.get('strong')
      .should('exist')
      .should('have.class', 'p-error')
      .should('contain', 'Usuario o Contraseña incorrectos')
  })

  it('verify login with form', () => {
    cy.get('input[name=email]').type('centriadevelopment@gmail.com')

    cy.get('input[name=password]').type('123456789#')

    cy.get('button').contains('Iniciar sesión').click()

    cy.wait(3000)

    cy.get('aside[class^=sidebar]').should('exist')
  })
})
