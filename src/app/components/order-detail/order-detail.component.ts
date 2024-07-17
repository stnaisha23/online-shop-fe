import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../sercives/order.service';
import { Customer } from '../../models/customer.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;
  orders: Order[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.orderService.getOrderById(id).subscribe({
        next: data => {
          console.log('Data dari API:', data);
          if (data) {
            this.order = data;
          } else {
            console.error('Order not found');
          }
        },
        error: error => {
          console.error('Error fetching order:', error);
        }
      });
    } else {
      console.error('No order ID provided in route parameters.');
    }
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      console.log(data); 
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
  
  goBack(): void {
    this.router.navigate(['/orders']);
  }

  editOrder(id: number): void {
    this.router.navigate([`/orders/edit/${id}`]);
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  onCancel(): void {
    this.router.navigate(['/orders']);
  }
}
