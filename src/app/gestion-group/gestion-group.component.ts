import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeExpense } from '../groupe-expense';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-gestion-group',
  templateUrl: './gestion-group.component.html',
  styleUrls: ['./gestion-group.component.css']
})
export class GestionGroupComponent implements OnInit {
  addExpense: boolean = false;
  idGroup: string = "";
  group!: GroupeExpense;
  ExpenseForm: UntypedFormGroup;
  user!: { email: string; expiry: Int32Array; id: string; token: string; username: string; };
  listUser: { username: string, id: string }[] = [];
  allLoaded: boolean = false;
  teamUse: string[] = [];
  errorForm: boolean = false;
  @ViewChild('formApparition', { static: false })
  public formExpenseCss!: ElementRef;
  // utilisateur: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private requestService: RequestService) {
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
      this.http.get<GroupeExpense>(this.requestService.url + 'group/' + this.idGroup).subscribe(result => {
        console.log(result);
        this.group = result;
        this.group.listMoney.forEach((element: { user1: string, user2: string }) => {
          this.http.get<string>(this.requestService.url + 'user/' + element.user1).subscribe(result => {
            this.listUser.push({ username: result, id: element.user1 });
            element.user1 = result;
          });
          this.http.get<string>(this.requestService.url + 'user/' + element.user2).subscribe(result => {
            this.listUser.push({ username: result, id: element.user2 });
            element.user2 = result;
          });
        });
        this.allLoaded = true;
      });
    }
    );
  }
  onSubmit() {
    this.ExpenseForm.value.utilisateurConcerned = this.teamUse;
    console.log(this.ExpenseForm.value);
    console.log(this.user.username);
    this.http.post<string>(this.requestService.url + 'groups/addExpenses', {
      group: this.idGroup,
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
  ngAfterViewInit() {
    console.log(this.formExpenseCss);
  }
  addUserToList(event: any) {
    this.listUser.push(event.target.value);
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
  showHistory() {
    // navigate to history with this.group
    this.router.navigate(['/history'], { state: { group: this.group }, queryParams: { groupId: this.idGroup } });
  }
  copyShare() {
    var phrase = "Rejoins mon groupe de dépense sur $hare !http://share.clement-lefevre.fr Renseigne ce code une fois inscrit : "
    var copyText = document.getElementById("link")!.innerHTML;
    console.log(phrase + copyText);

    navigator.clipboard.writeText(phrase + copyText);

    document.getElementById("copied")!.style.opacity = "1";
    document.getElementById("copied")!.style.animation = "visible2sec 2s forwards";
  }
}
