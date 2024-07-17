import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../sercives/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerId: number | null = null;
  selectedFile: File | null = null;
  customerImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', Validators.required],
      lastOrderDate: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe(data => {
        this.customerForm.patchValue(data);
        this.customerImageUrl = data.pic;
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = new FormData();
      formData.append('customerName', this.customerForm.get('customerName')?.value);
      formData.append('customerAddress', this.customerForm.get('customerAddress')?.value);
      formData.append('customerPhone', this.customerForm.get('customerPhone')?.value);
      formData.append('lastOrderDate', this.customerForm.get('lastOrderDate')?.value);
      formData.append('isActive', this.customerForm.get('isActive')?.value);

      if (this.selectedFile) {
        formData.append('pic', this.selectedFile);
      }

      if (this.customerId) {
        this.customerService.updateCustomer(this.customerId, formData).subscribe(() => {
          this.router.navigate(['/customers']);
        });
      } else {
        this.customerService.addCustomer(formData).subscribe(() => {
          this.router.navigate(['/customers']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}
