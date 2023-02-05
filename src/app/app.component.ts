import { fadeInAnimation } from './animation';
import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { ChildrenOutletContexts } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class AppComponent {

  title = '$hare';
  user = null;
  constructor(private loginService: LoginService, private contexts: ChildrenOutletContexts) { }
  ngDoCheck() {
    this.user = this.loginService.getUser();
  }
  disconnect() {
    this.loginService.disconnect();
  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  isLogged() {
    return this.loginService.getUser();
  }
}


