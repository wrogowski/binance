import { HomePage } from "../../pages/homePage";
import { LoginPage } from "../../pages/loginPage";
import { RegisterPage } from "../../pages/registerPage";
import { Header } from "../../pages/components/header";
import { tabNames } from "../../pages/components/tabs";
import { openTab } from "../../support/commands/homePageTabsCommands";

const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const header = new Header();

describe('When visiting the home page as not logged in user', () => {
  beforeEach(() => {
    cy.visit(homePage.path);
  });

  it('page header should display Log In and Register links, but not user profile', () => {
    header.logInLink()
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => expect(href).to.include(Cypress.config().baseUrl + loginPage.path));

    header.registerLink()
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => expect(href).to.include(Cypress.config().baseUrl + registerPage.path));

    header.userInfoLink().should('have.class', 'no-logged');
  });

  it('order form should display Register Now and Log In, but not transactions operation buttons', () => {
    homePage.orderForm.registerNowButton()
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => expect(href).to.include(`en${registerPage.path}?`));

    homePage.orderForm.logInButton()
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => expect(href).to.include(`en${loginPage.path}?`));

    homePage.orderForm.buyLongButton().should('not.exist');
    homePage.orderForm.sellShortButton().should('not.exist');
  });

  it('tabs should display Log In and Register Now links instead of trading content', () => {
    tabNames.forEach(tabName => {
      const currentTab = openTab(tabName);

      currentTab.content().within(() => {
        currentTab.logInLink()
          .should('be.visible')
          .and('have.attr', 'href')
          .then(href => expect(href).to.include(`en${loginPage.path}?`));
        currentTab.registerNowLink()
          .should('be.visible')
          .and('have.attr', 'href')
          .then(href => expect(href).to.include(`en${registerPage.path}?`));
      });
    });
  });
});
