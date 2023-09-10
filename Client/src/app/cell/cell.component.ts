import { Component, Input, SimpleChanges } from '@angular/core';
import { objectImageMap } from '../object-image-map';
import { CellInteractionService } from '../cell-interaction.service';
import { CellInfo } from '../cell-info.interface';
import { PlayerGameDataService } from '../player-game-data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() value: number = 0 ;
  @Input() row: number = 0 ;
  @Input() column: number = 0 ;
  
  cellInfo!: CellInfo;

  constructor(public cellInterSer: CellInteractionService, public pgd: PlayerGameDataService) {}

  changeBorder: boolean = false;
  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      // console.log(`Value changed to: ${changes['value'].currentValue}`);
      // Perform any necessary actions when value changes
    }
  }
  
  getImageUrl(number: number) {
    return objectImageMap[number] || null; // Use a default image if mapping not found
    // return objectImageMap[this.pgd.map[this.row][ this.column].image] || null;
  }

  sendData() {
    this.cellInterSer.selected = this.pgd.map[this.row][this.column];
    this.cellInterSer.selX = this.row;
    this.cellInterSer.selY = this.column;
    this.cellInterSer.tileId = this.value;  
    this.cellInterSer.selectedBuilding = null;
    // this.cellInterSer.playerID = Math.floor(this.value / 1000);
  }
}
