describe('User colaborator signup', () => {
  beforeEach(() =>
    cy.visit(
      '/signup/colaborator/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNlbnRyaWFkZXZlbG9wbWVudEBnbWFpbC5jb20ifQ.w_Aeo8Y-XE3W5kBT5oBaFiD4b1Cxu5wvbJZeyDFw1Uc'
    )
  )

  it('verify render', () => cy.get('h1').should('have.text', 'Bienvenido a'))

  it('verify non invited user', () => {
    cy.visit('/signup/colaborator/non_invited')

    cy.get('button')
      .contains('Registrar Contraseña')
      .should('have.attr', 'disabled')

    cy.get('input[name=email]')
      .should('have.value', '')
      .should('have.attr', 'disabled')

    cy.get('input[name=password]')
      .should('have.value', '')
      .should('have.attr', 'disabled')

    cy.get('strong').should('have.class', 'p-error')
  })

  it('verify invited user', () => {
    cy.get('input[name=email]')
      .should('have.value', 'centriadevelopment@gmail.com')
      .should('have.attr', 'disabled')

    cy.get('input[name=password]')
      .should('have.value', '')
      .should('not.have.attr', 'disabled')

    cy.get('input[name=password]')
      .focus()
      .type('123456789#')
      .should('have.value', '123456789#')

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

    cy.get('input[name=password]').blur()

    cy.get('button')
      .contains('Registrar Contraseña')
      .should('not.have.attr', 'disabled')

    cy.get('button').contains('Registrar Contraseña').click()

    cy.wait(3000)
    cy.url().should('contain', 'colaborator/steps')

    // @ts-ignore custom command
    cy.verifyActiveSession(true)

    cy.get('.container-fluid > div[class^="stepsCard"]').then((steps) => {
      expect(steps, '3 items').to.have.length(3)
      expect(steps.eq(0), 'first item').to.contain('Completa tu perfil')
      expect(steps.eq(1), 'second item').to.contain('Realiza la prueba')
      expect(steps.eq(2), 'third item').to.contain('Elige un coach')
    })

    // cy.get('a').should('contain.text', 'Realiza la prueba')

    // @ts-ignore custom command
    cy.logout()

    // @ts-ignore custom command
    cy.verifyActiveSession(false)
  })
})
