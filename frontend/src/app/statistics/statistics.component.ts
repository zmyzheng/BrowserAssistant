import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user";
import {Statistics} from "../shared/statistics";
import {UserService} from "../services/user.service";
import {StatisticsService} from "../services/statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  user: User;

  statistics=[];
  constructor(private userService: UserService,
              private statisticsService: StatisticsService, ) { }

  async ngOnInit() {
    this.user = this.userService.getUser();
    try {
      const staticsticsResult = await this.statisticsService.statisticRemote(this.user);

      this.statistics = staticsticsResult;



      // let sum = 0;
      // for (let i = 0; i < this.statistics.length; i++) {
      //   sum += this.statistics[i].frequency;
      // }
      for (let i = 0; i < this.statistics.length; i++) {
        this.statistics[i].percent = Math.round(this.statistics[i].frequency * 100 / this.statistics[0].frequency)  + '%';
      }
      console.log(this.statistics);

    } catch (ex) {
      console.error('An error occurred', ex);
    }
  }

}
