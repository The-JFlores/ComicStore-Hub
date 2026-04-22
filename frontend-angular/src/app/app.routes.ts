import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  // Default routes
  { path: '', component: Catalog },
  { path: 'catalog', component: Catalog },

  // Cart
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)
  },

  // Comic detail
  {
    path: 'comic/:id',
    loadComponent: () => import('./pages/comic-detail/comic-detail').then(m => m.ComicDetail)
  },

  // Admin panel
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin)
  },

  // Fallback (ALWAYS LAST)
  { path: '**', redirectTo: 'catalog' }
];