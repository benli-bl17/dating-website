import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  private _eventsUrl = "http://13.236.86.229:3000/api/events"
  private _joinUrl = "http://13.236.86.229:3000/api/join"
  private _quitUrl = "http://13.236.86.229:3000/api/quit"

  constructor(private http:HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  join(user) {
    return this.http.post<any>(this._joinUrl, user)
  }
  quit(user) {
    return this.http.post<any>(this._quitUrl, user)
  }
}
