import { Component, OnInit } from '@angular/core';
import { MareeService } from '../services/maree.service';
import { Observable, of, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



@Component({
  selector: 'app-maree',
  templateUrl: './maree.component.html',
  styleUrls: ['./maree.component.css']
})
export class MareeComponent implements OnInit {


  current = moment();

  //cachedDatas: any ;

  currentDate$ : BehaviorSubject<string>;

  datasFiltered$ : Observable<any[]>;
  datas$:  Observable<any>;


  ismobile= false;
  constructor(private mareeServ: MareeService ,private breakpointObserver: BreakpointObserver ) { 

  }

  ngOnInit(): void {

     this.breakpointObserver.observe([
      Breakpoints.Small,  Breakpoints.XSmall    , Breakpoints.Tablet
    ]).subscribe(
      (state: BreakpointState ) => {
       if ( state.matches ) {
          this.ismobile = true;
       } else {
          this.ismobile = false;
       }
      }

    );

      this.datas$ = this.mareeServ.getMaree();
      this.currentDate$ = new BehaviorSubject<string>( this.getCurrentDay() );

      this.datasFiltered$ = combineLatest(
         [ this.datas$ , this.currentDate$ ] 
         ).pipe(
          map( ( [datas , day ] )   => {  return   this.show( datas , day )  } 
          ) )


  }


  init() {
   this.current = moment();
   this.currentDate$.next( this.getCurrentDay() ) 
  }

public getCurrent(): string {
  return this.current.format('DD MMMM YYYY') ;
}

public getCurrentDay(): string {
  return this.current.format('YYYYMMDD') ;
}

public show( datas , day  ) {

  if( day === 'GD90' ) {
    return this.showGdmaree( datas, 90 );
  } else if (  day === 'GD100') {
    return this.showGdmaree( datas , 100 );
  } else {
    return this.showDay( datas , day );
  }

}


public showDay( datas, day ): any[] {
   const res = []  ;
    const obj = datas.days[day];
    if( obj ) {
      obj.day = moment(day);
      res.push( obj ) ;
    }
      return res ;
}


  showGdmaree(  datas , coef: number ) {
    const res = [];

    const dday = moment();
  //  const lastday = moment();
  //  lastday.date(31);
  //  lastday.month(11);

    while ( true )   {
      const fd = dday.format('YYYYMMDD');
      const obj = datas.days[fd];
      if ( !obj ) break ;
  
      if ( (obj.pm1) && (obj.pm1.c >= coef ) ) {
        obj.day = moment(dday);
        res.push( obj ) ;
       } else  if ( (obj.pm2) && (obj.pm2.c >= coef)  ) {
        obj.day = moment(dday);
        res.push( obj ) ;
      };

      dday.add(+1, 'days');
    /*  if ( dday.isAfter(lastday) ) {
       break;
     }*/

    }

  return res;
 
  }




  public last() {
    this.current.subtract(1 , 'days' );
    this.currentDate$.next( this.getCurrentDay() ) 
  }

  next() {
    this.current.add(1 , 'days' );
    this.currentDate$.next( this.getCurrentDay() ) 
   }



}
