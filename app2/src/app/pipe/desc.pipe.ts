import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'desc'
})
export class DescPipe implements PipeTransform {

dpictos =  [
    {
        picto: 'P00',
        desc: 'Soleil'
    },
    {
        picto: 'P01',
        desc: 'Belles éclaircies'
    },
    {
        picto: 'P02',
        desc: 'Quelques éclaircies'
    },
    {
        picto: 'P03',
        desc: 'Couvert'
    },
    {
        picto: 'P04',
        desc: 'Variable'
    },
    {
        picto: 'P05',
        desc: 'Soleil voilé'
    },
    {
        picto: 'P08',
        desc: 'Brume ou léger brouillard'
    },
    {
        picto: 'P09',
        desc: 'Brume ou léger brouillard'
    },
    {
        picto: 'P15',
        desc: 'Brume ou léger brouillard givrant'
    },
    {
        picto: 'P20',
        desc: 'Bruine'
    },
    {
        picto: 'P22',
        desc: 'Pluie verglaçante'
    },
    {
        picto: 'P23',
        desc: 'Pluies éparses'
    },
    {
        picto: 'P25',
        desc: 'Pluies éparses'
    },
    {
        picto: 'P26',
        desc: 'Pluie'
    },
    {
        picto: 'P27',
        desc: 'Pluie'
    },
    {
        picto: 'P28',
        desc: 'Pluie forte'
    },
    {
        picto: 'P29',
        desc: 'Pluies localement orageuses'
    },
    {
        picto: 'P30',
        desc: 'Pluies localement orageuses'
    },
    {
        picto: 'P31',
        desc: 'Quelques flocons'
    },
    {
        picto: 'P33',
        desc: 'Quelques flocons'
    },
    {
        picto: 'P35',
        desc: 'Pluie et neige mêlées'
    },
    {
        picto: 'P38',
        desc: 'Neige collante'
    },
    {
        picto: 'P39',
        desc: 'Neige collante'
    },
    {
        picto: 'P40',
        desc: 'Neige forte'
    },
    {
        picto: 'P50',
        desc: 'Averses avec risque de grêle'
    },
    {
        picto: 'P51',
        desc: 'Averses avec risque de grêle'
    },
    {
        picto: 'P54',
        desc: 'Risque d\'orages'
    },
    {
        picto: 'P55',
        desc: 'Risque d\'orages'
    },
    {
        picto: 'P58',
        desc: 'Risque d\'orages violents'
    },
    {
        picto: 'P59',
        desc: 'Risque d\'orages violents'
    },
    {
        picto: 'P62',
        desc: 'Risque d\'orage avec grêle'
    },
    {
        picto: 'P63',
        desc: 'Risque d\'orage avec grêle'
    },
    {
        picto: '999',
        desc: 'Phénomène glissant'
    }
] ;


transform(value: string ): string {
    const obj = this.dpictos.find((item) => item.picto === value ) ;
    return ( obj === undefined ) ? '-' : obj.desc ;

  }

}
