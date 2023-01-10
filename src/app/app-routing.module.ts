import { AccountGestionComponent } from './account-gestion/account-gestion.component';
import { RecapComponent } from './gestion-group/recap/recap.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
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
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  {
    path: 'gestion-group', component: GestionGroupComponent, canActivate: [AuthGuard], children: [{
      path: 'recap',
      component: RecapComponent, canActivate: [AuthGuard], data: { animation: 'isLeft' }
    },
    {
      path: 'history',
      component: HistoryComponent, canActivate: [AuthGuard], data: { animation: 'isRight' }
    }]
  },
  {
    path: 'account-gestion', component: AccountGestionComponent, canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
