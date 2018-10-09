import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService} from "../websocket.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  messages = [];
  connection;
  message;
  constructor(private websocket: WebsocketService) { }

  sendMessage(){
    this.websocket.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.websocket.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
  }

  ngOnDestory(){
    this.connection.unsubscribe()
  }
}
