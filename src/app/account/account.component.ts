import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeExpense } from '../groupe-expense';
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
  constructor(private loginService: LoginService, private http: HttpClient, private requestService: RequestService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.idUser = this.loginService.getUserId();
    this.setNbgroups();

  }
  disconnect(): void {
    this.loginService.disconnect();
    //route to login
    this.router.navigate(['/login'])
  }

  setNbgroups(): void {
    this.http.get<GroupeExpense[]>(this.requestService.url + this.idUser + '/groups').subscribe(result => {
      this.nbGroups = result.length;
      let resultParsed = JSON.parse(JSON.stringify(result));
      resultParsed.forEach((element: {
        listUsers: string[]; name: string; _id: string;
      }) => {
        var listUser: string[] = [];
        element.listUsers.forEach((user: string) => {
          this.http.get<string>(this.requestService.url + 'user/' + user).subscribe(result => {
            listUser.push(result)
          });
        });
        this.groupNames.push({
          nameGroup: element.name,
          idGroup: element._id,
          participants: listUser
        });
      });
    });
  }


}
