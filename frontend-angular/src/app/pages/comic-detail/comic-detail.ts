

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-comic-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comic-detail.html',
  styleUrl: './comic-detail.css'
})
export class ComicDetail {

  private route = inject(ActivatedRoute);
  private comicService = inject(ComicService);
  private cartService = inject(CartService);

  comic: Comic | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);

    // 🔥 1. SIEMPRE mostramos algo (mock inicial)
    this.comic = {
      comicID: id,
      title: "Batman: Year One",
      author: "Frank Miller",
      publisher: "DC Comics",
      genreID: 1,
      genreName: "Superhero",
      price: 9.99,
      description: "The origin story of Batman in a modern retelling.",
      cover_image: "test.jpg",
      file_path: "test.pdf",
      created_at: ""
    };

    // 🔄 2. Luego intentamos backend (si hay datos reales)
    this.comicService.getComics().subscribe(data => {
      if (data && data.length > 0) {
        const found = data.find(c => c.comicID === id);
        if (found) {
          this.comic = found;
        }
      }
    });
  }

  // Add comic to cart
  addToCart() {
    if (this.comic) {
      this.cartService.addToCart(this.comic);
    }
  }
}