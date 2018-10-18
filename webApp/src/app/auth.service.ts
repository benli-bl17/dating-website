import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/api/login"

  private _registerUrl = "http://localhost:3000/api/register"

  constructor(private http: HttpClient, private _router: Router) { }
  //Return user login information to backend
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }
  //Logout function implementation
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
    window.location.reload();
  }
  //Return user register information to backend
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  //Monitor login status
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  //Get token
  getToken() {
    return localStorage.getItem('token')
  }
}
