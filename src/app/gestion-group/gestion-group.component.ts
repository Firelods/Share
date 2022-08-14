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
  group: any;
  
  constructor(private route:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.idGroup=params['group'];
      this.http.get<any>('http://localhost:8080/api/group/' + this.idGroup ).subscribe(result => {
        console.log(result);
        this.group = result;
      });
    }
    );
  }

}
