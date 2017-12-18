import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../shared/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // loginFlag: boolean = false;
  user: User;

  constructor(private router: Router, private userService: UserService
              ) { }

  ngOnInit() {
  }

  onLogIn(): void {
    console.log('going to log in');
    this.router.navigate(['/login']);
  }

  loginFlag() {
    this.user = this.userService.getUser();
    return this.user;
  }

  onSignOut() {
    this.userService.getOffUser();
  }

}
