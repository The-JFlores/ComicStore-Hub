import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {

  private cartService =
    inject(CartService);

  items: Comic[] = [];
  total: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {

    this.items =
      this.cartService.getItems();

    this.total =
      this.cartService.getTotal();
  }

  remove(index: number) {

    this.cartService.removeFromCart(index);

    this.items =
      this.cartService.getItems();

    this.total =
      this.cartService.getTotal();
  }

  clearCart() {

    this.cartService.clearCart();
    this.items = [];
    this.total = 0;
  }

  checkout() {

    this.successMessage = '';
    this.errorMessage = '';
    this.cartService
      .checkout()
      .subscribe({

        next: (response) => {

          console.log(response);

          this.successMessage =
            'Order placed successfully!';

          this.cartService.clearCart();

          this.items = [];

          this.total = 0;

},

        error: (err) => {

          console.error(err);

          this.errorMessage =
            err.error.message ||
            'Checkout failed';
        }
      });
  }
}