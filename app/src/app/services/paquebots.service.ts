import { Injectable } from '@angular/core';
import { Paquebots } from '../models/MPaquebots';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaquebotsService {




  private url = 'datas/paquebots.json'; 


  constructor(private http: HttpClient) { }

  getPaquebots(): Observable<Paquebots[]> {
     return this.http.get<Paquebots[]>( this.url  );
  }

}
