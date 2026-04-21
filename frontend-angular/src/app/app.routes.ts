import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  { path: '', component: Catalog },
  { path: 'catalog', component: Catalog },

  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)
  },

  {
  path: 'comic/:id',
  loadComponent: () => import('./pages/comic-detail/comic-detail').then(m => m.ComicDetail)
},

  { path: '**', redirectTo: 'catalog' } // 🔥 SIEMPRE AL FINAL
];