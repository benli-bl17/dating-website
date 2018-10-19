import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserInfoService } from "../user-info.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  // initial variables
  events = []
  userJoin = { user: "", event: "" };
  userQuit = { user: "", event: "" };
  userInfoData = [];
  user = "";

  constructor(private _eventService: EventService,
    private _authService: AuthService,
    private _router: Router,
    private _userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData(): void {
    //get all the events
    this._eventService.getEvents()
      .subscribe(
        res => {
        this.events = res;
        })
    // get the current user information
    if(this._authService.loggedIn()){
    this._userInfoService.getUserInfo()
      .subscribe(
        res => this.userInfoData = res,
        err => console.log(err)
      )
    }
  }

  //join the event clicked, and refresh to show the new member list and quit button
  join(event, user) {
    // check if the user has logged in ,if not, jump to the login component
    if (this._authService.loggedIn()) {
      // force the user to add the first name before joining the event
      if (!user) {
        alert("Please edit your profile! Add your first name!");
        this._router.navigate(['./userInfo'])
      }
      else {
        this.userJoin.event = event;
        this.userJoin.user = user;
        this._eventService.join(this.userJoin).subscribe(
          res => this.userJoin = res
        )
        window.location.reload()
      }
    } else {
      this._router.navigate(['./login'])
    }
  }

  //quit the event clicked, and refresh to show the new member list and join button
  quit(event, user) {
    this.userQuit.event = event;
    this.userQuit.user = user;
    this._eventService.quit(this.userQuit).subscribe(
      res => this.userQuit = res
    )
    window.location.reload()
  }
}
