import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { RootMarine } from './../../models/Mmarine';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-marine',
  templateUrl: './marine.component.html',
  styleUrls: ['./marine.component.css']
})
export class MarineComponent implements OnInit {


  @ViewChild('chart', { static: true}) 
  private myChart?: ElementRef;
 
  width = 0;
  height = 0;
  margin = 80 ;

  posy = 14 ;
  scaleX: any ;
  scaleY: any ;

  isMobile = false;
 @Input() marine: RootMarine ; 


  constructor( public breakpointObserver: BreakpointObserver ) {

  

   }

  ngOnInit(): void {

   
  }


  ngOnChanges () {
    // Check if the data exists before using it
    if (this.marine) {
      this.draw() ;
     } 
}



  ngAfterContentInit(): void {
    
  

    this.breakpointObserver
    .observe([ Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge])
    .subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small] ) {
    
        this.isMobile = true ;
        
       } else {
        this.isMobile = false ;
        
        }   
  
  
       
 


  });

  }

  draw(){

  //  if ( !this.marine ) return ;

    console.log( 'marine draw ' ,   this.marine );


  this.posy = 14 ;

  this.width = this.myChart.nativeElement.clientWidth;
  this.height =  window.innerHeight ;// this.myChart.nativeElement.clientHeight;
 // this.height =  this.myChart.nativeElement.clientHeight;
  

   d3.select(this.myChart?.nativeElement).selectAll("svg").remove();
   this.width =  300 ;
   this.height = 300 ;

const svg = d3.select(this.myChart?.nativeElement)
.append("svg")
.attr("viewBox", [0, 0, this.width, this.height])

//.attr('height','100%' )
//.attr('width', '100%' )
.attr("preserveAspectRatio", "xMinYMin meet")

//.classed("chart",true)




svg.append("rect")
.style('fill', 'white')
.style('stroke', 'red')
.style('stroke-width', '2px')
.attr("x", 0 ) 
.attr("y", 0 )  
.attr("width", this.width )
.attr("height", this.height )

 // d3.select(this.myChart?.nativeElement).remove();

  if( this.isMobile ) {
   
//    this.width = window.innerHeight ; 
//    this.height =  window.innerHeight ; 
  this.width =  900 ;
  this.height = 900 ;

  const svg = d3.select(this.myChart?.nativeElement)
  .append("svg")
  .attr("viewBox", [0, 0, this.width, this.height])
  
  .attr('height','100%' )
  .attr('width', '100%' )
  .attr("preserveAspectRatio", "xMinYMin meet")

  .classed("chart",true)




  svg.append("rect")
 .style('fill', 'red')
 .style('stroke', 'red')
  .style('stroke-width', '2px')
  .attr("x", 0 ) 
  .attr("y", 0 )  
  .attr("width", this.width )
  .attr("height", this.height )





  
  this.scaleX = this.getScaleX();

  
 
  
  this.drawWind( svg , this.scaleX );
  this.posy = this.posy + 80 ;
  this.drawLine( svg );
  this.posy = this.posy + 10 ;

  /*
  this.drawPicto( svg , this.scaleX );
  this.posy = this.posy + 50 ;
  this.drawLine( svg );
  this.posy = this.posy + 30 ;
  this.drawNebul( svg , this.scaleX );
  this.posy = this.posy + 30 ;
  this.drawLine( svg );
 */
  this.posy = this.posy + 80 ;

  let delta = 125 ;

 // this.drawRR( svg , delta);


/*
  this.scaleY = this.getScaleY( delta );

  this.drawAxisY( svg , this.scaleY );
  this.drawAxisX( svg , this.scaleX , delta );

*/
 // this.drawTemperature( svg , this.scaleX , this.scaleY );
 // this.posy = this.posy + 45 ;

 
 
  };


}

