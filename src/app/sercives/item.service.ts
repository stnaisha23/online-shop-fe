import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `http://localhost:8080/order-items/items`;

  constructor(private http: HttpClient) { }

  getAvailableItems(): Observable<Item[]> {
    return this.http.get<{data: Item[]}>(`${this.apiUrl}/available`)
      .pipe(
        map(response => response.data)
      );
  }

  getItems(): Observable<Item[]> {
    return this.http.get<{ data: Item[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getItemById(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap({
        next: data => console.log('Data dari API:', data),
        error: error => console.error('Error fetching item:', error)
      })
    );
  }

  addItem(formData: any): Observable<Item> {
    return this.http.post<{ data: Item }>(this.apiUrl, formData).pipe(
      map(response => response.data)
    );
  }
  
  updateItem(id: number, formData: any): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<{ data: Item }>(url, formData).pipe(
      map(response => response.data)
    );
  }
    

  deleteItem(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
