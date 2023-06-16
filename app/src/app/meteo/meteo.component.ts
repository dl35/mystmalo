import { RootEphe } from './../models/MEphemerides';
import { Observable, shareReplay } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { RootForecast } from '../models/MForecast';


import { BullEcheances } from '../models/MBulletin';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatTabGroup } from '@angular/material/tabs';
import { RootMarine } from '../models/Mmarine';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
 
})
export class MeteoComponent implements OnInit {

  current = moment();
 
  @ViewChild('tabs') tabGroup: MatTabGroup;
  
  currentDatas$ : Observable<RootForecast>;
  currentBulletin$ : Observable<BullEcheances>;
  currentEphemeride$: Observable<RootEphe>;
  currentMarine$ : Observable<RootMarine>;
  ismobile = false;

  index = 0 ;

  constructor(private meteoServ: MeteoService, private breakpointObserver: BreakpointObserver ) {   
    
      this.currentDatas$ = this.meteoServ.getMeteo().pipe(shareReplay(1));;
      this.breakpointObserver.observe([
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(
        (state: BreakpointState ) => {
         if ( state.matches ) {
            this.ismobile = false;
         } else {
            this.ismobile = true;
         }
        }
  
      );
    }


   toNext( indice )  {
    this.index = indice ;

   }
   
   next(){

      this.index = this.index + 1;
      if( this.index > 3 ) {
        this.index = 0 ;
      }

      this.tabGroup.selectedIndex = this.index;

    }


  ngOnInit(): void {

    this.currentBulletin$ = this.meteoServ.getBulletin().pipe( shareReplay(1) );
    this.currentEphemeride$ = this.meteoServ.getEphemeride().pipe( shareReplay(1) );
    this.currentMarine$ = this.meteoServ.getMarine().pipe( shareReplay(1) );
  }

}


