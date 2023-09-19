const user = {
  username: 'user',
  name: 'User Name',
  password: 'password'
};
const blogs = [
  {
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
];
const newBlog = {
  title: 'My new blog post',
  url: 'mynewblogpost.com'
};


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body));
      cy.visit('');
    });
});

Cypress.Commands.add('addBlog', ({ title, url, likes = 0 }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  });
  cy.visit('');
});

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'admin',
      name: 'Admin',
      password: 'admin'
    });
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

    cy.visit('');
  });

  it('Login form is shown', function() {
    cy.get('#username').contains('Username').children('input');
    cy.get('#password').contains('Password').children('input');
    cy.get('button').contains('login');
  });

  describe('Login', function() {
    it('works with good username and password', function() {
      cy.get('#username').children('input').type(user.username);
      cy.get('#password').children('input').type(user.password);
      cy.get('button').click();

      cy.get('h2').contains('blogs');
      cy.contains(`${user.username} logged in`);
    });

    it('fails with incorrect username and password', function() {
      cy.get('#username').children('input').type(user.username);
      cy.get('#password').children('input').type('falsePassword');

      cy.get('button').click();

      cy.get('.notification').contains('Error').should('have.css', 'background-color', 'rgb(255, 0, 0)');
      cy.contains('blogs').should('not.exist');
      cy.contains(`${user.username} logged in`).should('not.exist');

      cy.get('#username').contains('Username').children('input');
      cy.get('#password').contains('Password').children('input');
      cy.get('button').contains('login');
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'admin' });
      blogs.forEach((blog) => {
        cy.addBlog(blog);
      });

      cy.login({ username: user.username, password: user.password });
    });

    it('a blog can be created', function() {
      cy.get('h2').contains('blogs');
      cy.get('.blog').should('have.length', blogs.length);

      cy.get('button').contains('Add blog').click();

      cy.get('input[placeholder="Title"]').type(newBlog.title);
      cy.get('input[placeholder="Url"]').type(newBlog.url);
      cy.get('button').contains('Create').click();

      cy.wait(1000);

      cy.get('.blog').should('have.length', blogs.length+1);
    });

    it('user can like a blog', function() {
      cy.get('.blog').contains(blogs[1].title).as('blog');

      cy.get('@blog').find('button').contains('view').click();

      cy.get('@blog').contains(`likes ${blogs[1].likes}`);
      cy.get('@blog').find('button').contains('like').click();
      cy.get('@blog').contains(`likes ${blogs[1].likes+1}`);
    });

    it('user can delete a blog he created', function() {
      cy.addBlog(newBlog);

      cy.get('.blog').contains(newBlog.title).as('blog');
      cy.get('@blog').find('button').contains('view').click();

      cy.get('@blog').find('button').contains('delete').click();

      cy.wait(4000);

      cy.get('@blog').should('not.exist');
      cy.contains(newBlog.title).should('not.exist');
    });

    it('user can\'t delete a blog he hasn\'t created', function() {
      cy.get('.blog').contains(blogs[1].title);
      cy.get('@blog').find('button').contains('view').click();

      cy.get('@blog').find('button').contains('delete').should('not.exist');
    });

    it.only('blogs list is ordered by number of likes', function() {
      const maxLikesBlog = blogs.reduce((maxLikesBlog, blog) => {
        return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog;
      }, blogs[0]);
      const minLikesBlog = blogs.reduce((minLikesBlog, blog) => {
        return blog.likes < minLikesBlog.likes ? blog : minLikesBlog;
      }, blogs[0]);

      cy.get('.blog').eq(0).contains(maxLikesBlog.title);
      cy.get('.blog').eq(blogs.length-1).contains(minLikesBlog.title);
    });
  });
});