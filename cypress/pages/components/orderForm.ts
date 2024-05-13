export type OrderFormTabs = 'Limit' | 'Market' | 'Stop Limit';

export class OrderForm {
  orderFormPanel = () => cy.get('div[name="orderForm"]');

  tabs = (tabName: OrderFormTabs) => cy.toCamelCase(tabName).then(newName => cy.get(`[date-testid="${newName}"]`));

  orderSizeInput = () => cy.get('input[name="unitAmount"]');

  buyLongButton = () => cy.contains('button[type="submit"]', 'Buy/Long');
  sellShortButton = () => cy.contains('button[type="submit"]', 'Sell/Short');

  registerNowButton = () => cy.getByTestId('orderform_register');
  logInButton = () => cy.getByTestId('orderform_login');
}