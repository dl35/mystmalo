import { Component, OnInit } from '@angular/core';
import packageJson from '../../../package.json';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  public version: string = packageJson.version;
  public mobile = false ;
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {

    this.responsive.observe([
      Breakpoints.Small,  Breakpoints.XSmall    , Breakpoints.Tablet

      ])
      .subscribe((bs: BreakpointState ) => {

        this.mobile = false; 

        if (bs.matches) {
          this.mobile = true;
        }

  });

  
  }

}
