import { HomePage } from "../../pages/homePage";
import { loginAsTestUser } from "../../support/commands/loginPageCommands";
import { navigateToLogInPage } from "../../support/commands/headerNaviationCommands";
import { openOrderFormTab, placeOrder } from "../../support/commands/orderFormCommands";
import {
  openTab,
  checkPositionDetails,
  clearAllPositions,
  checkTabHeaderCounterValue
} from "../../support/commands/homePageTabsCommands";


const homePage = new HomePage();

describe('BTC market operations and positions validation', () => {
  beforeEach('login and resolve captcha', () => {
    cy.visit(homePage.path);
    navigateToLogInPage();
    loginAsTestUser();
  });

  it('should allow to buy BTC at market price and close the positions', () => {
    const currentTab = homePage.tab('Positions');

    openOrderFormTab('Market').then(() => {
      placeOrder('buy', 0.055);
    }).then(() => {
      openTab('Positions');

      currentTab.positionRow.should('have.length', '1');
      checkPositionDetails('BTCUSDT', '0.055');
      checkTabHeaderCounterValue('Positions', 1);
    }).then(() => {
      placeOrder('buy', 0.005);

      currentTab.positionRow.should('have.length', '1');
      checkPositionDetails('BTCUSDT', '0.060');
      checkTabHeaderCounterValue('Positions', 1);

    }).then(() => {
      clearAllPositions();
      currentTab.positionRow.should('not.exist');
      checkTabHeaderCounterValue('Positions', 0);
    }).then(() => {
      openTab('Position History');

    });
  });
});