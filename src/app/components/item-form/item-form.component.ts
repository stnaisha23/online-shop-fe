import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../sercives/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  itemsId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.fb.group({
      itemsName: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      isAvailable: [false],
      lastReStock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemsId = +this.route.snapshot.paramMap.get('id')!;
    if (this.itemsId) {
        this.itemService.getItemById(this.itemsId).subscribe(data => {
            this.itemForm.patchValue(data);
        });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
      formData.append('itemsName', this.itemForm.get('itemsName')?.value);
      formData.append('stock', this.itemForm.get('stock')?.value);
      formData.append('price', this.itemForm.get('price')?.value);
      formData.append('lastReStock', this.itemForm.get('lastReStock')?.value);
  
    console.log('Form Data:', formData); 
  
    if (this.itemsId) {
      this.itemService.updateItem(this.itemsId, formData).subscribe(() => {
        this.router.navigate(['/items']);
      });
    } else {
      this.itemService.addItem(formData).subscribe(() => {
        this.router.navigate(['/items']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/items']);
  }
  
}
