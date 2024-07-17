import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Customer } from '../models/customer.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/order-items/orders';
  private baseUrl = '/store/report';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<{ data: Order[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getOrderById(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  addOrder(formData: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, formData);
  }
  
  updateOrder(id: number, formData: any): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Order>(url, formData);
  }

  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `http://localhost:8080/order-items/customers/${id}`;
    return this.http.get<Customer>(url);
  }

  getItemById(id: number): Observable<Item> {
    const url = `http://localhost:8080/order-items/items/${id}`;
    return this.http.get<Item>(url);
  }

  downloadReport() {
    return this.http.get('http://localhost:8080/store/report/pdf', { responseType: 'blob' });
  }
}
