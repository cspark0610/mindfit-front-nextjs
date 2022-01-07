// @ts-ignore
Cypress.Commands.add('logout', () => {
  cy.visit('/api/auth/signout')
  cy.get('form').submit()
})

// @ts-ignore
Cypress.Commands.add('loginWithCredentials', () => {
  const cookieName = Cypress.env('COOKIE_NAME')
  const loginOptions = {
    headless: false,
    loginUrl: `${Cypress.env('SITE_NAME')}/login`,
    usernameField: 'input[name=email]',
    passwordField: 'input[name=password]',
    username: 'centriadevelopment@gmail.com',
    password: '123qwe!@#',
    passwordSubmitBtn: 'button[type=submit]',
    postLoginSelector: 'img[alt="user avatar"]',
  }

  cy.task('CredentialsLoginTask', loginOptions).then((res: any) => {
    cy.clearCookies()
    const cookie = res.cookies.find((cookie: any) => cookie.name === cookieName)
    if (cookie) {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        secure: cookie.secure,
      })

      Cypress.Cookies.defaults({ preserve: cookieName })
    }
  })
})
