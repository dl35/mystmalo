import { Ephemeris, RootEphe } from './../models/MEphemerides';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Forecast, RootForecast } from '../models/MForecast';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


import * as kf from '../gesture/keyframes';
import { BullEcheances } from '../models/MBulletin';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(1000, keyframes(kf.slideOutRight))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
    ])

  ]
})
export class MeteoComponent implements OnInit {

  current = moment();
 
  modeHours = false;
  animationState: string;

  forecast:Array<Forecast> ;
  currentDatas$ : Observable<RootForecast>;
  currentBulletin$ : Observable<BullEcheances>;
  currentEphemeride$: Observable<RootEphe>;
 
  
  visu = 0 ;
  openDay = '' ;

  constructor(private meteoServ: MeteoService, private sanitizer:DomSanitizer) {   

  
      this.currentDatas$ = this.meteoServ.getMeteo().pipe(shareReplay(1));;

    }


   



  

  todaysSwipe( day ) {
     
    let today = moment();
    this.forecast = [] ;



  

    this.currentDatas$.pipe(
     (map  ( res =>  { 
      let f =  res.properties.forecast;
      let a =  f.filter( e => {
        // let ch = e.time.substring(0, 10) ;
     
         let t = moment( e.time  ).utc(true) ;
        // console.log(t1 , e.time,  t.format('yyyy-MM-DD') == d.v  ,  t.format('yyyy-MM-DD') , d.v );

        return (today.isSameOrBefore( t ) &&  t.format('yyyy-MM-DD') == day  )
      }
      
      );
      return a;
          }  )   )

    ).subscribe( 

      (v) => {
          this.forecast = v ;
         
      }

    )

  }

  showHours( day ) {

    let fday = moment( day ).format('yyyy-MM-DD');
    this.modeHours = true ;
    this.openDay = fday ;
    this.todaysSwipe( fday );

  }




   swipeLeft() {
    this.animationState = 'slideOutLeft';
    
    if( this.visu == 0 ) {
      this.visu = 2;
    }  else {
      this.visu = this.visu -1 
    }
    if( this.visu == 1 ) {
      this.currentBulletin$ = this.meteoServ.getBulletin().pipe( shareReplay(1) );
    } else if ( this.visu == 2 ) {
      this.currentEphemeride$ = this.meteoServ.getEphemeride().pipe( shareReplay(1) );
    }

    /*

    this.index = this.index -1 ;
    
    if( this.index < 0  ) {
        this.index = this.days.length -1 ;
    }

    this.todaysSwipe();
    */
    
    
   }
   
   
  swipeRight() {
    this.animationState = 'slideOutRight';
  
      if( this.visu == 2 ) {
        this.visu = 0;
      }  else {
        this.visu = this.visu + 1 
      }

      if( this.visu == 1 ) {
        this.currentBulletin$ = this.meteoServ.getBulletin().pipe( shareReplay(1) );
      } else if ( this.visu == 2 ) {
        this.currentEphemeride$ = this.meteoServ.getEphemeride().pipe( shareReplay(1) );
      }
   
  
  
  /*  let size = this.days.length ; 
    this.index = this.index + 1 ;
    if(  this.index >=  size) {
      this.index =  0; 
  }

    
    this.todaysSwipe();*/

     }

     resetAnimationState() {
      this.animationState = '';
    }


  ngOnInit(): void {

  }

}
