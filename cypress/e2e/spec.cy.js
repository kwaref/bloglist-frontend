describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST',  `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Karel Rodríguez Varona',
      username: 'karel',
      password: '123456789'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
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
      cy.login({
        username: 'karel', password: '123456789'
      })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'Fernando Pessoa',
        url: 'https://a.blog.by.cypress',
        likes: 0
      })
      cy.contains('a blog created by cypress')
    })

    describe('when a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'Fernando Pessoa',
          url: 'https://a.blog.by.cypress',
          likes: 0
        })
      })

      it('it can be liked', function () {
        cy.contains('a blog created by cypress').parent().as('wrapper')
        cy.get('@wrapper').contains('view').click()
        cy.get('@wrapper').find('.like-button').click()
        cy.get('@wrapper').find('#likes-holder').should('contain', '1')
      })

    })

  })
})