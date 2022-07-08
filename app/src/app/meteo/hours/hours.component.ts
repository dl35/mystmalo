import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Forecast } from 'src/app/models/MForecast';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  show = false;

  @Input() forecast:Array<Forecast> ;

  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  showChart(){
    console.log ( this.show );
    this.show = ! this.show ;
  }

  toclose() {
    this.close.emit();

  }
}
