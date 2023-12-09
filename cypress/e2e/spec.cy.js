describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Karel Rodríguez Varona',
      username: 'karel',
      password: '123456789'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#input-username').type('karel')
      cy.get('#input-password').type('123456789')
      cy.get('#button-login').click()

      cy.contains('Karel Rodríguez Varona logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#input-username').type('karel')
      cy.get('#input-password').type('1234567')
      cy.get('#button-login').click()

      cy.contains('invalid username or password')
      cy.contains('Log in to application')
      cy.get('#notification-message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('karel')
      cy.get('input:last').type('123456789')
      cy.get('#button-login').click()
    })

    // it('a new note can be created', function() {
    //   cy.contains('new blog').click()
    //   cy.get('#titleInput').type('a blog created by cypress')
    //   cy.get('#authorInput').type('Fernando Pessoa')
    //   cy.get('#urlInput').type('https://a.blog.by.cypress')
    //   cy.contains('create').click()
    //   cy.contains('a blog created by cypress')
    // })

    // it('a blog can be liked', function () {
    //   cy.contains('a blog created by cypress').parent().as('wrapper')
    //   cy.get('@wrapper').contains('View').click()
    //   cy.get('@wrapper').find('#like-button').click()
    //   cy.get('@wrapper').find('#likes-holder').should('contain', '1')
    // })
  })
})