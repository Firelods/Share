import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GestionGroupComponent } from '../gestion-group/gestion-group.component';
import { GroupeExpense } from '../groupe-expense';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../service/request.service';
import { Expense } from '../expense';
import { FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../gestion-group/gestion-group.component.css']
})
export class HistoryComponent implements OnInit {
  addExpense: boolean = false;
  listUser: { username: string, id: string }[] = [];

  group!: GroupeExpense;
  groupId: String = "";
  listExpenseId: String[] = [];
  listExpense: Expense[] = [];
  ExpenseForm: UntypedFormGroup;
  user!: { email: string; expiry: Int32Array; id: string; token: string; username: string; };
  teamUse: string[] = [];
  @ViewChild('formApparition', { static: false })
  public formExpenseCss!: ElementRef;
  constructor(private router: Router, private location: Location, private http: HttpClient, private requestService: RequestService) {
    this.ExpenseForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      amount: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      utilisateurConcerned: new FormArray([])
    })
  }

  ngOnInit(): void {
    //get group id from url
    // this.groupId = this.router.url.split("/")[2];
    this.user = JSON.parse(localStorage.getItem('user') || "{}");

    if (window.history.state.group) {
      this.group = window.history.state.group;
    }
    else {
      //navigate to group page with group id in query params
      this.location.back();
    }

    console.log(this.listExpenseId);





  }
  clickAddExpense() {
    this.addExpense = true;

    console.log(this.formExpenseCss);

    this.formExpenseCss.nativeElement.className = "activated";
    this.listUser = [...new Set(this.listUser)];
    this.listUser = this.listUser.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === this.listUser.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
    console.log(this.listUser);
  }
  onSubmit() {
    this.ExpenseForm.value.utilisateurConcerned = this.teamUse;
    console.log(this.ExpenseForm.value);
    console.log(this.user.username);
    this.http.post<string>(this.requestService.url + 'groups/addExpenses', {
      group: this.group._id,
      name: this.ExpenseForm.value.name,
      description: this.ExpenseForm.value.description,
      amount: this.ExpenseForm.value.amount,
      listUsers: this.ExpenseForm.value.utilisateurConcerned,
      date: new Date(),
      owner: this.user.id
    }).subscribe(result => {
      this.ngOnInit();
      this.addExpense = false;
      this.formExpenseCss.nativeElement.className = "";
    })
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
