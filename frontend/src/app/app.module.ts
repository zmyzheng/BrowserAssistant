import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import {UserService} from "./services/user.service";
import {SearchService} from "./services/search.service";
import {StatisticsService} from "./services/statistics.service";
import {RecommendationService} from "./services/recommendation.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    StatisticsComponent,
    RecommendationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'login', component: LoginComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'recommendation', component: RecommendationComponent },
    ]),
  ],
  providers: [UserService,
    SearchService,
    StatisticsService,
    RecommendationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
