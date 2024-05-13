import { Header } from "../../pages/components/header";
import { LoginPage } from "../../pages/loginPage";

const header = new Header();
const loginPage = new LoginPage();

export const navigateToLogInPage = () =>
  header.logInLink().click().then(() =>
    cy.location('pathname').should('include', loginPage.path)
  );
