describe('Quiz user', () => {
  beforeEach(() => {
    // @ts-ignore custom command
    cy.loginWithAPICredentials()
    cy.visit('/quiz')
  })

  it('verify render', () => {
    const questionIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    cy.contains('Prueba de auto - diagnóstico')
    questionIndex.forEach((index) => {
      cy.contains(`Texto de la pregunta ${index}`)
    })
    cy.contains('Total desacuerdo')
    cy.contains('En desacuerdo')
    cy.contains('De acuerdo')
    cy.contains('Muy de acuerdo')
    cy.get('button').contains('Pregunta anterior').should('be.disabled')
    cy.get('button').contains('Siguiente pregunta').should('be.disabled')
  })

  it('verify that the test can be completed', () => {
    const answers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    answers.forEach((index) => {
      cy.get(
        `input[id=Texto_de_la_pregunta_${index}-${Math.floor(
          Math.random() * (3 - 0 + 1) + 0
        )}]`
      ).click({ force: true })
      if (index % 3 === 0) {
        if (index === 9) {
          cy.get('button').contains('Terminar test').click()
        } else {
          cy.get('button').contains('Siguiente pregunta').click()
          cy.get('button').contains('Pregunta anterior').click()
          cy.get('button').contains('Siguiente pregunta').click()
        }
      }
    })
  })
})
