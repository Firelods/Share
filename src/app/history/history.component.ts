import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GestionGroupComponent } from '../gestion-group/gestion-group.component';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../gestion-group/gestion-group.component.css']
})
export class HistoryComponent implements OnInit {
  group: any;
  groupId: String = "";
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    //get group id from url
    this.groupId = this.router.url.split("/")[2];
    if (window.history.state.group) {

      this.group = window.history.state.group;
    }
    else {
      //navigate to group page with group id in query params
      this.location.back();
    }

  }

}
