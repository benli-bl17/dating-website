import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}

  constructor(private _auth: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  registerUser(email,password) {
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (email != "") {
      if (reg.test(email) && password) {
        this._auth.registerUser(this.registerUserData)
          .subscribe(
            res => {
              console.log(res)
              localStorage.setItem('token', res.token)
              this._router.navigate(['/members'])
            },
            err => console.log(err)
          )
      }
      else if (!password) {
        alert("Password can't be empty")
      }
      else{
        alert("Invalid Email")
      }
    }
    else {
      alert("Email can't be empty")
    }
  }
}
