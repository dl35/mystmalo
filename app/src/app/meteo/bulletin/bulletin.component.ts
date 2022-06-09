

import { Observable, shareReplay } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo.service';
import { BullEcheances } from 'src/app/models/MBulletin';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit {

  

  @Input() bulletin: BullEcheances ; 
  constructor(private meteoServ: MeteoService) {

   }

  ngOnInit(): void {
  }

}
