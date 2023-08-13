import { Pipe, PipeTransform } from '@angular/core';
import { Building, Tile } from './game-object.interface';

@Pipe({
  name: 'displayProgress'
})
export class DisplayProgressPipe implements PipeTransform {

  transform(building: Tile): number {
    if (building) {
      return (building as Building).upgradingTimeCurrent;
    }
    return 5;
  }

}
