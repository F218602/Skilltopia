import { Component, Input } from '@angular/core';
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

  ngOnInit(): void {
    
  }
  
  getImageUrl(number: number) {
    return objectImageMap[number] || null; // Use a default image if mapping not found
  }

  sendData() {
    this.cellInterSer.selected = this.pgd.map[this.row][this.column];
    this.cellInterSer.selX = this.row;
    this.cellInterSer.selY = this.column;  
  }
}
