import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MareeService {

    private umaree = 'datas/maree_stmalo.json';

    constructor(private http: HttpClient) { }

    getMaree() {
      return this.http.get<any>( this.umaree  );
    }

    getMaree2() {
      return this.http.get<any>( this.umaree  ).pipe( 
        shareReplay(1)
        ) ;

        
    }

  }