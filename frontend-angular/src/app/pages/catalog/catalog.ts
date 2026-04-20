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
  // Stores the list of comics loaded from the backend
  comics: Comic[] = [];

  // Stores an error message if loading fails
  errorMessage: string = '';

  // Inject services
  private comicService = inject(ComicService);
  private cd = inject(ChangeDetectorRef);

  // Load comics when the component initializes
  ngOnInit(): void {
    console.log('Catalog component initialized');
    this.loadComics();

     // 🔥 TEST CREATE (temporal)
  this.comicService.addComic({
    title: "Test Comic",
    author: "Test Author",
    publisher: "Test Publisher",
    genreID: 1,
    price: 5,
    description: "Testing",
    cover_image: "test.jpg",
    file_path: "test.pdf"
  }).subscribe({
    next: (res) => console.log("CREATED:", res),
    error: (err) => console.error("ERROR:", err)
  });
}

  // Request the comic list from the backend
  loadComics(): void {
    this.comicService.getComics().subscribe({
      next: (data) => {
        console.log('Comics loaded:', data);

        // 🔥 IMPORTANT FIX: avoid overwriting with empty array
        if (data && data.length > 0) {
          this.comics = data;
        }

        this.errorMessage = '';

        // 🔥 FORCE Angular to update the UI
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading comics:', error);
        this.errorMessage = 'Unable to load comics at the moment.';
      }
    });
  }
}