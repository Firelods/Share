import { Component, OnInit } from '@angular/core';
import { GroupeExpense } from 'src/app/groupe-expense';
import { GestionGroupComponent } from '../gestion-group.component';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent extends GestionGroupComponent implements OnInit {



  override ngOnInit(): void {
    super.ngOnInit();
  }

}
