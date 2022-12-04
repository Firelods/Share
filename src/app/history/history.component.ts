import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GestionGroupComponent } from '../gestion-group/gestion-group.component';
import { GroupeExpense } from '../groupe-expense';
import { HttpClient } from '@angular/common/http';
import { RequestService } from '../service/request.service';
import { Expense } from '../expense';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../gestion-group/gestion-group.component.css']
})
export class HistoryComponent implements OnInit {
  group!: GroupeExpense;
  groupId: String = "";
  listExpenseId: String[] = [];
  listExpense: Expense[] = [];
  constructor(private router: Router, private location: Location, private http: HttpClient, private requestService: RequestService) { }

  ngOnInit(): void {
    //get group id from url
    // this.groupId = this.router.url.split("/")[2];
    if (window.history.state.group) {
      this.group = window.history.state.group;
    }
    else {
      //navigate to group page with group id in query params
      this.location.back();
    }
    this.group.history.forEach((value: { _idExpense: String }) => {
      this.listExpenseId.push(value._idExpense);
    });
    console.log(this.listExpenseId);

    this.listExpenseId.forEach((value: String) => {
      this.http.get<Expense>(this.requestService.url + 'expense/' + value).subscribe(result => {
        this.listExpense.push(result);
        console.log(this.listExpense);
      })
    });



  }

}
