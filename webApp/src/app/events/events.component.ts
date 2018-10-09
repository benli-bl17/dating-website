import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { timer } from 'rxjs';
import {UserInfoService} from "../user-info.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []
  userJoin = {user: "", event: ""};
  userQuit = {user: "", event: ""};
  userInfoData=[];
  user = "";
  constructor(private _eventService: EventService,
  private _authService: AuthService,
  private _router: Router,
  private _userInfoService:UserInfoService) {
  }

  ngOnInit() {
    this.refreshData();
    this._userInfoService.getUserInfo()
      .subscribe(
        res => this.userInfoData = res,
        err => console.log(err)
      )
  }

  private refreshData(): void {
    this._eventService.getEvents()
      .subscribe(
        res => {this.events = res;
        // this.subscribeToData();
        })
    }

  // private subscribeToData(): void {
  //   timer(5000).subscribe(() => this.refreshData());
  // }

  join(event,user) {
    if(this._authService.loggedIn()){
      console.log(this.userInfoData);
      this.userJoin.event = event;
      this.userJoin.user = user;
      this._eventService.join(this.userJoin).subscribe(
        res => this.userJoin = res
      )
      console.log("joined");
      window.location.reload()
    } else {
      this._router.navigate(['./login'])
    }
  }
  quit(event,user){
    this.userQuit.event = event;
    this.userQuit.user = user;
    this._eventService.quit(this.userQuit).subscribe(
      res => this.userQuit = res
    )
    console.log("quit");
    window.location.reload()
  }
}
