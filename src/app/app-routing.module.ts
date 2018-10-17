import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from './utilities/auth-guard.guard';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { LoginComponent } from './components/login/login.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { MembershipComponent } from './components/membership/membership.component';
import { MembershipInviteComponent } from './components/membership/invite/invite.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'memberships',
    component: MembershipComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'memberships/:id/invite',
    component: MembershipInviteComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
