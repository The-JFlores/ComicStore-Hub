

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  private comicService = inject(ComicService);
  
  selectedComic: Comic | null = null;
  comics: Comic[] = [];

  // Form model
  newComic = {
    title: '',
    author: '',
    publisher: '',
    genreID: 1,
    price: 0,
    description: '',
    cover_image: 'test.jpg',
    file_path: 'test.pdf'
  };

  ngOnInit() {
    this.loadComics();
  }

  loadComics() {
    this.comicService.getComics().subscribe(data => {
      this.comics = data || [];
    });
  }

  createComic() {
    this.comicService.addComic(this.newComic as any).subscribe({
      next: () => {
        console.log("Comic created");
        this.loadComics();
      },
      error: (err) => console.error(err)
    });
  }
  deleteComic(id: number) {
    this.comicService.deleteComic(id).subscribe({
      next: () => {
        console.log("Deleted");
        this.loadComics();
      },
      error: (err) => console.error(err)
    });
  }
  selectComic(comic: Comic) {
  this.selectedComic = { ...comic };
}
  updateComic() {
    if (!this.selectedComic) return;

    this.comicService.updateComic(this.selectedComic).subscribe({
      next: () => {
        console.log("Updated");
        this.selectedComic = null; // cerrar formulario
        this.loadComics(); // refrescar lista
      },
      error: (err) => console.error(err)
    });
 }
}