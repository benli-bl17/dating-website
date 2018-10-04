import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component:EventsComponent,
  },
  {
    path: 'members',
    component:MembersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
