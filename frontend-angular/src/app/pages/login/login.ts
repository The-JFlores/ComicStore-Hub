import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.errorMessage = '';
    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authService['currentUserSubject']
  .next(response.user);
          if (response.user.role === 'admin') {

  this.router.navigate(['/admin']);

} else {

  this.router.navigate(['/catalog']);
  }
},

        error: (err) => {
          console.error(err);
          this.errorMessage =
            err.error.message ||

            'Login failed';
        }
      })
  }
}