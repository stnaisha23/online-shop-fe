import { Customer } from "./customer.model";
import { Item } from "./item.model";

export interface Order {
    orderId: number;
    orderCode: string;
    orderDate: Date;
    totalPrice: number;
    customerId: number;
    itemsId: number;
    quantity: number;
    customerName?: string; 
    itemsName?: string;
    customer?: Customer; 
    items?: Item;
  }
  