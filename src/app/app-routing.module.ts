import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' }, // daca calea coincide cu router de baza se va redirectiona catre pagina home
      { path: '', component: HomePageComponent },
      { path: 'todo/:id', component: PostPageComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule), //lazy-loading
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ], // strategia de incarcare a lazy-loading. Cand vom intra pe admin ea fa fi accesibila deja
  exports: [RouterModule],
})
export class AppRoutingModule {}
