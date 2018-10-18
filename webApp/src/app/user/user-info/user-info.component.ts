import { UserInfoService } from '../../user-info.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from './user-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  //Define classes
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

  constructor(private _userInfoService: UserInfoService) { }


  ngOnInit() {
    //Get userinfo
    this._userInfoService.getUserInfo()
      .subscribe(
        res => this.userInfoData = res,
        err => console.log(err)
      )
  }
  //update user information
  updateuserInfoData() {
    this._userInfoService.updateuserInfoData(this.userInfoData)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    alert("Update Successfully")
    window.location.reload();
  }

}
