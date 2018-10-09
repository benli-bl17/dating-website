import { Injectable } from '@angular/core';
import { Observable} from "rxjs/index";
import * as io from 'socket.io-client';
import { Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private url = 'http://172.31.14.30:5000';
  private socket;

  sendMessage(message){
    this.socket.emit('add-message',message);
  }

  getMessages(){
    let observable = new Observable(observer =>{
      this.socket = io(this.url);
      this.socket.on('message',(data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
  constructor() { }
}
