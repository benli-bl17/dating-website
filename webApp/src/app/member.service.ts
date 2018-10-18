import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberService {

  private _membersUrl = "http://localhost:3000/api/members"

  constructor(private http: HttpClient) { }

  //get all user's information
  getMembers() {
    return this.http.get<any>(this._membersUrl)
  }
}
