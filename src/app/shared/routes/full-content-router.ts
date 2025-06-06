import { Routes } from '@angular/router';

export const fullcontent: Routes = [


  // {
  //   path: 'charts',
  //   loadChildren: () => import('../../components/charts/charts.module').then(m => m.ChartModule)
  // },

  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/filemanager/filemanager.module').then(m => m.FilemanagerModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'ecommerce',
    loadChildren: () => import('../../components/pages/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
  },

];

