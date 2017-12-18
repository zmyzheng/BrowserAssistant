import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../shared/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = new User();
    // this.loading = false;
    // if usr log in, redirect to welcome page
    if (this.userService.getUser() === undefined) {
      console.log('please log in');
    }else {
      this.forward();
    }
  }


  async onSubmit(): Promise<any> {
    console.log('going to log in');
    // this.loading = true;
    try {
      const loginResult = await this.userService.loginRemote(this.user);
      if (loginResult) {


        console.log('login success');
        this.forward();
      } else {
        console.log(loginResult);

        console.log('login fail');
      }
    } catch (ex) {
      console.error('An error occurred', ex);
    }
    // this.loading = false;

  }

  forward() {
    this.router.navigate(['/home']);
  }


  private handleError(error) {
    console.error('Error processing action', error);
  }


}
