
import { Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicService } from '../../services/comic';
import { Comic } from '../../models/comic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  private cd = inject(ChangeDetectorRef);
  private comicService = inject(ComicService);

  selectedFile: File | null = null;
  selectedComic: Comic | null = null;
  comics: Comic[] = [];

  // Create form model
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

  // Load all comics
  loadComics() {
      this.comicService.getComics().subscribe(data => {
      this.comics = data || [];
      this.cd.detectChanges();
    });
  }

  // Select image file
  onFileSelected(event: any) {
      if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Create comic
  createComic() {

    // Upload image before creating comic
      if (this.selectedFile) {
      this.comicService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log("UPLOAD RESPONSE:", response);

          // Save uploaded image name
          this.newComic.cover_image = response.fileName;

          // Create comic after upload
          this.saveComic();
        },
        error: (err) => console.error(err)
      });
    } else {

      // Create comic without image
      this.saveComic();
    }
  }

  // Save comic to database
  saveComic() {
    this.comicService.addComic(this.newComic as any).subscribe({
      next: () => {
        console.log("Comic created");
        this.loadComics();
      },
      error: (err) => console.error(err)
    });
  }

  // Delete comic
  deleteComic(id: number) {
    this.comicService.deleteComic(id).subscribe({
      next: () => {
        console.log("Deleted");
        this.loadComics();
      },
      error: (err) => console.error(err)
    });
  }

  // Select comic for editing
  selectComic(comic: Comic) {
    this.selectedComic = { ...comic };
  }

  // Update comic
  updateComic() {
    if (!this.selectedComic) return;

    // Upload new image first
    if (this.selectedFile) {
      this.comicService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log("UPLOAD RESPONSE:", response);

          // Update image name
          this.selectedComic!.cover_image = response.fileName;

          // Save comic update
          this.saveUpdatedComic();
        },
        error: (err) => console.error(err)
      });
    } else {

      // Update without changing image
      this.saveUpdatedComic();
    }
  }

  // Save updated comic
  saveUpdatedComic() {
    this.comicService.updateComic(this.selectedComic!).subscribe({
      next: () => {
        console.log("Updated");
        this.selectedComic = null;
        this.loadComics();
      },
      error: (err) => console.error(err)
    });
  }
}