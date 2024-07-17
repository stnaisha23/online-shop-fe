import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/order-items/customers';

  constructor(private http: HttpClient) { }

  // getCustomers(): Observable<Customer[]> {
  //   return this.http.get<{ data: Customer[] }>(this.apiUrl).pipe(
  //     map(response => response.data)
  //   );
  // }

  getCustomers(page: number, size: number): Observable<{ customers: Customer[], pages: number }> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<{ data: Customer[], pages: number }>(this.apiUrl, { params }).pipe(
      map(response => ({
        customers: response.data,
        pages: response.pages
      }))
    );
  }
  

  getActiveCustomers(): Observable<Customer[]> {
    return this.http.get<{data: Customer[]}>(`${this.apiUrl}/active`)
      .pipe(
        map(response => response.data)
      );
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap({
        next: data => console.log('Data dari API:', data),
        error: error => console.error('Error fetching customer:', error)
      })
    );
  }
  

  addCustomer(formData: FormData): Observable<Customer> {
    const url = `${this.apiUrl}`;
    return this.http.post<{ data: Customer }>(this.apiUrl, formData).pipe(
      map(response => response.data)
    );
  }
  
  updateCustomer(id: number, formData: FormData): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<{ data: Customer }>(url, formData).pipe(
      map(response => response.data)
    );
  }  

  deleteCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
