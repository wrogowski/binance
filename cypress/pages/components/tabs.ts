export type TabName = 'Positions' | 'Open Orders' | 'Order History' | 'Trade History' |
  'Transaction History' | 'Position History' | 'API Key' | 'Strategy' | 'Assets';

export const tabNames: TabName[] = ['Positions', 'Open Orders', 'Order History', 'Trade History',
  'Transaction History', 'Position History', 'API Key', 'Strategy', 'Assets'];

export class Tabs {
  // I need to figure out how to fix TS error, when a correct Cypress.Chainer type is provided below
  private tabName: TabName;
  get tabHeader(): Cypress.Chainable<JQuery<HTMLElement>> { return this.convertNameToTestId(this.tabName).then(convertedName => cy.getByTestId(convertedName)) };
  headerCounter: any;
  content: any;
  logInLink: any;
  registerNowLink: any;

  //Positions Tab locators
  positionRow: any;
  positionCurrencyPair: any;
  sizeColumn: any;
  closeAllPositionsButton: any;

  //Position History Tab locators
  get positionHistoryDataRows(): Cypress.Chainable<JQuery<HTMLElement>> { return this.content().find('svg').first().parent()}

  constructor(tabName: TabName) {
    this.tabName = tabName;
    // this.tabHeader = () => this.convertNameToTestId(tabName).then(convertedName => cy.getByTestId(convertedName));
    this.headerCounter = () => this.tabHeader().invoke('text').then(text => text.match(/\d+/g)[0]);
    this.content = () => cy.get(`div#${tabName.toUpperCase().replace(' ', '_')}`);
    this.logInLink = () => cy.contains('a', 'Log In');
    this.registerNowLink = () => cy.contains('a', 'Register Now');

    //Positions Tab locators
    this.positionRow = () => cy.get('div.position-row.body');
    this.positionCurrencyPair = () => cy.get('div.pair');
    this.sizeColumn = () => cy.get('div.size-buy');
    this.closeAllPositionsButton = () => cy.contains('button', 'Close All Positions');
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
