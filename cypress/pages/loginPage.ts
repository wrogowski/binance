export class LoginPage {
  path = '/login';

  emailInput = () => cy.get('input#login_input_email');
  passwordInput = () => cy.get('input#login_input_password');
  loginButton = () => cy.contains('button#login_input_login', 'Log In', { timeout: 10000 });

  captchaModal = () => cy.get('div.geetest_panel');
};
