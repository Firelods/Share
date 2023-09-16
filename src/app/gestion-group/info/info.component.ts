import { Component, OnInit } from '@angular/core';
import { GestionGroupComponent } from '../gestion-group.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent extends GestionGroupComponent implements OnInit {


  override ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
}
