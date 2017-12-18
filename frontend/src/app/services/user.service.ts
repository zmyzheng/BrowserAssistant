import { Injectable } from '@angular/core';
import {User} from "../shared/user";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  user: User;

  constructor(private http: Http) { }


  getUser(): User {
    return this.user;
  }

  getOffUser(): void {
    this.user = undefined;
  }


  async  loginRemote(user: User): Promise<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    try {
      // const res = await this.http.post(this.Urll, { Password : user.password, Email : user.email }, options).toPromise();
      // console.log(res);
      this.user = new User();
      // this.user.JWT = res.json().Payload.Token;
      // this.user.uid = res.json().Payload.UserInfo.Id;
      // this.user.email = res.json().Payload.UserInfo.Email;
      // this.user.firstname = res.json().Payload.UserInfo.FirstName;
      // this.user.lastname = res.json().Payload.UserInfo.LastName;
      // this.user.phone = res.json().Payload.UserInfo.PhoneNumber;
      this.user.uid = user.uid;
      this.user.password = user.password;
      return true;
    } catch (ex) {
      this.handleError(ex);
      return false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
