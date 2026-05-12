import { Injectable } from '@angular/core';
import { Comic } from '../models/comic';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Comic[] = JSON.parse(
  localStorage.getItem('cartItems') || '[]');

  private cartCount = new BehaviorSubject<number>(this.items.length);
  cartCount$ = this.cartCount.asObservable();

  addToCart(comic: Comic) {
    this.items.push(comic);
    localStorage.setItem(
    'cartItems',
    JSON.stringify(this.items)
  );
  this.cartCount.next(this.items.length);
}

  getItems(): Comic[] {
    return this.items;
  }

  removeFromCart(index: number) {

    this.items.splice(index, 1);

    localStorage.setItem(
  'cartItems',
  JSON.stringify(this.items)
);
    this.cartCount.next(this.items.length);
  }

  clearCart() {
    this.items = [];

    localStorage.removeItem('cartItems');
    
    this.cartCount.next(0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getCount(): number {
    return this.items.length;
  }
}