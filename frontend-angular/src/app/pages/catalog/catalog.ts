

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {

  comics: Comic[] = [];
  errorMessage: string = '';

  private comicService = inject(ComicService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('Catalog component initialized');
    this.loadComics();
  }

  // 🔹 GET comics
  loadComics(): void {
    this.comicService.getComics().subscribe({
      next: (data) => {
        console.log('Comics loaded:', data);

        // ✅ ALWAYS update (even if it's empty) (feminine)
        this.comics = data || [];

        this.errorMessage = '';
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading comics:', error);
        this.errorMessage = 'Unable to load comics at the moment.';
      }
    });
  }

  // 🔹 DELETE comic
  deleteComic(id: number) {
    console.log("Deleting comic with ID:", id);

    this.comicService.deleteComic(id).subscribe({
      next: (res) => {
        console.log("Deleted:", res);

        // reload after deleting
        this.loadComics();
      },
      error: (err) => console.error("Error:", err)
    });
  }
}