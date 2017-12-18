import { Injectable } from '@angular/core';
import {User} from "../shared/user";
import {Http, Headers, RequestOptions} from "@angular/http";
import {searchURL} from '../shared/baseurls';
import {Page} from "../shared/page";

@Injectable()
export class SearchService {

  // pages: Page[];
  constructor(private http: Http) { }


  async  searchRemote(user: User, keyWord: string): Promise<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    try {
      let res = await this.http.get(searchURL + '?query=' + keyWord + '&' + 'uid=' + user.uid,  options).toPromise();
      console.log(searchURL + '?query=' + keyWord + '&' + 'uid=' + user.uid);
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
