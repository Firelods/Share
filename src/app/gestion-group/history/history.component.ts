import { ObjectId } from 'bson';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { GestionGroupComponent } from '../gestion-group.component';
import { UntypedFormGroup, UntypedFormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends GestionGroupComponent implements OnInit {
  addExpense: boolean = false;
  ExpenseForm!: UntypedFormGroup;


  teamUse: string[] = [];

  @ViewChild('formApparition', { static: false })
  public formExpenseCss!: ElementRef;
  override ngOnInit(): void {
    super.ngOnInit();
    this.ExpenseForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      amount: new UntypedFormControl(''),
      description: new UntypedFormControl(''),
      utilisateurConcerned: new FormArray([])
    })
    super.boldNav(null, "history");
  }



  clickAddExpense() {
    if (this.addExpense) {
      this.addExpense = false;
      this.formExpenseCss.nativeElement.className = "expense";
    }
    else {
      this.addExpense = true;
      this.formExpenseCss.nativeElement.className += " active";
      this.listUser.forEach((key, value) => {
        this.teamUse.push(key);
      });
    }

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
      this.formExpenseCss.nativeElement.className = "expense";
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
  setOwner(user: string) {
    var inputOwner = document.getElementById("owner") as HTMLInputElement;

    inputOwner.value = user;
  }
}
