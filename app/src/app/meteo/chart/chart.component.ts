import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Forecast } from 'src/app/models/MForecast';
import * as d3 from 'd3';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  @Input() forecast:Array<Forecast> ;
  @ViewChild('chart', { static: true}) 
  private myChart?: ElementRef;
  
  // https://github.com/DavidBanksNZ/DailyWeatherGraph/blob/master/daily-weather-graph.js


  // https://medium.com/weekly-webtips/build-a-simple-line-chart-with-d3-js-in-angular-ccd06e328bff


  conf = {

    margin : 10 ,

    windSize: 50,
    windCircleRadius: 12
  }


  constructor() { }

  ngOnInit(): void {

    let width = this.myChart.nativeElement.clientWidth;
    let height = this.myChart.nativeElement.clientHeight;

    const svg = d3.select(this.myChart?.nativeElement);
    svg.attr("viewBox", [0, 0, width, height]);
    svg.attr('height', height);
    svg.attr('width', width);
    svg.attr("preserveAspectRatio", "xMidYMid meet" );

    svg.style("background-color","orange");
   
    const yScale = d3.scaleLinear()
  	.domain([ d3.max( this.forecast , d => d.T ) +1  , d3.min( this.forecast ,  d => d.T ) -1   ] )
  	.range([ 40 , height -40 ])
  	.nice();

    const xScale = d3.scaleTime()
  	.domain( d3.extent( this.forecast.map( (d) =>  new Date(d.time) ) ) )
  	.range([ 40 , width - 40  ])
  	.nice();

  const xAxis = d3
    .axisBottom(xScale)
   // .ticks(10)
    .tickFormat(d3.timeFormat('%HH'));
  

  const xa =svg.append('g')
  .attr('id', 'x-axis')
  .style('transform', 'translate(0, ' + (height -40 )  + 'px)')
  
  

  const yAxis = d3
    .axisRight(yScale)
    .ticks(4)
  const ya = svg.append('g')
    .attr('id', 'y-axis')
    .style('transform', 'translate(' + 40 + 'px,  0)');

  ya.call(yAxis);

  xa.call(xAxis);

  
  const line = d3
  .line()
  .x(d => d[0])
  .y(d => d[1])
  .curve(d3.curveBasis );



  const points: [number, number][] = this.forecast.map(d => [
    xScale(new Date(d.time)),
    yScale(d.T),
  ]);

  let lineGroup = svg
  .append('g')
  .append('path')
  .attr('id', 'line')
  .style('fill', 'none')
  .style('stroke', 'red')
  .style('stroke-width', '2px')
  .attr('d', line(points));

    let trans = 20 ;
    this.forecast.forEach( e => {
    
      this.createWindDef( svg , trans );

      trans = trans + 120 ;
    });

    



   
   
   
  

  }



  createWindDef(svg , trans ){
    const windSymbol = svg.append('g')
    .attr('id', 'daily-weather-graph-wind-icon');

    // Use circle shape
    windSymbol.append('circle')
        .attr('cx', this.conf.windSize / 2)
        .attr('cy', this.conf.windSize / 2)
        .attr('stroke-width', '1.3px')
        .attr('r', this.conf.windCircleRadius)
        .style('fill', '#808080' )
      .style('stroke', '1px')
        .style('transform', 'translate(' + trans + 'px,  0)');
    const indicator_y0 = this.conf.windSize / 2 - this.conf.windCircleRadius + 4,
        indicator_length = 8,
        indicator_y1 = indicator_y0 - indicator_length,
        indicator_x0 = this.conf.windSize / 2 - indicator_length / 2,
        indicator_x1 = this.conf.windSize / 2 + indicator_length / 2;

    svg.append('g')
        .attr('id', 'daily-weather-graph-wind-indicator')
        .append('path')
        .attr('d', 'M' + indicator_x0 + ',' + indicator_y1 +
            ' L' + indicator_x1 + ',' + indicator_y1 +
            ' L' + this.conf.windSize / 2 + ',' + indicator_y0 +
            ' L' + indicator_x0 + ',' + indicator_y1)

       //.style('transform', 'translate(0, ' + (height -40 )  + 'px)')
       .style('transform', 'translate(' + trans + 'px,  0)');
  }





    doChart() {

     // let fday = moment( day ).format('yyyy-MM-DD');

    }


}
