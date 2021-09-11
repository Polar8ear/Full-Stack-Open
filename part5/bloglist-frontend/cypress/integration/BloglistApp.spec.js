describe('Bloglist app', function() {
  const user = {
    name: 'polar8ear',
    username : 'polar8ear02',
    password : 'polar8ear',
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username').parent().find('input')
    cy.contains('Password').parent().find('input')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
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

    it('fails with wrong credentials', function() {
      cy.contains('Username').parent().find('input')
        .type(user.username)

      cy.contains('Password').parent().find('input')
        .type('WrongPassword')

      cy.contains('login')
        .click()

      cy.get('.notification.error')
        .should('contain','Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})