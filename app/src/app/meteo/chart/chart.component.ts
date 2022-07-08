import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Forecast } from 'src/app/models/MForecast';
import * as d3 from 'd3';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { fromEvent, Observable, Subscription } from 'rxjs';



@Component({
  encapsulation : ViewEncapsulation.None,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit , AfterContentInit {


  @Input() forecast:Array<Forecast> ;

  
  // https://github.com/DavidBanksNZ/DailyWeatherGraph/blob/master/daily-weather-graph.js


  // https://medium.com/weekly-webtips/build-a-simple-line-chart-with-d3-js-in-angular-ccd06e328bff


  width = 0;
  height = 0;
  margin = 80 ;

  posy = 14 ;
  scaleX: any ;
  scaleY: any ;

  @ViewChild('chart', { static: true}) 
  private myChart?: ElementRef;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  isMobile = false;

  constructor(public breakpointObserver: BreakpointObserver) { }

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
  
      if( this.forecast )  
         this.draw() ;
 


  });

  }


  ngOnInit(): void {





  }

  draw(){

    this.posy = 14 ;

    this.width = this.myChart.nativeElement.clientWidth;
    this.height =  window.innerHeight ;// this.myChart.nativeElement.clientHeight;
    
  
   d3.select(this.myChart?.nativeElement).selectAll("svg").remove();
  //  this.width =  600 ;
  //  this.height = 500 ;

   // d3.select(this.myChart?.nativeElement).remove();

    if( this.isMobile ) {
     
      this.width = window.innerHeight ; 
      this.height =  window.innerHeight ; 
  //  this.width =  600 ;
  //  this.height = 600 ;// this.myChart.nativeElement.clientWidth;




    }

    const svg = d3.select(this.myChart?.nativeElement)
    .append("svg")
    .attr("viewBox", [0, 0, this.width, this.height])
    
    .attr('height','100%' )
    .attr('width', '100%' )
    .attr("preserveAspectRatio", "xMinYMin meet")
  //  .classed("chart",true)

    if( this.isMobile ) {
     svg.attr('transform', 'rotate(90)')
     //svg.attr('transform-origin', 'center')
     //svg.attr('transform-box', 'fill-box')
    }
    // translate(500,300)
   // .classed("svg-content", true);
    //svg.style("background-color","orange");

    svg.append("rect")
    .style('fill', 'none')
    .style('stroke', 'red')
    .style('stroke-width', '2px')
    .attr("x", 0 ) 
    .attr("y", 0 )  
    .attr("width", this.width )
    .attr("height", this.height )

   /* let aspect = this.width / this.height;

    let vchart = d3.select('#chart');
    d3.select(window).on("resize", function() {
      var targetWidth = vchart.node().getBoundingClientRect().width;
      svg.attr("width", targetWidth);
      svg.attr("height", targetWidth / aspect);
    });*/



    
    this.scaleX = this.getScaleX();
    this.scaleY = this.getScaleY();
    
   
    
    this.drawWind( svg , this.scaleX );
    this.posy = this.posy + 80 ;
    this.drawLine( svg );
    this.posy = this.posy + 10 ;

    this.drawPicto( svg , this.scaleX );
    this.posy = this.posy + 50 ;
    this.drawLine( svg );
    this.posy = this.posy + 30 ;
    this.drawNebul( svg , this.scaleX );
    this.posy = this.posy + 30 ;
    this.drawLine( svg );
   
    this.posy = this.posy + 50 ;
    this.drawAxisY( svg , this.scaleY );
    this.drawAxisX( svg , this.scaleX );
    this.drawTemperature( svg , this.scaleX , this.scaleY );
  
   
    };
    
    drawTemperature( svg , scaleX , scaleY ) {
    
    
    
    let line = d3.line()
      .x(d => d[0] )
      .y(d => d[1] )
      .curve(d3.curveMonotoneX);
    
      const tpoints: [number, number][] = this.forecast.map(d => [
        scaleX(new Date(d.time)),
        scaleY(d.T),
       
      ]);
    
      const trpoints: [number, number][] = this.forecast.map(d => [
        scaleX(new Date(d.time)),
        scaleY(d.T_windchill),
      ]);
    
    svg.append("g")
      .append("path")
      .attr('id', 'tline')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px')
      .attr('d', line(tpoints));
    
    
      svg.append("g")
      .append("path")
      .attr('id', 'trline')
      .style('fill', 'none')
      .style('stroke', 'blue')
      .style('stroke-width', '2px')
      .attr('d', line(trpoints));
    
    
    
    
    svg.selectAll(".tline")
      .data( this.forecast )
      .join("circle") // enter append
      .style('fill', 'green')
        //.attr("class", "circle-germany")
        .attr("r", "3") // radius
        .attr("cx", d=> scaleX(new Date(d.time)))   // center x passing through your xScale
        .attr("cy", d=> this.scaleY(d.T))   // center y through your yScale
    
        svg.selectAll(".tline")
        .data( this.forecast )
        .join("text") // enter append
        .style('fill', '#2b2929')
        .style('font-family', 'Georgia')
        .style('font-size', '12px')
          //.attr("class", "circle-germany")
        .attr("x", d=> scaleX(new Date(d.time)))   // center x passing through your xScale
        .attr("y", d=> 12 +this.scaleY(d.T))   // center y through your yScale
        .text( d=> this.getRoundTemp(d.T)  )  
    
        svg.selectAll(".trline")
        .data( this.forecast )
        .join("circle") // enter append
        .style('fill', 'green')
          //.attr("class", "circle-germany")
          .attr("r", "3") // radius
          .attr("cx", d=> scaleX(new Date(d.time)))   // center x passing through your xScale
          .attr("cy", d=> this.scaleY(d.T_windchill))   // center y through your yScale
      
          svg.selectAll(".trline")
          .data( this.forecast )
          .join("text") // enter append
          .style('fill', '#2b2929')
          .style('font-family', 'Georgia')
          .style('font-size', '12px')
            //.attr("class", "circle-germany")
          .attr("x", d=> scaleX(new Date(d.time)))   // center x passing through your xScale
          .attr("y", d=> 12 +this.scaleY(d.T_windchill))   // center y through your yScale
          .text( d=> this.getRoundTemp(d.T_windchill) )  
       
    }
    
    getRoundTemp( t ) {

      t = Math.round( t.toFixed(1) );
      return  t ;

    }

    getScaleY() {
      let scaleY = d3.scaleLinear()
      // .domain(d3.extent( this.forecast,  (d)  =>  { return  d.T  }))
       .domain([ 
         d3.min(this.forecast,  (d)  =>  { return ( d.T < d.T_windchill ) ? d.T : d.T_windchill   }) ,
         d3.max(this.forecast,  (d)  =>  { return ( d.T > d.T_windchill ) ? d.T : d.T_windchill   }) 
       ] )
      //.range([580, 450])
      .range([this.posy+ 350 , this.posy+ 200])
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
    .style('transform', 'translate(' + 80  + 'px,  0)');
    
    ya.call(yAxis);
    
   
    
    }
    
  getScaleX() {
    let scaleX = d3.scaleTime()
      
    .domain(d3.extent(this.forecast , (d) => { return new Date( d.time) } ))
    .range([ this.margin , this.width- this.margin ]);

    return scaleX ;

  }

    drawAxisX(svg, scaleX ) {
    
    const xAxis = d3
       .axisBottom(scaleX)
       .tickSizeInner(0)
       .tickSizeOuter(0.5)
      .ticks( this.forecast.length)
      .tickFormat(d3.timeFormat('%HH'));
    const xa =svg.append('g')
      .attr('id', 'x-axis')
     // .style('transform', 'translate(0, ' + (this.height  - 20 )  + 'px)')
      .style('transform', 'translate(0, ' + (this.posy +100)  + 'px)')
    
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
          .data( this.forecast)
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
          .append("text") // enter append
          .classed('fx', true )
          .style("display", (d) => ( d.wind_speed_gust > 0 ) ? 'true' : 'none'  )
          .attr("x", size )   
          .attr("y", size/8  )  
          .text( d=> Math.round( this.getFx( d) )   ) 
          
       
    
          
    
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





    drawPicto( svg , scaleX) {
    
    
            let size = 38 ;
            if ( this.forecast.length  > 12 && this.isMobile ) {
              size = 28 ;
            }

          const layer = svg.append("g").
                   attr("id","reg.picto")
              
      //    this.posy = this.posy + 10 ;


          layer.selectAll("#reg.picto")
          .data( this.forecast)
          .join("g")
          .attr("transform" ,  (d) =>  {  const v = Math.round( scaleX(new Date(d.time))  -size /2 ) ; return 'translate('+ v + ','+ this.posy +')' }  )
          .append("g") 
          .attr("transform" , 'translate(0,0)' )
          .append("circle") 
          .style('fill', 'none')
          .style('stroke', 'gray')
          .style('stroke-width', '1px')
          .attr("cx", size /2  ) 
          .attr("cy", size /2  )  
          .attr("r", size / 2  )

          .select( function() {
              return this.parentNode
          })
          .append("image")
          .attr('xlink:href', (d) => { return `assets/pictos/${d.weather_icon}.svg`  } )
          .attr("x", 0   )  
          .attr("y",  0  )  
          .attr("width", size  )
          .attr("height", size  );
    
    
    }
    
    drawNebul( svg , scaleX) {
    
    
                  
               
                    let size = 19 ;
                    if ( this.forecast.length  > 12 && this.isMobile ) {
                      size = 14 ;
                    }
              
       
                    const layer = svg.append('g')
                      .attr('id', "gnebul")
                      
       
    
                      layer.selectAll("g")
                      .data( this.forecast)
                      .join("g")
                      .attr("transform" ,  (d) =>  {  const v = scaleX(new Date(d.time))  ; return 'translate('+ v + ','+ this.posy +')' }  )
                      .append("g") 
                      .attr("transform" , 'translate(0,0)' )
                  
                      .append("circle") 
                      .attr("class", "nebul_circle")
                      .attr("cx", 0  ) 
                      .attr("cy", 0  )  
                      .attr("r", size  )
                      .select(function(){
                        return this.parentNode;
                       })
                      .selectAll("path")
                      .data((d)  =>  {  let v = d.total_cloud_cover * 0.01 * 2 * Math.PI  ;  return  [ {startAngle: 0, endAngle: v } ]  }  )
                      .join("path")
                      .attr("class", "nebul_arc")
                      .attr("d" ,   this.arcGenerator( size   )    ) 
                    
    
      
    
    }
    
    arcGenerator( size ) {
    
    let arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius( size  )
    .padAngle(.0)
    .padRadius(100)
    .cornerRadius(0);
    
    return arcGenerator ;
    }

   getFx(d ) {

    if( d.wind_gust != 0 ) {
        return d.wind_speed_gust * 3.6
    } else return 0;

   }

   getClassFx( d ) {
    return ( d.wind_speed_gust != 0 )  ;
   }


   

}
