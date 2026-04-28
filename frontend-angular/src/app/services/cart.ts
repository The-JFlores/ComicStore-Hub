import { Injectable } from '@angular/core';
import { Comic } from '../models/comic';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Comic[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(comic: Comic) {
    this.items.push(comic);
    this.cartCount.next(this.items.length);
  }

  getItems(): Comic[] {
    return this.items;
  }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
    this.cartCount.next(this.items.length);
  }

  clearCart() {
    this.items = [];
    this.cartCount.next(0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getCount(): number {
    return this.items.length;
  }
}