

import { Injectable } from '@angular/core';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Stores cart items in memory
  private items: Comic[] = [];

  // Get all items in the cart
  getItems(): Comic[] {
    return this.items;
  }

  // Add a comic to the cart
  addToCart(comic: Comic) {
    this.items.push(comic);
  }

  // Clear all items from the cart
  clearCart() {
    this.items = [];
  }

  // Remove a specific item from the cart
removeFromCart(index: number) {
  this.items.splice(index, 1);
}
}