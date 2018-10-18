import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from "../websocket.service";
import { UserInfoService } from "../user-info.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  //Initialize variable that need to be used in socket.io
  message;
  messages = [];
  connection;
  //Initialize variable that need to display user information
  userInfoData = [];
  user = "";

  //Create instances of services that need to used in chatroom
  constructor(
    private _websocketSerivce: WebsocketService,
    private _userInfoService: UserInfoService,
    private _authService: AuthService,
    private _router: Router) { }

  //  Create a function to invoke sendMessage function of webSocket service
  sendMessage(user) {
    this._websocketSerivce.sendMessage(user + ":       " + this.message);
    //intialize the variable message after it was send.
    this.message = '';

  }
//When the chatroom on initialized
  ngOnInit() {
    //If user has loginned
    if (this._authService.loggedIn()) {
      //Get user information by invkoing getUserInfo of userInforService
      this._userInfoService.getUserInfo()
        .subscribe(
          userInfor => this.userInfoData = userInfor,
          err => console.log(err)
        )
      //Build the connection by invoking function getMessages with webSocket service
      this.connection = this._websocketSerivce.getMessages()
      //subscribe the varaible message and push it into the String Array massages when it is changed
        .subscribe(
          message => this.messages.push(message),
          err => console.log(err)
        )
    //  If not login, navigate the user to login page
    } else {
      this._router.navigate(['/login'])
    }
  }
}
