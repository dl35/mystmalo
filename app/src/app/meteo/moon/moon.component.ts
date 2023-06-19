import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  encapsulation : ViewEncapsulation.None,
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.css']
})
export class MoonComponent implements OnInit , AfterViewInit {

 //  https://github.com/myrises/d3-moon-shade
 // https://github.com/myrises/moon-phase-d3

  private _phase$ = new BehaviorSubject<number>(0);

  @ViewChild("mysvg", {static: true })  mysvg: ElementRef<SVGElement> 
  @Input()
  set phase(value: number) {
      if (value )
        this._phase$.next( value );
  }
  get phase() {

    return this._phase$.getValue();
}



  
  constructor() { 

  this.phase = 0 ;


  }
  ngAfterViewInit(): void {
    this._phase$.subscribe( 

      (v)  => {
   
        this.updatePhase( v )
      } 

  );
  }
  updatePhase(v: number ): void {

      //v = 0.1232 ;

      const  width  = 90;
      const  height = 90;
      const  r      =  30;


      const x = 0 + width / 2 ; 
      const y = 0 + height /2 ; 
  

  
    const svg = d3.select(this.mysvg.nativeElement )
      .attr("width",  width  )
      .attr("height", height  ) ;
      // .style("border","1px solid black")
      
 
      
    svg.append("circle")
      .attr("class","moonlight")
      .attr("cx", x )
      .attr("cy", y )
      .attr("r", r );
    

    svg.append("image")
      .attr(  "x", x - r)
      .attr(  "y", y - r)
      .attr(  "width", 2 * r)
      .attr(  "height", 2 * r)
      .attr("xlink:href",'assets/moon/moon.png' )

    this.DrawMoonShade( v, x, y, r, svg)
  
    /*svg.append("text")
    .attr("class","text2")
    .attr("x", x)
    .attr("y", y + r  )
    .text( v );*/
  


  }

  ngOnInit(): void {

  }

  DrawMoonShade(Phase, CX, CY, R, svg ) {

    // Phase = 0.5 ;

    // Phase = Phase * -1 ;
    // full moon
    if(Phase == 1) { 
      return;
    };
    
    // new moon
    if(Math.abs(Phase) == 0) {
      svg.append("circle")
         .attr("class","moonshade")
         .attr( "cx",  CX )
         .attr( "cy", CY )
         .attr( "r",  R );
     
      return;
    };
    
    var d = "M" + CX + "," + (CY - R) +
      "A" + R + "," + R +
      " 0 1 " + ((Phase > 0) ? "0" : "1") +
      " " + CX + "," + (CY + R);
      
    if(Math.abs(Phase) == 0.5) {
      // half moon
      d += "Z";
    }
    else {
     
    

      var h = 2 * R * (
        ((Phase > -0.5) && (Phase < 0.5) ? 1 - Math.abs(Phase) : Math.abs(Phase))
              - 0.5);
      var leg = Math.sqrt(R * R + h * h);
    
      var bigR = leg * leg / (2 * Math.sqrt(leg * leg - R * R));
    
      d += "A" + bigR + "," + bigR +
        " 0 0 " + 
        ((Phase < -0.5) || ((Phase > 0) && (Phase < 0.5)) ? "0" : "1") +
        " " + CX + "," + (CY - R);
    };
    
    svg.append("path")
      .attr("class","moonshade")
      .attr("d", d );
      
  };

}