getScaleY(  delta ) {

   
  let scaleY = d3.scaleLinear()
  // .domain(d3.extent( this.forecast,  (d)  =>  { return  d.T  }))
   .domain([ 
     d3.min(this.marine.properties.marine ,  (d)  =>  { return 0   }) ,
     d3.max(this.marine.properties.marine,  (d)  =>  { return 25   }) 
   ] )
  //.range([580, 450])
  .range([this.posy+ delta , this.posy])
  .nice();

  return scaleY ;

}

drawAxisY(svg , scaleY ) {

const yAxis = d3
// .axisRight(scaleY )
.axisLeft( scaleY )
.ticks(4)
const ya = svg.append('g')
.attr('id', 'y-axis')
.style('transform', 'translate(' + 70  + 'px,  0)');

ya.call(yAxis);



}

getScaleX() {
let scaleX = d3.scaleTime()
  
.domain(d3.extent(this.marine.properties.marine , (d) => { return new Date( d.time) } ))
.range([ this.margin , this.width- this.margin ]);

return scaleX ;

}

drawAxisX(svg, scaleX , delta) {

const xAxis = d3
   .axisBottom(scaleX)
   .tickSizeInner(0)
   .tickSizeOuter(0.5)
  .ticks( this.marine.properties.marine.length)
  .tickFormat(d3.timeFormat('%HH'));
const xa =svg.append('g')
  .attr('id', 'x-axis')
 // .style('transform', 'translate(0, ' + (this.height  - 20 )  + 'px)')
  .style('transform', 'translate(0, ' + (this.posy + delta)  + 'px)')

xa.call(xAxis);


return scaleX ;
  
}


drawWind( svg , scaleX) {
    
  let size = 45 ;
  
  const layer1 = svg.append("g")
              
               .append("text") // enter append
               .attr("class","ff_text ff_legend")
               .attr("x", this.margin /2  )   
               .attr("y", 35  )  
               .text( "vent km/h" ) 
               .exit()
  

  const layer = svg.append("g").
               attr("id","reg.wind")
        
  
      layer.selectAll("#reg.wind")
      .data( this.marine.properties.marine)
      .join("g")
      .attr("transform" ,  (d) =>  {  const v = Math.round( scaleX(new Date(d.time)) -size /2 ) ; return 'translate('+ v + ','+ this.posy +')' }  )
      .append("g") 
      .attr("transform" , 'translate(0,0)' )

    
      .append("image") 
      .attr("transform" , 'translate(0,25)' )
      .attr('xlink:href', (d) => { return `assets/pictos/${d.wind_icon}.svg`  } )
      .attr("x", 0 )  
      .attr("y", 0 ) 
      .attr("width", size  )
      .attr("height", size )
      .select( function() {
          return this.parentNode
      })
      .append("text") // enter append
      .classed("ff_text",true)
      .attr("x", size/2 )   
      .attr("y", size/2  )  
      .text( d=> Math.round(d.wind_speed * 3.6 )   ) 
      .select( function() {
        return this.parentNode
      })
      .append("circle") 
      .classed('fx_circle', true )
      .style("display", (d) => ( d.wind_speed_gust > 0 ) ? 'true' : 'none'  )
      .attr("cx", size ) 
      .attr("cy",size/8 )  
      .attr("r", size/4 )
      .select( function() {
        return this.parentNode
      })
   /*   .append("text") // enter append
      .classed('fx', true )
      .style("display", (d) => ( d.wind_speed_gust > 0 ) ? 'true' : 'none'  )
      .attr("x", size )   
      .attr("y", size/8  )  
      .text( d=> Math.round( this.getFx( d) )   ) 
      
   */

      

}


drawLine ( svg ) {
  svg.append("line")
  .attr("x1", this.margin/2 )
  .attr("x2", this.width - this.margin/2)
  .attr("y1", this.posy )
  .attr("y2", this.posy  )
  .style("stroke", "blue")
  .style('stroke-width', '1px')

}










}