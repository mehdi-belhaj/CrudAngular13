import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './core/guards/app-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthGuard],
    loadChildren: () => import('./pages/layout.module').then((m) => m.LayoutModule)
  }, {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule)
  }, {
    path: '**',
    redirectTo: '/notFound'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      anchorScrolling: 'enabled'
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
