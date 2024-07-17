import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../sercives/order.service';
import { CustomerService } from '../../sercives/customer.service';
import { ItemService } from '../../sercives/item.service';
import { Customer } from '../../models/customer.model';
import { Item } from '../../models/item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  orderId: number | null = null;
  customers: Customer[] = [];
  items: Item[] = [];
  selectedItemPrice: number = 0;
  totalPrice: number = 0;
  customerId: number | null = null;;
  itemsId: number | null = null;;
  quantity: number = 0;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      itemsName: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadActiveCustomers();
    this.loadAvailableItems();
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      itemsId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.orderForm.get('itemsId')?.valueChanges.subscribe(() => {
      this.onItemChange();
    });
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe(data => {
        this.orderForm.patchValue(data);
        this.calculateTotalPrice();
        });
      }
    }
    
    loadActiveCustomers(): void {
      this.customerService.getActiveCustomers().subscribe(customers => {
      this.customers = customers;
      });
    }
    
    loadAvailableItems(): void {
      this.itemService.getAvailableItems().subscribe(items => {
      this.items = items;
      });
    }
    
    onItemChange(): void {
    const itemsId = this.orderForm.get('itemsId')?.value;
    const item = this.items.find(i => i.itemsId === itemsId);
    if (item) {
      this.selectedItemPrice = item.price;
    } else {
      this.selectedItemPrice = 0;
    }
    
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
  const quantity = this.orderForm.get('quantity')?.value || 0;
  this.totalPrice = this.selectedItemPrice * quantity;
  console.log(`Selected Item Price: ${this.selectedItemPrice}, Quantity: ${quantity}, Total Price: ${this.totalPrice}`);
  }
  
  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }
  
    const formData = {
      customerId: this.orderForm.value.customerId,
      itemsId: this.orderForm.value.itemsId,
      quantity: this.orderForm.value.quantity
    };
  
    console.log('Form Data:', formData);
  
    if (this.orderId) {
      this.orderService.updateOrder(this.orderId, formData).subscribe(() => {
        console.log('Order updated successfully');
        this.router.navigate(['/orders']); 
      });
    } else {
      this.orderService.addOrder(formData).subscribe(() => {
        console.log('Order added successfully');
        this.router.navigate(['/orders']);
      }, error => {
        console.error('Error adding order:', error);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/orders']);
  }
}      
