import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private cartService = inject(CartService);

  cartCount: number = 0;

  ngOnInit() {
   this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  
}
