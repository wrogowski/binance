export type TabName = 'Positions' | 'Open Orders' | 'Order History' | 'Trade History' |
  'Transaction History' | 'Position History' | 'API Key' | 'Strategy' | 'Assets';

export const tabNames: TabName[] = ['Positions', 'Open Orders', 'Order History', 'Trade History',
  'Transaction History', 'Position History', 'API Key', 'Strategy', 'Assets'];

export class Tabs {
  private tabName: TabName;

  get tabHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.convertNameToTestId(this.tabName).then(convertedName =>
      cy.getByTestId(convertedName));
  };

  get headerCounter(): Cypress.Chainable<string> {
    return this.tabHeader.invoke('text').then(text => text.match(/\d+/g)[0]);
  };

  get content(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`div#${this.tabName.toUpperCase().replace(' ', '_')}`);
  };

  get logInLink(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.contains('a', 'Log In');
  };

  get registerNowLink(): Cypress.Chainable<JQuery<HTMLAnchorElement>> {
    return cy.contains('a', 'Register Now');
  };

  //Positions Tab locators
  get positionRow(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('div.position-row.body');
  };

  get positionCurrencyPair(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('div.pair');
  };

  get sizeColumn(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('div.size-buy');
  };

  get closeAllPositionsButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('button', 'Close All Positions');
  };

  //Position History Tab locators
  get positionHistoryDataRows(): Cypress.Chainable<JQuery<HTMLElement>> { return this.content.find('svg').first().parent() }

  constructor(tabName: TabName) {
    this.tabName = tabName;
  };

  private convertNameToTestId = (tabName: TabName) => {
    switch (tabName) {
      case 'Positions':
      case 'Order History':
      case 'Trade History':
        return cy.toCamelCase(tabName.slice(1)).then(string => tabName[0] + string);

      case 'Open Orders':
        return cy.wrap('OpenOrder');

      case 'Transaction History':
      case 'Position History':
        return cy.toCamelCase(tabName);

      case 'API Key':
        return cy.wrap('apiTableTitle');

      case 'Strategy':
        return cy.wrap('strategyPanelTitle');

      case 'Assets':
        return cy.wrap('assetsTableTitle');

      default:
        throw new Error('TabName not defined: ' + tabName);
    };
  };
};
