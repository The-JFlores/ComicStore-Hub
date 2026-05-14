import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

    register() {

    this.errorMessage = '';

    this.successMessage = '';

    this.authService.register(
      this.name,
      this.email,
      this.password
    ).subscribe({

      next: (response) => {

        console.log(response);
        this.errorMessage = '';
        this.successMessage =
          'Account created successfully';

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);
      },

      error: (err) => {
        this.successMessage = '';

        console.error(err);

        if (err.error.errors) {

          this.errorMessage =
            err.error.errors.join(' ');

        } else {

          this.errorMessage =
            err.error.message ||
            'Registration failed';
        }
      }
    });
  }
}