

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comic-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comic-detail.html',
  styleUrl: './comic-detail.css'
})
export class ComicDetail {

  private route = inject(ActivatedRoute);

  id: number = 0;

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
  }
}