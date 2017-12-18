import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {statisticURL} from '../shared/baseurls';
import {User} from "../shared/user";

@Injectable()
export class StatisticsService {

  constructor(private http: Http) { }

  async  statisticRemote(user: User): Promise<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    try {
      let res = await this.http.get(statisticURL + user.uid,  options).toPromise();
      console.log(statisticURL + user.uid);
      // res = res.json();


      return res.json();

    } catch (ex) {
      this.handleError(ex);
      // return false;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
