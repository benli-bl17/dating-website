import { UserInfoService } from './../user-info.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from './user-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  genders = [
    "Male",
    "Female",
    "Other"
  ]

  marriageStatuses = [
    "Single",
    "Married",
    "Divorced",
    "Widowed"
  ]

  education = [
    "Diploma",
    "Advanced diploma",
    "Bachelor degree",
    "Masters degree",
    "Doctoral degree"
  ]

  states = [
    "NSW",
    "ACT",
    "VIC",
    "QLD",
    "SA",
    "WQ",
    "TAS",
    "NT"
  ]

  userInfoData = new UserInfo()

  constructor(private _userInfoService:UserInfoService) { }


  ngOnInit() {
    this._userInfoService.getUserInfo()
    .subscribe(
      res => this.userInfoData = res,
      err => console.log(err)
    )
  }

  updateuserInfoData(){
    this._userInfoService.updateuserInfoData(this.userInfoData)
    .subscribe(
      res => {
        console.log(res)
        alert('Successful')
      },
      err => console.log(err)
    )
  }

}
