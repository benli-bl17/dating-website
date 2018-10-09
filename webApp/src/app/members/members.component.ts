import { MemberService } from './../member.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members = []
  constructor(private _memberService:MemberService) { }

  ngOnInit() {
    this._memberService.getMembers()
    .subscribe(
      res => this.members = res,
      err => console.log(err)
    )
  }

}
