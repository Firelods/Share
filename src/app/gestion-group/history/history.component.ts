import { ObjectId } from 'bson';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/expense';
import { GestionGroupComponent } from '../gestion-group.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends GestionGroupComponent implements OnInit, AfterViewInit {

  listExpenseId: String[] = [];
  listExpense: Expense[] = [];
  override ngOnInit(): void {
    super.ngOnInit();
    this.group = this.group;


  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.group.history.forEach((value: { _idExpense: String }) => {
      this.listExpenseId.push(value._idExpense);
    });
    this.listExpenseId.forEach((value: String) => {
      this.http.get<Expense>(this.requestService.url + 'expense/' + value).subscribe(result => {

        this.listExpense.push(result);
        console.log(this.listExpense);
      })
    });
    this.listExpense.forEach((value: Expense) => {
      console.log(value);
    });
  }

}
