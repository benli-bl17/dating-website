import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService} from "../websocket.service";
import {UserInfoService} from "../user-info.service";

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
              private _userInfoService:UserInfoService) { }

  sendMessage(user){
    this.websocket.sendMessage(user+ ":       " + this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.websocket.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
    this._userInfoService.getUserInfo()
      .subscribe(
        res => this.userInfoData = res,
        err => console.log(err)
      )
  }

  ngOnDestory(){
    this.connection.unsubscribe()
  }
}
