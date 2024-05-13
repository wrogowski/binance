import { TabName } from "../../pages/components/tabs";
import { HomePage } from "../../pages/homePage";

const homePage = new HomePage();

export const openTab = (tabName: TabName) => {
  const tabClass = homePage.tab(tabName);

  tabClass.tabHeader.click();
  tabClass.tabHeader.should('have.class', 'active');
  return tabClass;
};

export const checkPositionDetails = (currencyPair: string, expectedSize: string) => {
  homePage.tab('Positions').positionCurrencyPair.should('have.text', currencyPair);
  homePage.tab('Positions').sizeColumn.should('have.text', `${expectedSize} BTC`);
};

export const clearAllPositions = () => {
  const tab = homePage.tab('Positions');

  tab.closeAllPositionsButton.click();
  cy.manageDialog('confirm')

  tab.positionRow.should('not.exist');
};

export const checkTabHeaderCounterValue = (tabName: TabName, exptectedValue: number) => {
  const tab = homePage.tab(tabName);

  tab.headerCounter.then(headerValue =>
    expect(headerValue).eq(exptectedValue.toString())
  );
}