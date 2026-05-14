import {
  Component, inject, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',

  imports: [CommonModule],

  templateUrl: './orders.html',

  styleUrls: ['./orders.css']
})
export class Orders {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  orders: any[] = [];
  errorMessage: string = '';

  private apiUrl =
    'http://localhost/comicstore_hub/api/orders';

  ngOnInit() {

    this.loadOrders();
  }

  loadOrders() {

    this.http.get<any>(
      `${this.apiUrl}/my-orders.php`,
      {
        withCredentials: true
      }
    ).subscribe({

      next: (response) => {
console.log(response)
        this.orders = [...response.orders];
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

        this.errorMessage =
          err.error.message ||
          'Failed to load orders';
      }
    });
  }
}