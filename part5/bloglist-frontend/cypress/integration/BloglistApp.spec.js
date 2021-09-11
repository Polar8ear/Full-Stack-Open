/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Bloglist app', function () {
  const user = {
    name: 'polar8ear',
    username: 'polar8ear02',
    password: 'polar8ear',
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Username').parent().find('input')
    cy.contains('Password').parent().find('input')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Username').parent().find('input')
        .type(user.username)

      cy.contains('Password').parent().find('input')
        .type(user.password)

      cy.contains('login')
        .click()

      cy.contains('polar8ear is logged in')

      cy.contains('Blogs')
      cy.contains('Logout')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Username').parent().find('input')
        .type(user.username)

      cy.contains('Password').parent().find('input')
        .type('WrongPassword')

      cy.contains('login')
        .click()

      cy.get('.notification.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function () {
    const newBlog = {
      title: 'Amazon starts making its own TVs with new Fire TV Omni and 4-Series',
      author: 'Chris Welch',
      url: 'https://www.theverge.com/2021/9/9/22662673/amazon-fire-tv-omni-4-series-price-features',
    }

    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', { username: user.username, password: user.password })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('a blog can be created', function () {
      cy.contains('Create New Blog')
        .click()

      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)

      cy.get('#createBtn').click()

      cy.get('.notification')
        .should('contain', 'a new blog')
        .and('contain', 'added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('#blogs').contains(`${newBlog.title} ${newBlog.author}`)
    })
  })
})
