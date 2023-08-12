enum Build {
    TownCentre = "Town Centre",
    Hospital = "Hospital",
    University = "University",
    Church ='Church',
    Market ='Market',
    Dock ='Dock',
    LumberCamp = 'Lumber Camp',
    Farm = 'Farm',
    MiningCamp = 'Mining Camp',
    Factory ='Factory'
}

export interface Tile {
    x: number;
    y: number;
    image: number;
    name: string;
    type: string;
}

export interface Materials {

  fish: number;
  wood: number;
  vegetables: number;
  gold: number;
  food: number;
  stone: number;

}

export interface MaterialDetails {
    name: string,
    count: number
}

export interface BuildingTypes {
  townCentre: number,
  hospital: number,
  university: number,
  church: number,
  market: number,
  dock: number,
  lumberCamp: number,
  farm: number,
  miningCamp: number,
  factory: number,

}

export interface BuildingDetails {

    name: string,
    count: number
}

export interface Building extends Tile{

  playerId: number;  
  level: number;
  upgradingTimeCurrent: number;
  upgradingTimeMax: number;
  requiredMaterials: Materials;
}

export interface Resource {

}

export class TownCentre implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 1;
    name: string = 'Town Centre';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    population: number = 10;
    currentPopulation: number = 10;
    totalPopulation: number = 10;
    peopleInUse: number = 0;

    // cooling time for quiz for all buildings
    updateCoolingTime(){

    }

    // town centre
    updatePopulation() {

    }
}

export class Hospital implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 2;
    name: string = 'Hospital';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseSafetyScore: number = 10;
    safetyMultiplier: number = 100;

    // hospital
    updateSafetyScore() {

    }
    
}

export class University implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 3;
    name: string = 'University';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseEducationScore: number = 10;
    educationMultiplier: number = 100;

     // university
     updateEducationalScore(){

     }
    
}

export class Church implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 4;
    name: string = 'Church';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseFaithScore: number = 10;
    faithMultiplier: number = 100;
    // church
    updateFaithScore() {

    }
}

export class Market implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 5;
    name: string = 'Market';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    basebusinessScore: number = 10;
    businessMultiplier: number = 100;
    marketPurchaseRate: number = 100;
    marketSellingRate: number = 100;
    markettingMultiplier: number = 1;

     // market
     updateSellingValue() {

     }
 
     updateBuyingValue() {
 
     }
    
}

export class Dock implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 6;
    name: string = 'Dock';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    fishingSpeed: number = 10;
    fishingSpeedMultiplier: number = 100;
    
    // dock
    updateFishingSpeed() {

    }
}

export class LumberCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 7;
    name: string = 'Lumber Camp';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    cuttingSpeed: number = 10;
    cuttingSpeedMultiplier: number = 100;
    // lumber camp
    updateLumberCampSpeed() {

    }
}

export class Farm implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 8;
    name: string = 'Farm';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    farmingSpeed: number = 10;
    farmingSpeedMultiplier: number = 100;
    // farm
    updateVegetableGrowth() {

    }
    
}

export class MiningCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 9;
    name: string = 'Mining Camp';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    miningSpeed: number = 10;
    miningSpeedMultiplier: number = 100;
    // mine
    updateGoldExtractionSpeed() {

    }
    updateStoneExtractionSpeed() {

    }
}

export class Factory implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 10;
    name: string = 'Factory';
    type: string = 'Building';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    generationSpeed: number = 10;
    generationSpeedMultiplier: number = 100;
    //factory
    updateFoodGenerationSpeed() {

    }    
}

export class GoldRock implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Gold Rock';
    type: string = 'Resource';

    goldPercent: number = 20;
    rockPercent: number = 80;
    miningCampConnected: boolean = false;
}

export class Pond implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 12;
    name: string = 'Pond';
    type: string = 'Resource';

    docksConnected: boolean = false;
}

export class Forest implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 13;
    name: string = 'Forest';
    type: string = 'Resource';

    lumberCampConnected: boolean = false;
}

export class Settlement implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 14;
    name: string = 'Settlement';
    type: string = 'Resource';
}

export class EmptyTile implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 0;
    name: string = 'Empty Tile';
    type: string = 'Empty';
}