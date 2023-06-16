import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Mouillage } from '../models/MMouillage';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouillageService {

  cached$: Observable<Mouillage>;
  
    constructor(private http: HttpClient) { }
  
    getMouillage(): Observable<Mouillage> {
      const url = 'datas/seuils.json' ;

      this.cached$ = undefined ;

      if ( !this.cached$ ) {
       this.cached$ =  this.http.get<Mouillage>( url  ).pipe(
    
        shareReplay(1)
       );
       }

        return this.cached$ ;
    


    }
  
  }
