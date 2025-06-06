import { Routes } from '@angular/router';

export const errorcontent: Routes = [
  {
    path: 'error',
    loadChildren: () => import('../../components/pages/error-pages/error-pages.module').then(m => m.ErrorPagesModule),
  }

];

