describe('Template app', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('has the correct <h1>', () => {
    cy.contains('h1', 'My amazing new app')
  });

  it('navigates to /about', () => {
    cy.get('nav a').contains('About').click();
    cy.url().should('include', '/about.html');
    cy.contains('h1', 'About')
  });

});
