import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  name = 'Kissht';
  KisshtHtml;
  current = moment();
  currentDatas$ : Observable<any>;
  constructor(private http:HttpClient, private meteoServ: MeteoService, private sanitizer:DomSanitizer) {   

      this.currentDatas$ =  this.meteoServ.getMeteo();

      this.meteoServ.getMeteo2() .subscribe( 

        (v)  => console.log( v )  


      ) ;



    }

  ngOnInit(): void {
  }

}
