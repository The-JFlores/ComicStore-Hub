import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterLink
} from '@angular/router';

import { CartService } from './services/cart';
import { AuthService } from './services/auth';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  currentUser: any = null;

  cartCount: number = 0;

  isAdminPage: boolean = false;

  private cartService = inject(CartService);

  private authService = inject(AuthService);

  private router = inject(Router);

  ngOnInit() {

    this.authService.checkAuth();

    this.authService.currentUser$
      .subscribe(user => {

        console.log('AUTH USER:', user);

        this.currentUser = user;
      });

    this.cartService.cartCount$
      .subscribe(count => {

        this.cartCount = count;
      });

    this.checkIfAdmin();

    this.router.events
      .pipe(
        filter(event =>
          event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.checkIfAdmin();
      });
  }

  checkIfAdmin() {

    this.isAdminPage =
      this.router.url.includes('/admin');
  }

  logout() {

    this.authService.logout();
  }
}