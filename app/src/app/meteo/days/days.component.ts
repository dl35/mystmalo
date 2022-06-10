import { Forecast, RootForecast } from './../../models/MForecast';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { map } from 'rxjs';


@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css'],
  animations: [
  
    trigger('cardFlip', [
      state('start', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow',
        transform: 'rotate(0)'
      })),
      state('end', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue',
        transform: 'rotate(-180deg)'
      })),
      transition('start => end', [
        animate('400ms ease-out')
      ]),
      transition('end => start', [
        animate('400ms ease-in')
      ])

    ])

  ]
})
export class DaysComponent implements OnInit {

  @Input() previsions: RootForecast;
  forecast:Array<Forecast> ;
  modeHours = false;

  openDay = '' ;


  constructor() { }

  ngOnInit(): void {
  }


  showHours( day ) {


    let fday = moment( day ).format('yyyy-MM-DD');
    this.modeHours = true ;
    this.openDay = fday ;
    this.todaysSwipe( fday );

  }

  todaysSwipe( day ) {
     
    let today = moment();
    this.forecast = [] ;

 
      let f =  this.previsions.properties.forecast;
      this.forecast =  f.filter( e => {
        // let ch = e.time.substring(0, 10) ;
     
         let t = moment( e.time  ).utc(true) ;
        // console.log(t1 , e.time,  t.format('yyyy-MM-DD') == d.v  ,  t.format('yyyy-MM-DD') , d.v );

        return (today.isSameOrBefore( t ) &&  t.format('yyyy-MM-DD') == day  )
      }
      
      );
    
        

    

  }

}


