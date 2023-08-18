import { Injectable } from '@angular/core';
import { CellInfo } from './cell-info.interface';
import { EmptyTile, Tile} from './game-object.interface';
import { PlayerGameDataService } from './player-game-data.service';

@Injectable({
  providedIn: 'root'
})
export class CellInteractionService {
  public cellData: CellInfo | undefined;
  public selected: Tile = new EmptyTile(this.pgd);
  public selX: number = 0;
  public selY: number = 0;
  public tileId: number = 0;
  public selectedBuilding: string | null = null;
  // public playerID: number = 0;
  
  constructor(public pgd: PlayerGameDataService) { }

  showResources(building: string): void {
    this.selectedBuilding = building;
  }

}