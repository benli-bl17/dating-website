import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          // alert the error according to the respond
          if (res == "Invalid email") {
            alert("Email does not exist")
          }
          else if (res == "Invalid password") {
            alert("Invalid password")
          }
          else {
            //Login successfully added token into the localStorage
            localStorage.setItem('token', res.token)
            //router to members page
            this._router.navigate(['/members'])
            window.location.reload();
          }
        },
        err => console.log(err)
      )
  }
}
