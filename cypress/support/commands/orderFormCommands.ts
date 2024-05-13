import { OrderForm, OrderFormTabs } from "../../pages/components/orderForm";
import { Dialogs } from "../../pages/components/dialogs";

const orderForm = new OrderForm();
const dialog = new Dialogs();

export const openOrderFormTab = (tabName: OrderFormTabs) =>
  orderForm.tabs(tabName).click().then(() =>
    orderForm.tabs(tabName).should('have.class', 'active')
  );

export const placeOrder = (operation: 'buy' | 'sell', amount: number) => {
  orderForm.orderSizeInput().clear().type(amount.toString()).then(() => {
    const buttonName = operation === 'buy' ? 'buyLongButton' : 'sellShortButton';

    orderForm[buttonName]().click();
  });
};
