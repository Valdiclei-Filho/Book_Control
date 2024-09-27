describe('BookControl Login and Register', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Login/login.html');
  });

  it('Should have the correct page title', () => {
    cy.title().should('eq', 'BookControl');
  });

  it('Should display the header with the correct text', () => {
    cy.get('header h1').should('contain.text', 'BookControl');
  });

  it('Should allow the user to enter login details', () => {
    cy.get('#loginUsername').type('testuser@example.com');
    cy.get('#loginPassword').type('password123');
    cy.get('button').contains('ENTRAR').click();

  });

  it('Should allow the user to enter registration details', () => {
    cy.get('#registerUsername').type('newuser@example.com');
    cy.get('#registerPassword').type('newpassword123');
    cy.get('button').contains('CADASTRAR').click();

  });

  it('Should have footer links that navigate to social media', () => {
    cy.get('footer #redeSocial a')
      .should('have.length', 3)
      .each((link) => {
        cy.wrap(link).should('have.attr', 'href');
      });
  });
});
