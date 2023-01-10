import { ObjectId } from 'bson';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { GestionGroupComponent } from '../gestion-group.component';
import { UntypedFormGroup, UntypedFormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends GestionGroupComponent implements OnInit, AfterViewInit {
  addExpense: boolean = false;
  ExpenseForm!: UntypedFormGroup;

  listExpenseId: String[] = [];
  listExpense: Expense[] = [];
  teamUse: string[] = [];

  @ViewChild('formApparition', { static: false })
  public formExpenseCss!: ElementRef;
  override ngOnInit(): void {
    super.ngOnInit();
    this.group = this.group;
    this.ExpenseForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      amount: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      utilisateurConcerned: new FormArray([])
    })
    super.boldNav(null, "history")
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
  clickAddExpense() {
    this.addExpense = true;

    console.log(this.formExpenseCss);

    this.formExpenseCss.nativeElement.className = "activated";
    this.listUser.forEach((key, value) => {
      this.teamUse.push(key);
    });
    console.log(this.teamUse);
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
