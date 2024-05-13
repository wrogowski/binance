export type HeaderLinks = 'logIn' | 'register' | 'userInfo';

export class Header {
  header = () => cy.get('div[name="header"] header');
  logInLink = () => cy.contains('header a', 'Log In');
  registerLink = () => cy.contains('header a', 'Register');
  userInfoLink = () => cy.get('header div.header-user-info');
};
