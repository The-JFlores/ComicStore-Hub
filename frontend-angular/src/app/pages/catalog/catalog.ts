

import { Component, OnInit, inject } from '@angular/core';
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

  // Inject the comic service
  private comicService = inject(ComicService);

  // Load comics when the component initializes
  ngOnInit(): void {
    this.loadComics();
  }

  // Request the comic list from the backend
  loadComics(): void {
    this.comicService.getComics().subscribe({
      next: (data) => {
        console.log('Comics loaded:', data);
        this.comics = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading comics:', error);
        this.errorMessage = 'Unable to load comics at the moment.';
      }
    });
  }
}