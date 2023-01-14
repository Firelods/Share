import { Observable } from 'rxjs';
import { slideInAnimation } from './../animation';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { GroupeExpense } from '../groupe-expense';
import { LoginService } from '../service/login.service';
import { RequestService } from '../service/request.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-gestion-group',
  templateUrl: './gestion-group.component.html',
  styleUrls: ['./gestion-group.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class GestionGroupComponent implements OnInit {
  idGroup: string = "";
  listExpenseId: String[] = [];
  listExpense: Expense[] = [];
  group!: GroupeExpense;
  user!: { email: string; expiry: Int32Array; id: string; token: string; username: string; };
  listUser: Map<string, string> = new Map<string, string>();
  allLoaded: boolean = false;
  errorForm: boolean = false;

  // utilisateur: string = "";
  constructor(private router: Router, private route: ActivatedRoute, public http: HttpClient, public requestService: RequestService, private contexts: ChildrenOutletContexts) {

  }

  ngOnInit(): void {
    // initialise a empty groupExpense
    // this.group = new GroupeExpense();
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.route.queryParams.subscribe(params => {
      this.idGroup = params['group'];
      this.http.get<GroupeExpense>(this.requestService.url + 'group/' + this.idGroup).subscribe(result => {
        this.group = result;
        this.group.listMoney.forEach((element: { user1: string, user2: string }) => {
          this.http.get<string>(this.requestService.url + 'user/' + element.user1).subscribe(result => {
            this.listUser.set(element.user1, result);
            element.user1 = result;
          });
          this.http.get<string>(this.requestService.url + 'user/' + element.user2).subscribe(result => {
            this.listUser.set(element.user2, result);
            element.user2 = result;
          });
        });
        this.allLoaded = true;
        this.group.history.forEach((value: { _idExpense: String }) => {
          this.listExpenseId.push(value._idExpense);
        });
        this.listExpenseId.forEach((value: String) => {
          this.http.get<Expense>(this.requestService.url + 'expense/' + value).subscribe(result => {
            // console.log(result);
            this.listExpense.push(result);
          })
        });

      });
    }
    );
  }
  addUserToList(event: any) {
    // this.listUser.push(event.target.value);
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
  boldNav(event: any, place: string) {
    var nav = document.getElementsByClassName("navGroupElem");
    console.log(nav);

    for (let i = 0; i < nav.length; i++) {
      nav[i].classList.remove("bold");
    }
    if (place == "history") {
      document.getElementById("history")!.classList.add("bold");
    } else {

      event.target.classList.add("bold");
    }
  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }


}
