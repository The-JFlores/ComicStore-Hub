

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  // Inject HttpClient to communicate with the PHP backend
  private http = inject(HttpClient);

  // Base URL for the ComicStore Hub API
  private apiUrl = 'http://localhost/comicstore_hub/api';

  // Retrieve all comics from the backend
  getComics(): Observable<Comic[]> {
    const timestamp = new Date().getTime();
    return this.http.get<Comic[]>(`${this.apiUrl}/get_comics.php?t=${timestamp}`);
  }
}