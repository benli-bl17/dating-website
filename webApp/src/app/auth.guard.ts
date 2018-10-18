import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }
  // The routing guard judges whether it has logged in.
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } else {
      //If you are not logged in, jump to the login page
      this._router.navigate(['./login'])
      return false
    }
  }
}
