import { Component } from '@angular/core';
import { LoginService } from './login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '$hare';
  user = null;
  constructor(private loginService: LoginService) {  }
  ngDoCheck() {
    this.user = this.loginService.getUser();    
  }

}


