

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  private cartService = inject(CartService);

  items: Comic[] = [];
  total: number = 0;

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  clear() {
    this.cartService.clearCart();
    this.items = [];
    this.total = 0;
  }
}