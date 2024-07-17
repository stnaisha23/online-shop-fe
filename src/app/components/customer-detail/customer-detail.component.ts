import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../sercives/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer | undefined;
  customers: Customer[] = [];
  currentPage: number = 0;
  pages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers(this.currentPage);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.customerService.getCustomerById(id).subscribe({
        next: data => {
          console.log('Data dari API:', data);
          if (data) {
            this.customer = data;
          } else {
            console.error('Customer not found');
          }
        },
        error: error => {
          console.error('Error fetching customer:', error);
        }
      });
    } else {
      console.error('No customer ID provided in route parameters.');
    }
  }

  loadCustomers(page: number): void {
    this.customerService.getCustomers(page, 5).subscribe(data => {
      console.log(data);
      this.customers = data.customers;
      this.pages = data.pages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.pages - 1) {
      this.currentPage++;
      this.loadCustomers(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCustomers(this.currentPage);
    }
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }

  editCustomer(id: number): void {
    this.router.navigate([`/customers/edit/${id}`]);
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers(this.currentPage);
    });
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}
