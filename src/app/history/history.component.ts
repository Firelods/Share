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
  user!: { email: string; expiry: Int32Array; id: string; token: string; username: string; };

  constructor(private router: Router, private location: Location, private http: HttpClient, private requestService: RequestService) {

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

}
