import { ObjectId } from 'bson';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Expense } from 'src/app/expense';
import { GestionGroupComponent } from '../gestion-group.component';
import { UntypedFormGroup, UntypedFormControl, FormArray, FormControl } from '@angular/forms';

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
      owner: new UntypedFormControl(''),
      utilisateurConcerned: new FormControl('')
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
      if (!(this.teamUse.length > 0)) {
        this.listUser.forEach((key, value) => {
          this.teamUse.push(value);
        });
        console.log(this.teamUse);
        console.log(this.listUser);


      }
    }
  }
  onSubmit() {
    console.log(this.ExpenseForm.value.utilisateurConcerned);
    this.http.post<{ message: string }>(this.requestService.url + 'groups/addExpenses', {
      group: this.group._id,
      name: this.ExpenseForm.value.name,
      description: this.ExpenseForm.value.description,
      amount: this.ExpenseForm.value.amount,
      listUsers: this.ExpenseForm.value.utilisateurConcerned,
      date: new Date(),
      owner: this.ExpenseForm.value.owner
    }).subscribe(result => {
      // this.ngOnInit();
      // this.addExpense = false;
      // this.formExpenseCss.nativeElement.className = "expense";
      if (result.message = "Expense was registered successfully!") {
        this.listExpense.push({
          title: this.ExpenseForm.value.name,
          description: this.ExpenseForm.value.description,
          amount: { $numberDecimal: this.ExpenseForm.value.amount },
          listUsers: this.ExpenseForm.value.utilisateurConcerned,
          date: new Date().toISOString().split('T')[0],
          owner: this.ExpenseForm.value.owner
        })
      }

    })
  }
}
