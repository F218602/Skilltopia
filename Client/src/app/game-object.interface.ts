export interface Tile {
    x: number;
    y: number;
    image: number;
    name: string;
}

export interface Materials {

  fish: number;
  wood: number;
  vegetables: number;
  gold: number;
  food: number;
  stone: number;

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

export class TownCenter implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Town Centre';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    population: number = 10;
    currentPopulation: number = 10;
    maximumPopulation: number = 10;
    peopleInUse: number = 0;

    // cooling time for quiz for all buildings
    updateCoolingTime(){

    }

    // town centre
    updatePopulation() {


    }
    
    // hospital
    updateSafetyScore() {

    }
    // university
    updateEducationalScore(){

    }
    // church
    updateFaithScore() {

    }
    // market
    updateSellingValue() {

    }

    updateBuyingValue() {

    }

    // dock
    updateFishingSpeed() {

    }

    // lumber camp
    updateLumberCampSpeed() {

    }
    // farm
    updateVegetableGrowth() {

    }

    // mine
    updateGoldExtractionSpeed() {

    }

    updateStoneExtractionSpeed() {

    }

    //factory
    updateFoodGenerationSpeed() {

    }

}

export class Hospital implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Hospital';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseSafetyScore: number = 10;
    safetyMultiplier: number = 100;
    
}

export class University implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'University';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseEducationScore: number = 10;
    educationMultiplier: number = 100;
    
}

export class Church implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Church';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    baseFaithScore: number = 10;
    faithMultiplier: number = 100;
    
}

export class Market implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Market';
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
    
}

export class Dock implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Dock';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    fishingSpeed: number = 10;
    fishingSpeedMultiplier: number = 100;
    
}

export class LumberCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'LumberCamp';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    cuttingSpeed: number = 10;
    cuttingSpeedMultiplier: number = 100;
    
}

export class Farm implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Farm';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    // vegetable: number =10;
    farmingSpeed: number = 10;
    farmingSpeedMultiplier: number = 100;
    
    
}

export class MiningCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'MiningCamp';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    miningSpeed: number = 10;
    miningSpeedMultiplier: number = 100;
    
}

export class Factory implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Factory';
    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100};

    peopleRequired: number = 2;
    generationSpeed: number = 10;
    generationSpeedMultiplier: number = 100;
        
}

export class GoldRock implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'GoldRock';

    goldPercent: number = 20;
    rockPercent: number = 80;
    miningCampConnected: boolean = false;
    
}

export class Pond implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Pond';

    docksConnected: boolean = false;
}

export class Forest implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Forest';

    lumberCampConnected: boolean = false;
}

export class Settlement implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Settlement';
}