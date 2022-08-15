import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-group',
  templateUrl: './gestion-group.component.html',
  styleUrls: ['./gestion-group.component.css']
})
export class GestionGroupComponent implements OnInit {
  idGroup: string="";
  group: any="{}";
  allLoaded:boolean = false;
  constructor(private route:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
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

}
