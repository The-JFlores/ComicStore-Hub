import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost/comicstore_hub/api/auth';

  private currentUserSubject =
    new BehaviorSubject<any>(null);

  currentUser$ =
    this.currentUserSubject.asObservable();

  checkAuth() {

    this.http.get<any>(
      `${this.apiUrl}/me.php`,
      {
        withCredentials: true
      }
    ).subscribe({

      next: (response) => {

        if (response.loggedIn) {

          this.currentUserSubject.next(
            response.user
          );

        } else {

          this.currentUserSubject.next(null);

        }
      },

      error: () => {

        this.currentUserSubject.next(null);

      }
    });
  }

    login(email: string, password: string) {

    return this.http.post<any>(
      `${this.apiUrl}/login.php`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    );
  }

  logout() {

    this.http.get<any>(
      `${this.apiUrl}/logout.php`,
      {
        withCredentials: true
      }
    ).subscribe({

      next: () => {

        this.currentUserSubject.next(null);

      },

      error: (err) => {

        console.error(err);

      }
    });
  }
}