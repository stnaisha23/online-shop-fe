import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  { path: 'customers/:id', component: CustomerDetailComponent },
  //items
  { path: 'items', component: ItemListComponent },
  { path: 'items/add', component: ItemFormComponent },
  { path: 'items/edit/:id', component: ItemFormComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  //orders
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/add', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: 'orders/:id', component: OrderDetailComponent },

  { path: 'store/report/pdf', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
