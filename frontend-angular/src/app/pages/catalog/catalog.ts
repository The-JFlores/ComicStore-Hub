import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {

  comics: Comic[] = [];
  errorMessage: string = '';

  private comicService = inject(ComicService);
  private cd = inject(ChangeDetectorRef);
  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadComics();
  }

  // Navigate to cart page
goToCart() {
  this.router.navigate(['/cart']);
}

  //  GET (user view)
  loadComics(): void {
  this.comicService.getComics().subscribe({
    next: (data) => {

      if (!data || data.length === 0) {
        this.comics = [
          {
            comicID: 1,
            title: "Batman: Year One",
            author: "Frank Miller",
            publisher: "DC Comics",
            genreID: 1,
            genreName: "Superhero",
            price: 9.99,
            description: "The origin story of Batman.",
            cover_image: "test.jpg",
            file_path: "test.pdf",
            created_at: ""
          }
        ];
      } else {
        this.comics = data;
      }

      this.errorMessage = '';
      this.cd.detectChanges();
    },
    error: (error) => {
      console.error(error);
      this.errorMessage = 'Unable to load comics';
    }
  });
}

   // Add comic to cart
  addToCart(comic: Comic) {
    this.cartService.addToCart(comic);
  }
  // Remove item from cart
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  // Clear all items from cart
  clearCart() {
    this.cartService.clearCart();
  }

    goToDetail(id: number) {
    this.router.navigate(['/comic', id]);
  } 
}