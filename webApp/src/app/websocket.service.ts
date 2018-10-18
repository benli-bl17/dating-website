import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  //Initialized the variable need to be used
  private url = 'http://localhost:5000';
  private socket;

  //Creat sendMessage function
  sendMessage(message) {
    //Invoke sock.io's emit function to send message to websocket server
    this.socket.emit('add-message', message);
  }
  //Create getMessages function
  getMessages() {
    //Create instance observable of Observable, subscribe ovserver
    let observable = new Observable(observer => {
      //Enter the url which is the address of websocket server to socket
      this.socket = io(this.url);
      //Monitor changes and receive message as variable data by invoking socket.on funciton
      this.socket.on('message', (data) => {
        //Invoke callback function the get next data
        observer.next(data);
      });
      //If no reaction, return diconnect function of socket
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
  constructor() { }
}
