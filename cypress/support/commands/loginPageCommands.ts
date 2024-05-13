import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/homePage";

const loginPage = new LoginPage();
const homePage = new HomePage();

export const loginAsTestUser = () => {
  cy.fixture("users").then(user => {
    loginPage.emailInput.clear().type(user.email);
    loginPage.passwordInput.clear().type(user.password);
    loginPage.loginButton.should('be.enabled').click();
  }).then(() => {
    cy.pause();
  }).then(() => {
    loginPage.captchaModal.should('not.exist');
    cy.manageDialog('close');
    cy.location('pathname').should('include', homePage.path);
  });
};
