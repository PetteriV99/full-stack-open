describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('awrwarwarwarrwa')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.get('#showNewBlogForm').click()
      cy.get('#title').type('a new blog title')
      cy.get('#author').type('blog author')
      cy.get('#url').type('whatever.com')
      cy.get('#createBlog').click()
      cy.contains('a new blog title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'My Pony', author: 'Brony', url: 'google.fi' })
        cy.createBlog({ title: 'Neon Genesis Evangelion', author: 'Shinji', url: 'nge.fi' })
      })

      it('it can be liked', function () {
        cy.contains('Neon Genesis Evangelion')
          .contains('show')
          .click()

        cy.contains('nge.fi')
          .contains('like')
          .click()
      })
    })

    // ...
  })
})