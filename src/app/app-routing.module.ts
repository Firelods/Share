import { RecapComponent } from './gestion-group/recap/recap.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { GestionGroupComponent } from './gestion-group/gestion-group.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './gestion-group/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'groups', component: AccountComponent, canActivate: [AuthGuard] },
  {
    path: 'gestion-group', component: GestionGroupComponent, canActivate: [AuthGuard], children: [{
      path: 'recap',
      component: RecapComponent, canActivate: [AuthGuard]
    },
    {
      path: 'history',
      component: HistoryComponent, canActivate: [AuthGuard]
    }]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
