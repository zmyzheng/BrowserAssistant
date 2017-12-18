import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {RecommendationService} from "../services/recommendation.service";
import {User} from "../shared/user";
import {Page} from "../shared/page";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  user: User;
  // keyWord: string;
  pages: Page[];
  constructor(private userService: UserService,
              private recommendationService: RecommendationService,) { }

  async ngOnInit() {
    this.user = this.userService.getUser();
    try {
      const rearchResult = await this.recommendationService.recommendRemote(this.user);
      // console.log(rearchResult);
      this.pages = rearchResult;
      console.log(this.pages);

    } catch (ex) {
      console.error('An error occurred', ex);
    }
  }

}
