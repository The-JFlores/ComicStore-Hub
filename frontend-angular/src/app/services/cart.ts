import { Injectable } from '@angular/core';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Comic[] = [];

  addToCart(comic: Comic) {
    this.items.push(comic);
  }

  getItems(): Comic[] {
    return this.items;
  }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
  }

  clearCart() {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getCount(): number {
    return this.items.length;
  }
}