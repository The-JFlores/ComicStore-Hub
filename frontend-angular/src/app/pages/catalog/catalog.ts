import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {

  comics: Comic[] = [];
  cartItems: Comic[] = [];
  total: number = 0;
  errorMessage: string = '';

  private comicService = inject(ComicService);
  private cd = inject(ChangeDetectorRef);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.loadComics();
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal ();
  }

  //  GET (user view)
  loadComics(): void {
  this.comicService.getComics().subscribe({
    next: (data) => {

      // 🔥 SI NO HAY DATOS, USA MOCK
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

    // Update local cart view
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();

    console.log("Cart:", this.cartItems);
  }
  // Remove item from cart
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);

    // Update local cart view
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }
}