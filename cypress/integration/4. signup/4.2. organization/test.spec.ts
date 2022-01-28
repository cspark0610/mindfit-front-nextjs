describe('User organization signup', () => {
  // beforeEach(() => cy.visit('/signup/organization'))
  // it('verify render', () => {
  //   cy.get('.container-fluid > div[class^="stepsCard"]').then((steps) => {
  //     expect(steps, '3 items').to.have.length(3)
  //     expect(steps.eq(0), 'first item').to.contain('Registra a tu empresa')
  //     expect(steps.eq(1), 'second item').to.contain('Elige un plan')
  //     expect(steps.eq(2), 'third item').to.contain('Invita a tus colaboradores')
  //   })
  //   cy.get('a').should('contain.text', '¡Empecemos!')
  // })
  // // @ts-ignore custom command
  // it('verify not loged user', () => cy.verifyActiveSession(false))
  // it("verify organization's signup forms", () => {
  //   cy.get('a').should('contain.text', '¡Empecemos!').click()
  //   cy.wait(3000)
  //   cy.url().should('contain', 'signup/organization/user')
  //   // @ts-ignore custom command
  //   cy.userSignupWithForm({
  //     picture: 'avatar.png',
  //     firstName: 'Centria',
  //     lastName: 'Group',
  //     email: 'centriadevelopment@gmail.com',
  //     password: '123456789#',
  //   })
  //   cy.get('button:not([class^=btn-close])')
  //     .contains('Registra tu usuario')
  //     .click()
  //   cy.wait(3000)
  //   // @ts-ignore custom command
  //   cy.verifyActiveSession(true)
  //   // @ts-ignore custom command
  //   cy.companySignupWithForm({
  //     profilePicture: 'avatar.png',
  //     name: 'Centria',
  //     about: 'Company description',
  //   })
  //   cy.get('button:not([class^=btn-close])')
  //     .contains('Registra tu empresa')
  //     .click()
  //   cy.wait(3000)
  //   cy.url().should('contain', '/signup/organization')
  //   // @ts-ignore custom command
  //   cy.logout()
  //   // @ts-ignore custom command
  //   cy.verifyActiveSession(false)
  // })
})
