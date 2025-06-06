import { Routes } from '@angular/router';

export const customcontent: Routes = [
  {
    path: 'custom-pages',
    loadChildren: () => import('../../components/pages/custom-pages/custom-pages.module').then(m => m.CustomPagesModule),
  },
];

