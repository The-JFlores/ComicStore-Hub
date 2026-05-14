
import { adminGuard } from './guards/admin-guard';
import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
  // Default routes
  { path: '', component: Catalog },
  { path: 'catalog', component: Catalog },
  { path: 'login', loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },
    // Register
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register')
        .then(m => m.Register)
  },

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
     
      canActivate: [adminGuard],

      loadComponent: () =>
      import('./pages/admin/admin')
    .then(m => m.Admin)
  
  },

  // Fallback (ALWAYS LAST)
  { path: '**', redirectTo: 'catalog' }
];