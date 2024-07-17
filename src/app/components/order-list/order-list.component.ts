import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../sercives/order.service';
import { Order } from '../../models/order.model';
import { Item } from '../../models/item.model';
import { Customer } from '../../models/customer.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  showConfirmModal = false;
  orderIdToDelete: number | null = null;

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.loadCustomerNames();
      this.loadItemNames();
    });
  }

  loadCustomerNames(): void {
    this.orders.forEach(order => {
      this.orderService.getCustomerById(order.customerId).subscribe((customer: Customer) => {
        order.customerName = customer.customerName;
        order.customer = customer;
      });
    });
  }
  
  loadItemNames(): void {
    this.orders.forEach(order => {
      this.orderService.getItemById(order.itemsId).subscribe((item: Item) => {
        order.itemsName = item.itemsName;
        order.items = item;
      });
    });
  }

  viewOrder(id: number): void {
    this.router.navigate([`/orders/${id}`]);
  }

  editOrder(id: number): void {
    this.router.navigate([`/orders/edit/${id}`]);
  }

  confirmDelete(orderId: number): void {
    this.orderIdToDelete = orderId;
    this.showConfirmModal = true;
  }

  deleteOrderConfirmed(): void {
    if (this.orderIdToDelete !== null) {
      this.orderService.deleteOrder(this.orderIdToDelete).subscribe(() => {
        this.loadOrders();
        this.closeModal();
      });
    }
  }

  cancelDelete(): void {
    this.orderIdToDelete = null;
    this.closeModal();
  }

  closeModal(): void {
    this.showConfirmModal = false;
  }

  addOrder(): void {
    this.router.navigate(['/orders/add']);
  }

  downloadReport() {
    this.orderService.downloadReport().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
}
