import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-gestion-group',
  templateUrl: './gestion-group.component.html',
  styleUrls: ['./gestion-group.component.css']
})
export class GestionGroupComponent implements OnInit {
  addExpense: boolean = false;
  idGroup: string = "";
  group: any = "{}";
  ExpenseForm: UntypedFormGroup;
  user: any = "{}";
  listUser: any[] = [];
  allLoaded: boolean = false;
  teamUse: string[] = [];
  errorForm: boolean = false;
  utilisateur: string = "";
  constructor(private route: ActivatedRoute, private http: HttpClient, private requestService: RequestService) {
    this.ExpenseForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      amount: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      utilisateurConcerned: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.route.queryParams.subscribe(params => {
      this.idGroup = params['group'];
      this.http.get<any>(this.requestService.url + 'group/' + this.idGroup).subscribe(result => {
        console.log(result);
        this.group = result;
        this.group.listMoney.forEach((element: { user1: string, user2: string }) => {
          this.http.get<any>(this.requestService.url + 'user/' + element.user1).subscribe(result => {
            element.user1 = result;
            this.listUser.push(result.username);
          });
          this.http.get<any>(this.requestService.url + 'user/' + element.user2).subscribe(result => {
            element.user2 = result;
            this.listUser.push(result.username);
          });
        });
        this.allLoaded = true;
      });

    }
    );
  }
  onSubmit() {
    console.log(this.ExpenseForm.value);
    console.log(this.utilisateur)
    // this.http.post<any>(this.requestService.url +'groups/addExpenses',{name:this.ExpenseForm.value.name,})
  }
  addUserToList(event: any) {
    this.listUser.push(event.target.value);

  }
  clickAddExpense() {
    this.addExpense = true;
    this.listUser = [...new Set(this.listUser)];
    console.log(this.listUser);
  }
  selectTeamUse(user: any) {
    user = user.target.name;
    if (this.teamUse.includes(user)) {
      this.teamUse.splice(this.teamUse.indexOf(user), 1);
    }
    else {
      this.teamUse.push(user);
    }
    console.log(this.teamUse);


  }

}
