import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActusService } from '../services/actus.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  datas$ = new Observable();
  constructor(private actuServ: ActusService) {     }

  ngOnInit(): void {
    this.datas$ = this.actuServ.getAgenda();
  }

}
