import { Paquebots } from './../models/MPaquebots';
import { Component, OnInit } from '@angular/core';
import { PaquebotsService } from '../services/paquebots.service';
import { Observable } from 'rxjs/internal/Observable';
import moment from 'moment';
import { BehaviorSubject, combineLatest, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-paquebots',
  templateUrl: './paquebots.component.html',
  styleUrls: ['./paquebots.component.css']
})
export class PaquebotsComponent implements OnInit {

  datas$:  Observable<Paquebots[]>;
  current = moment();

  private subject$ = new BehaviorSubject<boolean>( true );


  constructor(private pserv: PaquebotsService) { }

  public setCurrentDate() {

    this.current.hour(0);
    this.current.minute(0);
    this.current.second(0);
    this.current.millisecond(0);

  }

  ngOnInit(): void {

        this.setCurrentDate();

      this.datas$ = combineLatest( [this.subject$ , this.pserv.getPaquebots() ] ).pipe(

          map( ([s1,v] )  => { if (s1) {
            return v.filter(  item => (  moment(item.date).isSameOrAfter( this.current )  ) )   ;
          }  else {

            return v ;
          }

          
              }
      )
      )
        


  }

      public all() {
          this.subject$.next( false );
      }

      public next(){
        this.subject$.next( true );
      }
 

    public getCurrent(): string {
      
      return this.current.format('YYYY-MM-DD HH:mm') ;
    }


}
