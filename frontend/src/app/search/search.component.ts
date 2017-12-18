import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {SearchService} from "../services/search.service";
import {User} from "../shared/user";
import {Router} from "@angular/router";
import {Page} from "../shared/page";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: User;
  keyWord: string;
  pages: Page[];

  constructor(private userService: UserService,
              private searchService: SearchService,
              private router: Router,

              ) { }

  ngOnInit() {
    if (this.userService.getUser() === undefined) {
      this.router.navigate(['/home']);
    }
    this.user = this.userService.getUser();
  }


  async onSubmit(keyWord): Promise<any> {
    // console.log('going to log in');
    // this.loading = true;
    try {
      const rearchResult = await this.searchService.searchRemote(this.user, keyWord);
      // console.log(rearchResult);
      this.pages = rearchResult;
      console.log(this.pages);

    } catch (ex) {
      console.error('An error occurred', ex);
    }
    // this.loading = false;

  }

}
