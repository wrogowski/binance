export class LoginPage {
  path = '/login';

  get emailInput(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('input#login_input_email'); };
  get passwordInput(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('input#login_input_password'); };
  get loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button#login_input_login', 'Log In', { timeout: 10000 });
  };

  get captchaModal(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('div.geetest_panel'); };
};
