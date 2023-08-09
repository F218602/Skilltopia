import { Injectable } from '@angular/core';
import { CellInfo } from './cell-info.interface';
import { Tile, Materials, BuildingTypes, TownCenter, Hospital, University, LumberCamp, Church, Dock, Market, MiningCamp, Factory, GoldRock, Pond, Forest, Settlement, Farm } from './game-object.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerGameDataService {
   
  mapTileId: number[][] = [];
  map: Tile[][] = [];
  numRows: number = 20;
  numCols: number = 50;
  
  playerName: string = 'player1';
  playerID: number = 1;
  score: number = 0;
  ageID: number = 1;
  age: string = 'Stone'
  level: number = 1;
  population: number = 15;
  safety: number = 0;
  education: number = 0;
  faith: number = 0;
  business: number = 0;

  materials: Materials = {
    fish: 0,
    wood: 0,
    vegetables: 0,
    gold: 0,
    food: 0,
    stone: 0
  }

  // building counter
  buildingCount: BuildingTypes = {
    townCentre: 1,
    hospital: 0,
    university: 0,
    church: 0,
    market: 0,
    dock: 0,
    lumberCamp: 0,
    farm: 0,
    miningCamp: 0,
    factory: 0
  }

  constructor() { 

    // Initialize the array with default values (e.g., -1)
    for (let i = 0; i < this.numRows; i++) {
        const row: number[] = Array(this.numCols).fill(33);
        this.mapTileId.push(row);
    }
  }
  // Initialize building and resource data
  initMap(): void {
    for(let i = 0; i < this.numRows; i++) {
      for(let j=0; j< this.numCols; j++){
        switch (this.mapTileId[i][j]) {
          case 1:
            this.map[i][j] = new TownCenter();
            break;
          case 2:
            this.map[i][j] = new Hospital();
            break;
          case 3:
            this.map[i][j] = new University();
            break;
          case 4:
            this.map[i][j] = new Church();
            break;
          case 5:
            this.map[i][j] = new Market();
            break;
          case 6:
            this.map[i][j] = new Dock();
            break;
          case 7:
            this.map[i][j] = new LumberCamp();
            break;
          case 8:
            this.map[i][j] = new Farm();
            break;
          case 9:
            this.map[i][j] = new MiningCamp();
            break;
          case 10:
            this.map[i][j] = new Factory();
            break;
          case 11:
            this.map[i][j] = new GoldRock();
            break;
          case 12:
            this.map[i][j] = new Pond();
            break;
          case 13:
            this.map[i][j] = new Forest();
            break;
          case 14:
            this.map[i][j] = new Settlement();
            break;  
            
          // Add cases for other classes here
          default:
        }
      } 
    }
  } 
}
