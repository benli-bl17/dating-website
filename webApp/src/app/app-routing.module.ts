import { UserInfoComponent } from './user/user-info/user-info.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { UserComponent } from './user/user.component';
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userInfo',
    component: UserInfoComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'chatroom',
    component: ChatroomComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
