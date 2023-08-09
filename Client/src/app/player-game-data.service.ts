import { Injectable } from '@angular/core';
import { CellInfo } from './cell-info.interface';
import { Materials, Tile, TownCenter } from './game-object.interface';


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
  'fish': 0,
  'wood': 0,
  'vegetables' : 0,
  'gold' : 0,
  'food' : 0,
  'stone' : 0
  }

    // building counter
    // building counter


  constructor() { 

    // Initialize the array with default values (e.g., -1)
    for (let i = 0; i < this.numRows; i++) {
        const row: number[] = Array(this.numCols).fill(33);
        this.mapTileId.push(row);
    }
  }

  initMap(): void {
    for(let i = 0; i < this.numRows; i++) {
      for(let j=0; j< this.numCols; j++){
        switch (this.mapTileId[i][j]) {
          case 1:
            this.map[i][j] = new TownCenter();
            break;
          // Add cases for other classes here
          default:
        }
      } 
    }
  } 
}
