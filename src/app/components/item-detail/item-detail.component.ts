import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../sercives/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  items: Item[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.loadItems();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.itemService.getItemById(id).subscribe({
        next: data => {
          console.log('Data dari API:', data);
          if (data) {
            this.item = data;
          } else {
            console.error('Item not found');
          }
        },
        error: error => {
          console.error('Error fetching item:', error);
        }
      });
    } else {
      console.error('No item ID provided in route parameters.');
    }
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(data => {
      console.log(data); 
      this.items = data;
    });
  }
  
  editItem(id: number): void {
    this.router.navigate([`/items/edit/${id}`]);
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
  
  goBack(): void {
    this.router.navigate(['/items']);
  }
}
