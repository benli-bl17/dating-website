import { UserInfo } from './user-info/user-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {
  
  private _userUrl = "http://13.236.86.229:3000/api/user/" 
  private _userInfoUrl = "http://13.236.86.229:3000/api/userInfo" 
  private _userUpdateInfoUrl = "http://13.236.86.229:3000/api/userInfoUpdate"

  constructor(private http:HttpClient) { }

  getUser(id){
    return this.http.get<any>(this._userUrl + id)
  }
  getUserInfo(){
    return this.http.get<any>(this._userInfoUrl)
  }
  updateuserInfoData(_userInfo:UserInfo){
    return this.http.post<any>(this._userUpdateInfoUrl,_userInfo)
  }
}
