import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Guards
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'user-details',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/user-details/user-details.module').then(m => m.UserDetailsModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
