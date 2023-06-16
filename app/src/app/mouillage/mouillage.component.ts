import { Component, OnInit } from '@angular/core';
import { MouillageService } from '../services/mouillage.service';
import { BehaviorSubject, Observable, combineLatest, filter, map, shareReplay, switchMap } from 'rxjs';
import { Mouillage, MouillageData, SeuilsData } from '../models/MMouillage';
import * as moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

@Component({
  selector: 'app-mouillage',
  templateUrl: './mouillage.component.html',
  styleUrls: ['./mouillage.component.css']
})
export class MouillageComponent implements OnInit {

 
  current = moment();

  //cachedDatas: any ;

  currentDate$ : BehaviorSubject<string>;

  datasFiltered$ : Observable<any>;
 

  teau: number = 0.2 ;
  pied_de_pilote: number = 0.5 ;
  sonde = 6.3
  hauteur = this.sonde+ this.pied_de_pilote + this.teau ;

  constructor(private servMouillage: MouillageService) { }

  ngOnInit(): void {




  this.currentDate$ = new BehaviorSubject<string>( this.getCurrentDay() );

  this.datasFiltered$ = this.currentDate$.pipe(

        switchMap( (v)  =>   this.servMouillage.getMouillage().pipe()  ),
        map( (d)  => this.show(d) )

  )
  
  
 
  }


  public show(v:Mouillage) {
    let mydatas = {sonde:v.sonde ,pied_de_pilote: v.pied_pilote ,tirant_eau: v.tirant_eau , day:'',marnage:0, seuils:[] };
   
    
    const datas:MouillageData = v.datas.find( (v)  =>  v.day == this.getCurrentDayF()  )
  
    mydatas.day =datas.day ;
    mydatas.marnage =datas.marnage ;
    mydatas.seuils = [];
   
  //  const next = moment(datas.day).add(1,'days');
  
  //  const prev = moment(datas.day).add(-1,'days');
    
    let h1 = '';
    let h2 = '';
    let low = '';
    let high = '';
    datas.seuils.forEach(item => {

              if( item.h1 ) {
                const m =  moment( item.h1 , 'YYYY-MM-DD HH:mm:ss');
                if ( m.format("YYYY-MM-DD")  ==  this.getCurrentDayF() ) {
                  h1=m.format("HH[h]mm");
                } else {
                  h1=m.format("[*]HH[h]mm");
                }
                
              }
              if( item.h2 ) {
                const m =  moment( item.h2 , 'YYYY-MM-DD HH:mm:ss');
                if ( m.format("YYYY-MM-DD")  ==  this.getCurrentDayF() ) {
                  h2=m.format("HH[h]mm");
                } else {
                  h2=m.format("[*]HH[h]mm");
                }
              }
              if( item.low ) {
                const m =  moment( item.low , 'YYYY-MM-DD HH:mm:ss');
                if ( m.format("YYYY-MM-DD")  ==  this.getCurrentDayF() ) {
                  low=m.format("HH[h]mm");
                } else {
                  low=m.format("[*]HH[h]mm");
                }
              }
              if( item.high ) {
                const m =  moment( item.high , 'YYYY-MM-DD HH:mm:ss');
                if ( m.format("YYYY-MM-DD")  ==  this.getCurrentDayF() ) {
                  high=m.format("HH[h]mm");
                } else {
                  high=m.format("[*]HH[h]mm");
                }
              }

              let seuils = {h1:h1,high:high,h2:h2,low:low};
              mydatas.seuils.push(seuils) ;
      }
      
      ) ;


  return mydatas ;
  }

  public getCurrent(): string {
    return this.current.format('ddd DD MMMM YYYY') ;
  }

  public getCurrentDayF(): string {
    return this.current.format('YYYY-MM-DD') ;
  }

  public getCurrentDay(): string {
    return this.current.format('YYYYMMDD') ;
  }

init() {
  this.current = moment();
  this.currentDate$.next( this.getCurrentDay() ) 
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
