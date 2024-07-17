import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemService } from './sercives/item.service';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderService } from './sercives/order.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDetailComponent,
    ItemListComponent,
    ItemFormComponent,
    ItemDetailComponent,
    OrderListComponent,
    OrderFormComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    ItemService, 
    OrderService, 
    provideHttpClient(withFetch()),
    HttpClient,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
