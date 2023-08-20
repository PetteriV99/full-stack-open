describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user_1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user_2 = {
      name: 'Luukas Mattilainen',
      username: 'luuksm',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user_1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user_2)
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
        cy.createBlog({ title: 'What a nice title', author: 'Me', url: 'wararwar.com' })
      })

      it('it can be liked', function () {
        cy.contains('Neon Genesis Evangelion')
          .contains('show')
          .click()

        cy.contains('nge.fi')
          .contains('like')
          .click()
      })

      it('it can be removed', function () {
        cy.contains('Neon Genesis Evangelion')
          .contains('show')
          .click()

        cy.contains('nge.fi')
          .contains('remove')
          .click()
      })

      it('only the user that added the blog can see the remove button', function () {
        cy.get('#logout').click()
        cy.login({ username: 'luuksm', password: 'salainen' })
        cy.contains('Neon Genesis Evangelion')
          .contains('show')
          .click()
        cy.contains('Neon Genesis Evangelion').should('not.contain', 'remove')
      })

      it('blogs are sorted by most likes', function () {
        cy.contains('Neon Genesis Evangelion')
          .contains('show')
          .click()

        cy.contains('My Pony')
          .contains('show')
          .click()

        cy.contains('nge.fi')
          .contains('like')
          .click()

        cy.contains('nge.fi')
          .contains('like')
          .click()

        cy.contains('google.fi')
          .contains('like')
          .click()

        cy.get('.blog').eq(0).should('contain', 'Neon Genesis Evangelion')
        cy.get('.blog').eq(1).should('contain', 'My Pony')
      })

    })
  })
})