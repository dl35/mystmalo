import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Forecast, RootForecast } from '../models/MForecast';


@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  current = moment();
  days = [];
  modeHours = false;
  forecast:Array<Forecast> ;
  currentDatas$ : Observable<RootForecast>;


  constructor( private http:HttpClient, private meteoServ: MeteoService, private sanitizer:DomSanitizer) {   

     
      this.currentDatas$ = this.meteoServ.getMeteo2();

      let l =  this.current.format('DD') ;
      let v =  this.current.format('yyyy-MM-DD') ;
      let obj = { l , v }
      this.days.push( obj ) ;
      for(let i = 0 ; i < 5 ; i++ ) {
       let d =  this.current.add( 1,'days') ;
       let l =  d.format('DD') ;
       let v =  d.format('yyyy-MM-DD') ;
       let obj = { l , v }
       this.days.push( obj ) ;

      }
      obj = { l:'D' , v:'-1' };
      this.days.push( obj ) ;


    }


  todays(d:any) {
     
    if( d.v == '-1'  ) {
      this.modeHours = false ;
      this.forecast = [] ;
      return ;
    }

    this.currentDatas$.pipe(
     (map  ( res =>  { 
      let f =  res.properties.forecast;
      let a =  f.filter( e => {
        let current = e.time.substring(0, 10) ;
        return ( current === d.v )
      }
      
      );
      return a;
          }  )   )

    ).subscribe( 

      (v) => {
          this.modeHours = true ;
          this.forecast = v ;
      }

    )

  }



  ngOnInit(): void {
  }

}
