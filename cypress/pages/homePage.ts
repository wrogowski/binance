import { Tabs, TabName } from "./components/tabs";
import { OrderForm } from "./components/orderForm";

const orderFormClass = new OrderForm();

export class HomePage {
  path = '/futures/BTCUSDT';
  
  orderForm = orderFormClass;
  tab = (tabName: TabName) => new Tabs(tabName);
};
