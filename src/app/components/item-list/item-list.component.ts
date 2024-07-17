import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../sercives/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  showConfirmModal = false;
  itemToDeleteId: number | null = null;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(data => {
      console.log(data);
      this.items = data;
    });
  }

  viewItem(id: number): void {
    this.router.navigate([`/items/${id}`]);
  }

  editItem(id: number): void {
    this.router.navigate([`/items/edit/${id}`]);
  }

  confirmDelete(itemId: number): void {
    this.itemToDeleteId = itemId;
    this.showConfirmModal = true;
  }

  deleteItemConfirmed(): void {
    if (this.itemToDeleteId !== null) {
      this.itemService.deleteItem(this.itemToDeleteId).subscribe(() => {
        this.loadItems();
        this.closeModal();
      });
    }
  }

  cancelDelete(): void {
    this.itemToDeleteId = null;
    this.closeModal();
  }

  closeModal(): void {
    this.showConfirmModal = false;
  }

  addItem(): void {
    this.router.navigate(['/items/add']);
  }
}
