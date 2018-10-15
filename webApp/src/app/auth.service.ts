import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/api/login"

  private _registerUrl = "http://localhost:3000/api/register"

  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
    window.location.reload();
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }
}
