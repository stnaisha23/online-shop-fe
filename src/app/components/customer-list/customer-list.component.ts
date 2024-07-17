import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../sercives/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  showConfirmModal = false;
  customerToDeleteId: number | null = null;
  currentPage: number = 0;
  pages: number = 0;
  pageSize: number = 5;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.loadCustomers(this.currentPage);
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

  loadCustomers(page: number): void {
    this.customerService.getCustomers(page, this.pageSize).subscribe(
      response => {
        console.log(response);
        this.customers = response.customers;
        this.pages = response.pages;
      },
      error => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  getPageNumbers(): number[] {
    return Array(this.pages).fill(0).map((x, i) => i + 1);
  }
  
  viewCustomer(id: number): void {
    this.router.navigate([`/customers/${id}`]);
  }

  editCustomer(id: number): void {
    this.router.navigate([`/customers/edit/${id}`]);
  }

  confirmDelete(customerId: number): void {
    this.customerToDeleteId = customerId;
    this.showConfirmModal = true;
  }

  deleteCustomerConfirmed(): void {
    if (this.customerToDeleteId !== null) {
      this.customerService.deleteCustomer(this.customerToDeleteId).subscribe(() => {
        this.loadCustomers(this.currentPage);
        this.closeModal();
      });
    }
  }

  cancelDelete(): void {
    this.customerToDeleteId = null;
    this.closeModal();
  }

  closeModal(): void {
    this.showConfirmModal = false;
  }

  addCustomer(): void {
    this.router.navigate(['/customers/add']);
  }
}
