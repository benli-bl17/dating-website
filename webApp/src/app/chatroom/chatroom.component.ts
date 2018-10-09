import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService} from "../websocket.service";
import {UserInfoService} from "../user-info.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  messages = [];
  connection;
  message;
  userInfoData=[];
  user = "";
  constructor(private websocket: WebsocketService,
              private _userInfoService:UserInfoService,
              private _authService:AuthService,
              private _router:Router) { }

  sendMessage(user){
    this.websocket.sendMessage(user+ ":       " + this.message);
     this.message = '';
    
  }

  ngOnInit() {
    if(this._authService.loggedIn()){
      this.connection = this.websocket.getMessages().subscribe(message =>{
        this.messages.push(message);
      })
      this._userInfoService.getUserInfo()
        .subscribe(
          res => this.userInfoData = res,
          err => console.log(err)
        )
    } else {
      this._router.navigate(['/login'])
    }

  }

  ngOnDestory(){
    this.connection.unsubscribe()
  }
}
