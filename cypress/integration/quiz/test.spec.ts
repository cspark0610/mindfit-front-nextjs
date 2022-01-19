describe('Quiz user', () => {
  beforeEach(() => {
    // @ts-ignore custom command
    cy.loginWithAPICredentials()
    cy.wait(3000)
    cy.visit('/quiz')
  })

  it('verify render', () => {
    cy.get('h1').should('have.text', 'Prueba de auto - diagnóstico')

    cy.get('button').then((button) => {
      expect(button).to.be.disabled
    })
  })

  it('verify that the test can be completed', () => {
    let slidesQuantity = 0

    cy.get('div.carousel-inner')
      .find('div.carousel-item')
      .then((slides) => (slidesQuantity = slides.length))

    cy.get('div.carousel-inner')
      .find('div.carousel-item')
      .each((slide, idx) => {
        const actualSlide = idx + 1

        if (actualSlide === 1)
          cy.get('div[class^=page_row] button')
            .first()
            .should('have.attr', 'disabled')
        else
          cy.get('div[class^=page_row] button')
            .first()
            .should('not.have.attr', 'disabled')

        if (actualSlide < slidesQuantity)
          cy.get('button').contains(actualSlide).should('have.attr', 'disabled')
        else
          cy.get('button')
            .contains('Terminar test')
            .should('have.attr', 'disabled')

        slide.find('.row').each((index, question) => {
          const answer = question.querySelector('div')
          answer.className = `${question.className} ${idx}-${index}`

          cy.get(`.${idx}-${index}`)
            .next()
            .find('.p-radiobutton')
            .first()
            .click()
        })

        if (actualSlide < slidesQuantity) {
          cy.get('button')
            .contains(actualSlide)
            .should('not.have.attr', 'disabled')

          cy.get('button').contains(actualSlide).click()
        } else {
          cy.get('button')
            .contains('Terminar test')
            .should('not.have.attr', 'disabled')

          cy.get('button').contains('Terminar test').click()
        }
      })
  })
})
