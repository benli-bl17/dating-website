import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://localhost:3000/api/login"

  private _registerUrl = "http://localhost:3000/api/register"

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
