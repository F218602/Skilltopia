import { Injectable } from '@angular/core';
import { CellInfo } from './cell-info.interface';
import { Hospital, Tile, TownCentre, University } from './game-object.interface';

@Injectable({
  providedIn: 'root'
})
export class CellInteractionService {
  public cellData: CellInfo | undefined;
  public selected: Tile = new Hospital;
  public selX: number = 0;
  public selY: number = 0;
  public tileId: number = 0;
  public selectedBuilding: string | null = null;
  
  constructor() { }

  showResources(building: string): void {
    this.selectedBuilding = building;
  }

}