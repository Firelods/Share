import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-group',
  templateUrl: './gestion-group.component.html',
  styleUrls: ['./gestion-group.component.css']
})
export class GestionGroupComponent implements OnInit {
  addExpense:boolean=false;
  idGroup: string="";
  group: any="{}";
  ExpenseForm: UntypedFormGroup;
  user: any="{}";
  listUser: any[] = [];
  allLoaded:boolean = false;
  errorForm: boolean = false;
  constructor(private route:ActivatedRoute,private http: HttpClient) {
    this.ExpenseForm = new UntypedFormGroup({
      name: new UntypedFormControl(''),
      amount: new UntypedFormControl(''),
      description: new UntypedFormControl('')
    })
   }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')||"{}");
    this.route.queryParams.subscribe(params=>{
      this.idGroup=params['group'];
      this.http.get<any>('http://localhost:8080/api/group/' + this.idGroup ).subscribe(result => {
        console.log(result);
        this.group = result;
        this.group.listMoney.forEach((element: { user1: string,user2: string}) => {
          this.http.get<any>('http://localhost:8080/api/user/' + element.user1).subscribe(result=> {
            element.user1 = result;
          });
          this.http.get<any>('http://localhost:8080/api/user/' + element.user2).subscribe(result=> {
            element.user2 = result;
          });
        });
        this.allLoaded = true;
      });
      
    }
    );
  }
  onSubmit(){
    this.http.post<any>('http://localhost:8080/api/groups/addExpenses',{name:this.ExpenseForm.value.name,})
  }
  addUserToList(event: any){
    this.listUser.push(event.target.value);
    
  }
}
