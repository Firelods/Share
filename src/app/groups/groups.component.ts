import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { GroupeExpense } from '../groupe-expense';
import { AlertService } from '../service/alert.service';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  user = "";
  idUser = "";
  nbGroups = 0;
  addGroup = false;
  groupNames: [{ nameGroup: string; idGroup: string; participants: string[]; }] = [{ nameGroup: '', idGroup: '', participants: [] }];
  constructor(private loginService: LoginService, private http: HttpClient, private requestService: RequestService, private userService: UserService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.groupNames = [{ nameGroup: '', idGroup: '', participants: [] }];
    this.nbGroups = 0;
    this.user = this.loginService.getUser();
    this.idUser = this.loginService.getUserId();
    this.setNbgroups();

  }
  disconnect(): void {
    this.alertService.error("Vous êtes déconnecté", 5000, true);
    this.loginService.disconnect();
    //route to login
    this.router.navigate(['/login'])
  }

  setNbgroups(): void {
    this.http.get<GroupeExpense[]>(this.requestService.url + this.idUser + '/groups').subscribe((result) => {
      this.nbGroups = result.length;
      result.forEach((element: GroupeExpense) => {
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

  addGroupToUser(): void {
    console.log(this.addGroup);

    if (this.addGroup) {
      this.addGroup = false;
      this.http.post(this.requestService.url + 'user/addGroup', { tag: (document.getElementById("join") as HTMLInputElement).value, user: this.idUser }).subscribe(
        (response: any) => {
          if (response.message == "Group not found") {
            alert("Group not found");
          }
          this.ngOnInit();
        }
      );


    } else {

      this.addGroup = true;
    }
  }
  clickAlert(): void {
    this.alertService.info("Ceci est votre groupe", 50000, true);
  }
}
