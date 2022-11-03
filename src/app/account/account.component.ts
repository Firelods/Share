import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user = "";
  idUser = "";
  nbGroups = 0;
  groupNames: [{ nameGroup: string; idGroup: string; participants: string[]; }] = [{ nameGroup: '', idGroup: '', participants: [] }];
  constructor(private loginService: LoginService, private http: HttpClient, private requestService: RequestService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.idUser = this.loginService.getUserId();
    this.setNbgroups();

  }
  setNbgroups(): void {
    var jsonParsed = JSON.parse(localStorage.getItem('user') || "{}");
    console.log(jsonParsed)
    this.http.get<any>(this.requestService.url + this.idUser + '/groups' + '?user=' + jsonParsed.token).subscribe(result => {
      this.nbGroups = result.length;
      console.log(result);
      var i = 0;
      let resultParsed = JSON.parse(JSON.stringify(result));
      resultParsed.forEach((element: {
        listUsers: string[]; name: string; _id: string;
      }) => {

        this.groupNames.push({
          nameGroup: element.name,
          idGroup: element._id,
          participants: []
        });
        element.listUsers.forEach((user: string) => {
          this.http.get<any>(this.requestService.url + 'user/' + user).subscribe(result => {
            console.log(user);
            console.log(result);

            this.groupNames[i].participants.push(result)
          });
          // this.userService.getUser(user);
          console.log(user);

        });
        i++;
      });


    });
    // this.groupNames.shift();
  }

}
interface Group {
  name: string;
  listUsers: string[];
  listMoney: [user1: string, user2: string, amount: number];

}