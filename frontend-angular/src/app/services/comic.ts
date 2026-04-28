

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost/comicstore_hub/api';

  // GET
  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics/get.php`);
  }

  // DELETE
  deleteComic(id: number) {
  return this.http.post(
    `${this.apiUrl}/comics/delete.php`,
    { comicID: id },
  );
}

  // POST
  addComic(comic: Comic): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/comics/create.php`,
      comic,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
// UPDATE
  updateComic(comic: Comic) {
  return this.http.post(
    `${this.apiUrl}/comics/update.php`,
    comic,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
}