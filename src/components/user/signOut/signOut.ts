import { Component, OnInit } from '@angular/core';
import { UserService } from 'providers/user/UserService';

@Component({
  selector: 'app-sign-out',
  templateUrl: './signOut.html',
  styleUrls: ['./signOut.scss']
})

export class SignOut implements OnInit {
  constructor(public userService: UserService) { }

  ngOnInit() { }

  public closeSesion(): void {
    //this.userService.signOutUser();
  }

}
