import { RootEphe } from './../../models/MEphemerides';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ephemeride',
  templateUrl: './ephemeride.component.html',
  styleUrls: ['./ephemeride.component.css']
})
export class EphemerideComponent implements OnInit {


    // doc   => https://stackoverflow.com/questions/57063248/svg-moon-phases

  @Input() ephe: RootEphe;
  constructor() { }

  ngOnInit(): void {
  }

}
