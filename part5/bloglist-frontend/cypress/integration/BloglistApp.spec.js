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
    })
  })

  describe('when logged in', function () {
    const newBlog = {
      title: 'Amazon starts making its own TVs with new Fire TV Omni and 4-Series',
      author: 'Chris Welch',
      url: 'https://www.theverge.com/2021/9/9/22662673/amazon-fire-tv-omni-4-series-price-features',
    }

    const initialBlogs = [
      {
        title: 'Facebook, Ray-Ban debut picture-taking smart glasses',
        author: 'Ina Fried',
        url: 'https://www.axios.com/facebook-ray-ban-wayfarer-stories-5f113bfa-797f-4e2d-b99c-7d65a8726607.html',
      },
      {
        title: 'BioNTech mRNA Cancer Treatment Moved To Human Trials After Huge Success In Mice',
        author: 'Jack Dunhill',
        url: 'https://www.iflscience.com/health-and-medicine/biontech-mrna-cancer-treatment-moved-to-human-trials-after-huge-success-in-mice',
      },
    ]

    beforeEach(function () {
      cy.login(user)
      cy.get('@token')
        .then((token) => {
          initialBlogs.forEach((blog) => {
            const options = {
              method: 'POST',
              url: 'http://localhost:3003/api/blogs',
              headers: { Authorization: `Bearer ${token}` },
              body: blog,
            }
            cy.request(options)
          })
        })

      cy.visit('http://localhost:3000')
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

    it('a blog can be liked', function () {
      const blogToBeLiked = initialBlogs[0]
      cy.get('#blogs')
        .contains(blogToBeLiked.title)
        .within(function () {
          cy.get('.viewBtn').click()
          cy.contains('Likes:0')

          cy.get('.likeBtn').click()
          cy.contains('Likes:1')
        })
    })
  })
})
