import { ActusService } from './../services/actus.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {

  datas$ = new Observable();
  constructor(private actuServ: ActusService) {     }

  ngOnInit(): void {

    this.datas$ = this.actuServ.getActualite();



  }

}
