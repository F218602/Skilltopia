import {Injectable } from '@angular/core';
import { Tile, Materials, BuildingTypes, TownCentre, Hospital, University, LumberCamp, Church, Dock, Market, MiningCamp, Factory, GoldRock, Pond, Forest, Settlement, Farm, EmptyTile, BuildingDetails, MaterialDetails } from './game-object.interface';

@Injectable({
  providedIn: 'root'
})

export class PlayerGameDataService {
   
  mapTileId: number[][] = [];
  map: Tile[][] = [];
  numRows: number = 20;
  numCols: number = 50;
  
  playerName: string = 'Player 1';
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

  materialDetails: MaterialDetails[] = [{name:'Fish', count: this.materials.fish},
                                        {name:'Wood', count: this.materials.wood}, 
                                        {name:'Vegetables', count: this.materials.vegetables},
                                        {name:'Gold', count: this.materials.gold},
                                        {name:'Food', count: this.materials.food},
                                        {name:'Stone', count: this.materials.stone},
                                      ]

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

  getBuildingId: Record<string, number> = {
    "Empty": 0,
    "Town Centre": 1,
    "Hospital": 2,
    "University": 3,
    "Church": 4,
    "Market": 5,
    "Dock": 6,
    "Lumber Camp": 7,
    "Farm": 8,
    "Mining Camp": 9,
    "Factory": 10,
    "Gold Rock": 11,
    "Pond": 12,
    "Forest": 13,
    "Settlement": 14
  };


  buildingList: string[] = [
    "Town Centre",
    "Hospital",
    "University",
    "Church",
    "Market",
    "Dock",
    "Lumber Camp",
    "Farm",
    "Mining Camp",
    "Factory"
];

  buildingDetails: BuildingDetails[] = [{name:'Town Centre', count: this.buildingCount.townCentre}, 
                                                        {name:'Hospital', count: this.buildingCount.hospital}, 
                                                        {name:'University',count:  this.buildingCount.university}, 
                                                        {name:'Church',count:  this.buildingCount.church}, 
                                                        {name:'Market',count:  this.buildingCount.market},
                                                        {name:'Dock',count:  this.buildingCount.dock}, 
                                                        {name:'Lumber Camp',count:  this.buildingCount.lumberCamp},
                                                        {name:'Farm', count:  this.buildingCount.farm},
                                                        {name:'Mining Camp', count:  this.buildingCount.miningCamp},
                                                        {name:'Factory', count:  this.buildingCount.factory}]


  getRequiredMaterials: Record<string, Materials> = {
    "Town Centre": { fish: 0, wood: 200, vegetables: 0, gold: 100, food: 300, stone: 100 },
    "Hospital": { fish: 0, wood: 500, vegetables: 0, gold: 300, food: 200, stone: 300 },
    "University": { fish: 0, wood: 800, vegetables: 0, gold: 600, food: 400, stone: 500 },
    "Church": { fish: 0, wood: 150, vegetables: 0, gold: 100, food: 50, stone: 100 },
    "Market": { fish: 0, wood: 300, vegetables: 0, gold: 200, food: 100, stone: 200 },
    "Dock": { fish: 100, wood: 100, vegetables: 0, gold: 150, food: 50, stone: 50 },
    "Lumber Camp": { fish: 0, wood: 300, vegetables: 0, gold: 100, food: 100, stone: 200 },
    "Farm": { fish: 0, wood: 50, vegetables: 0, gold: 25, food: 0, stone: 25 },
    "Mining Camp": { fish: 0, wood: 100, vegetables: 0, gold: 75, food: 0, stone: 200 },
    "Factory": { fish: 0, wood: 500, vegetables: 0, gold: 300, food: 200, stone: 300 },
  };

  constructor() { 

    // Initialize the array with default values (e.g., -1)
    for (let i = 0; i < this.numRows; i++) {
        const row: number[] = Array(this.numCols).fill(33);
        this.mapTileId.push(row);
    }

    for (let i = 0; i < this.numRows; i++) {
      this.map[i] = new Array(this.numCols);
  }
  
  // Fill the map with Tile instances
  for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
          this.map[row][col] = new EmptyTile(); // Initialize each tile as needed
      }
  }
  }
  createTile(i:number, j:number, tileId:number){
    console.log(i,j);
    switch (tileId) {
      case 0:
        this.map[i][j] = new EmptyTile();
        break;
      case 1:
        this.map[i][j] = new TownCentre();
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
    console.log(this.map[i][j].image)
  }
  // Initialize building and resource data
  initMap(): void {
    for(let i = 0; i < this.numRows; i++) {
      for(let j=0; j< this.numCols; j++){
        this.createTile(i,j,this.mapTileId[i][j])
      } 
    }
  } 
}
