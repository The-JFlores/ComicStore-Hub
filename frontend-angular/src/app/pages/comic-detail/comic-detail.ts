

import { Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
  private cd = inject(ChangeDetectorRef);
  private comicService = inject(ComicService);
  private cartService = inject(CartService);

  comic: Comic | null = null;

  ngOnInit() {
  const id = Number(this.route.snapshot.params['id']);

  this.comicService.getComicById(id).subscribe({
    next: (data) => {
      console.log("DATA FROM API:", data);

      this.comic = data;
      
      this.cd.detectChanges();

      console.log("COMIC SET:", this.comic);
    },
    error: (err) => {
      console.error("ERROR:", err);
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