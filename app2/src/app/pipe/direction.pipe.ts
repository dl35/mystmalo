import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direction'
})
export class DirectionPipe implements PipeTransform {

  dirGb =  ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N' ];
  dir =  ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'W', 'ONO', 'NO', 'NNO', 'N' ];

  transform(value: string ): string {
    // tslint:disable-next-line: radix
    const v =  parseInt(value) ;
    if (Number.isNaN(v)) {
      return '-';
    }


    let index = v % 360 ;
    index = Math.round( index / 22.5 ) + 1;
    const direction = this.dir[ index ];
    return direction ;
  }

}
