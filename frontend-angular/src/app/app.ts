

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink} from '@angular/router';
import { CartService } from './services/cart';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  
  private cartService = inject(CartService);
    cartCount: number = 0;
  private router = inject(Router);
    isAdminPage: boolean = false;

  ngOnInit() {

  // 🔥 contador carrito
  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });

  // 🔥 detectar ruta actual
  this.checkIfAdmin();

  // 🔥 detectar cambios de ruta
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.checkIfAdmin();
    });
}

checkIfAdmin() {
  this.isAdminPage = this.router.url.includes('/admin');
}
  
}
