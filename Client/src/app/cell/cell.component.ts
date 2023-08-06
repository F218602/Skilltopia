import { Component, Input } from '@angular/core';
import { objectImageMap } from '../object-image-map';
import { CellInteractionService } from '../cell-interaction.service';
import { CellInfo } from '../cell-info.interface';

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

  constructor(public cellInterSer: CellInteractionService) {}

  ngOnInit(): void {
    if(this.value==11) {
      this.cellInfo = {
        row: 1,
        col: 1,
        image: 11,
        tile: {
          name: 'Forest Waste Gold Mine',
          type: 'GoldMine',
          buildingsConnected: 0,
        }
      }  
    }
  }
  
  getImageUrl(number: number) {
    return objectImageMap[number] || null; // Use a default image if mapping not found
  }

  sendData() {
    if(this.value==11){
      this.cellInterSer.cellData = this.cellInfo;  
      console.log("Waste");
    }
  }
}

