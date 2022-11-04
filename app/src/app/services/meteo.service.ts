import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootForecast } from '../models/MForecast';

import { Observable } from 'rxjs/internal/Observable';
import { BullEcheances } from '../models/MBulletin';
import { RootMarine } from '../models/Mmarine';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private umeteo = 'datas/forecast.json'; 
  private ubulletin = 'datas/bulletin.json'; 
  private uephemeride = 'datas/ephemeride.json'; 
  private umarine = 'datas/marine.json'; 

  constructor(private http: HttpClient) { }

  getMeteo(): Observable<RootForecast> {
     return this.http.get<RootForecast>( this.umeteo   );
  }

  getBulletin(): Observable<BullEcheances> {
    return this.http.get<BullEcheances>( this.ubulletin );
 }

  getEphemeride(): Observable<any> {
    return this.http.get<any>( this.uephemeride );
  }

  getMarine(): Observable<RootMarine> {
    return this.http.get<any>( this.umarine );
    }


}
