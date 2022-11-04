import { RootMarine } from './../../models/Mmarine';
import { Component, Input, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo.service';

@Component({
  selector: 'app-marine',
  templateUrl: './marine.component.html',
  styleUrls: ['./marine.component.css']
})
export class MarineComponent implements OnInit {

 
  @Input() marine: RootMarine ; 
  constructor(private meteoServ: MeteoService) {

   }

  ngOnInit(): void {

    
  }

}
