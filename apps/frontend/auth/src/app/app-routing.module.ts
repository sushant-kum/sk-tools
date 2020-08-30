import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('@apps/frontend/auth/app/pages/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('@apps/frontend/auth/app/pages/create-account/create-account.module').then(
        (module) => module.CreateAccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
