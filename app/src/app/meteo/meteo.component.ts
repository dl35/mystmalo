import { RootEphe } from './../models/MEphemerides';
import { Observable, shareReplay } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { RootForecast } from '../models/MForecast';


import { BullEcheances } from '../models/MBulletin';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
 
})
export class MeteoComponent implements OnInit {

  current = moment();
 
  
  
  currentDatas$ : Observable<RootForecast>;
  currentBulletin$ : Observable<BullEcheances>;
  currentEphemeride$: Observable<RootEphe>;

  

  constructor(private meteoServ: MeteoService, private sanitizer:DomSanitizer) {   
    
      this.currentDatas$ = this.meteoServ.getMeteo().pipe(shareReplay(1));;

    }




  ngOnInit(): void {

    this.currentEphemeride$ = this.meteoServ.getEphemeride().pipe( shareReplay(1) );
    this.currentBulletin$ = this.meteoServ.getBulletin().pipe( shareReplay(1) );
  }

}
