import { AfterContentInit, Component, OnInit } from '@angular/core';
import { GroupeExpense } from 'src/app/groupe-expense';
import { GestionGroupComponent } from '../gestion-group.component';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent extends GestionGroupComponent implements OnInit, AfterContentInit {
  loaded: boolean = false;



  override ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.loaded = true;
  }

}
