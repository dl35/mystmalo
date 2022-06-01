import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootForecast } from '../models/MForecast';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private umeteo = 'datas/meteo_stmalo.json';
  private umeteo2 = 'datas/forecast.json'; 

  constructor(private http: HttpClient) { }

  getMeteo() {
    return this.http.get<any>( this.umeteo  );
  }



  getMeteo2(): Observable<RootForecast> {
     return this.http.get<RootForecast>( this.umeteo2   );
  }


}
