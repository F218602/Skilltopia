import { interval } from "rxjs";
import { PlayerGameDataService } from "./player-game-data.service";

export interface playerDetails{
    socketId: string;
    playerNumber: number;
    score: number;
}

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
    noOfQuestionsAnswered: number;
    coolingTimeCurrent: number;
    coolingTimeMax: number;
    cooldownStart: boolean;
    startCooldownTimer(): void;
    cooldownProgress(): void;
}

export interface Materials {

  fish: number;
  wood: number;
  vegetables: number;
  gold: number;
  food: number;
  stone: number;
  people: number;
  [key: string]: number;

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
  progressStart: boolean;

  updateLevel() : void;
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
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 10;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 10;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:0};

    population: number = 10;
    currentPopulation: number = 10;
    totalPopulation: number = 10;
    peopleInUse: number = 0;
    progressStartAge: boolean = false;
    private subscription: any;
    
    

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.pgd.buildingCount.townCentre += 1;
            this.pgd.materials.people += 50;
        } 
    }
    
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    incrementAgeProgress(){
        
        if(this.progressStartAge && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.pgd.ageID += 1;
            this.pgd.maxLevel = 10 + this.pgd.ageID * 10;
            this.pgd.age = this.pgd.AgeList[this.pgd.ageID];
            this.progressStartAge = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(10) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }

    // town centre
    updatePopulation() {

    }

    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(10) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    updateAge() {
        this.progressStartAge = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementAgeProgress();
        });
    }
}

export class Hospital implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 2;
    name: string = 'Hospital';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 10;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 1;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:10};

    peopleRequired: number = 2;
    baseSafetyScore: number = 100;

    safetyMultiplier: number = 10;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.pgd.buildingCount.hospital += 1; 
            this.pgd.safety += this.baseSafetyScore;
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.pgd.safety += this.safetyMultiplier;
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    // hospital
    updateSafetyScore() {

    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }

    appointDoctor() {
        if(this.pgd.materials.people - this.pgd.peopleInUse >= this.peopleRequired){
            this.pgd.peopleInUse += this.peopleRequired;
            
        }
    }
}

export class University implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 3;
    name: string = 'University';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:15};

    peopleRequired: number = 2;
    baseEducationScore: number = 100;
    educationMultiplier: number = 10;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.pgd.buildingCount.university += 1; 
            this.pgd.education += this.baseEducationScore;
        }    
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.pgd.education += this.educationMultiplier;
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

     // university
     updateEducationalScore(){

     }
     updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Church implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 4;
    name: string = 'Church';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:2};

    peopleRequired: number = 2;
    baseFaithScore: number = 100;
    faithMultiplier: number = 10;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.pgd.buildingCount.church += 1;
            this.pgd.faith += this.baseFaithScore;
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.pgd.faith += this.faithMultiplier;
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    // church
    updateFaithScore() {

    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Market implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 5;
    name: string = 'Market';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:5};

    peopleRequired: number = 2;
    basebusinessScore: number = 100;
    businessMultiplier: number = 10;
    marketRate: number = 100;
    markettingMultiplier: number = 10;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.pgd.buildingCount.market += 1;
            this.pgd.business += this.basebusinessScore;
        } 
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateMarketValue();
            this.pgd.business += this.businessMultiplier;
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

     // market
 
     updateMarketValue() {
        const initialCost = 100;
        const costIncreasePerLevel = 5;
        const updatedBuyingValue = initialCost + (costIncreasePerLevel * (this.level - 1));
        this.marketRate = updatedBuyingValue;
 
     }
     updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }

    buy(material: string) {
        if (this.pgd.materials[material] !== undefined && this.pgd.materials.gold >= 100) {
            this.pgd.materials.gold -= 100;
            this.pgd.materials[material] += this.marketRate;
            
        }
    }
    sell(material: string) {
        if (this.pgd.materials[material] !== undefined && this.pgd.materials[material] >= 100) {
            this.pgd.materials[material] -= 100;
            this.pgd.materials.gold += this.marketRate;
        }
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }  
}

export class Dock implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 6;
    name: string = 'Dock';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:8};

    peopleRequired: number = 2;
    fishingSpeed: number = 10;
    fishingSpeedMultiplier: number = 100;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.subscription = interval(10000)
                .subscribe(() => {
                    this.increaseFish();
                });
            this.pgd.buildingCount.dock += 1; 
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateFishingSpeed();
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // dock
    updateFishingSpeed() {
        const initialSpeed = 10;
        const speedIncreasePerLevel = 1;
        const updatedFishingSpeed = initialSpeed + (speedIncreasePerLevel * (this.level - 1));
        this.fishingSpeed = updatedFishingSpeed;

    }
    increaseFish(){
        this.pgd.materials.fish += this.fishingSpeed;
    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class LumberCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 7;
    name: string = 'Lumber Camp';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:6};

    peopleRequired: number = 2;
    cuttingSpeed: number = 10;
    cuttingSpeedMultiplier: number = 100;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.subscription = interval(10000)
                .subscribe(() => {
                    this.increaseWood();
                });
            this.pgd.buildingCount.lumberCamp += 1; 
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateLumberCampSpeed();
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    // lumber camp
    updateLumberCampSpeed() {
        const initialSpeed = 10;
        const speedIncreasePerLevel = 1;
        const updatedCuttingSpeed = initialSpeed + (speedIncreasePerLevel * (this.level - 1));
        this.cuttingSpeed = updatedCuttingSpeed;

    }
    increaseWood(){
        this.pgd.materials.wood += this.cuttingSpeed;
    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Farm implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 8;
    name: string = 'Farm';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:3};

    peopleRequired: number = 2;
    farmingSpeed: number = 10;
    farmingSpeedMultiplier: number = 100;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.subscription = interval(10000)
                .subscribe(() => {
                    this.increaseVegetable();
                });
            this.pgd.buildingCount.farm += 1; 
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateVegetableGrowth();
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    // farm
    updateVegetableGrowth() {
        const initialGrowthRate = 10;
        const growthRateIncreasePerLevel = 1;
        const updatedGrowthRate = initialGrowthRate + (growthRateIncreasePerLevel * (this.level - 1));
        this.farmingSpeed = updatedGrowthRate;
    
    }
    increaseVegetable(){
        this.pgd.materials.vegetables += this.farmingSpeed;
    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class MiningCamp implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 9;
    name: string = 'Mining Camp';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:7};

    peopleRequired: number = 2;
    goldSpeed: number = 1;
    stoneSpeed: number = 10;
    miningSpeedMultiplier: number = 100;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.subscription = interval(10000)
                .subscribe(() => {
                    this.increaseGold();
                    this.increaseStone();
                });
            this.pgd.buildingCount.miningCamp += 1; 
        }
    }

    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateGoldExtractionSpeed();
            this.updateStoneExtractionSpeed(); 
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    // mine
    updateGoldExtractionSpeed() {
        const initialExtractionSpeed = 1;
        const extractionSpeedIncreasePerLevel = 0.2;
        const updatedExtractionSpeed = initialExtractionSpeed + (extractionSpeedIncreasePerLevel * (this.level - 1));
        this.goldSpeed = Math.floor(updatedExtractionSpeed);

    }
    updateStoneExtractionSpeed() {
        const initialExtractionSpeed = 10;
        const extractionSpeedIncreasePerLevel = 1;
        const updatedExtractionSpeed = initialExtractionSpeed + (extractionSpeedIncreasePerLevel * (this.level - 1));
        this.stoneSpeed = updatedExtractionSpeed;

    }
    increaseGold(){
        this.pgd.materials.gold += this.goldSpeed;
    }
    increaseStone(){
        this.pgd.materials.stone += this.stoneSpeed;
    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Factory implements Building{
    playerId: number = 1;
    x: number = 0;
    y: number = 0;
    image: number = 10;
    name: string = 'Factory';
    type: string = 'Building';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    level: number = 1;
    upgradingTimeCurrent: number = 0;
    upgradingTimeMax: number = 120;
    progressStart: boolean = false;
    requiredMaterials: Materials = {fish:0, wood:200, vegetables:0, gold:100, food:300, stone:100, people:12};

    peopleRequired: number = 2;
    generationSpeed: number = 10;
    generationSpeedMultiplier: number = 100;

    private subscription: any;

    constructor(public pgd: PlayerGameDataService, tileOwner: number) {
        this.playerId = tileOwner;
        if(pgd.playerID==this.playerId){
            this.subscription = interval(10000)
                .subscribe(() => {
                    this.increaseFood();
                });
            this.pgd.buildingCount.factory += 1; 
        }
    }
    incrementLevelProgress(){
        
        if(this.progressStart && this.upgradingTimeCurrent < this.upgradingTimeMax){
            this.upgradingTimeCurrent += 1;
        } else if (this.upgradingTimeCurrent >= this.upgradingTimeMax) {
            this.level += 1;
            this.updateFoodGenerationSpeed();
            this.progressStart = false;
            this.upgradingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }

    //factory
    updateFoodGenerationSpeed() {
        const initialGenerationSpeed = 10;
        const generationSpeedIncreasePerLevel = 1;
        const updatedGenerationSpeed = initialGenerationSpeed + (generationSpeedIncreasePerLevel * (this.level - 1));
        this.generationSpeed = updatedGenerationSpeed;

    }
    increaseFood(){

        if (this.pgd.materials.vegetables >= 5 && this.pgd.materials.vegetables > this.pgd.materials.fish ) {
            this.pgd.materials.vegetables -= (5*this.generationSpeed);
            this.pgd.materials.food += this.generationSpeed;
        }
        else if(this.pgd.materials.fish >= 5){
            this.pgd.materials.fish -= (5*this.generationSpeed);
            this.pgd.materials.food += this.generationSpeed;
        }
    }
    updateLevel() {
        this.progressStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.incrementLevelProgress();
        });
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class GoldRock implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 11;
    name: string = 'Gold Rock';
    type: string = 'Resource';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    goldPercent: number = 20;
    rockPercent: number = 80;
    miningCampConnected: boolean = false;
    private subscription: any;

    constructor(public pgd: PlayerGameDataService) {
        
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Pond implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 12;
    name: string = 'Pond';
    type: string = 'Resource';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    docksConnected: boolean = false;
    private subscription: any;

    constructor(public pgd: PlayerGameDataService) {
        
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Forest implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 13;
    name: string = 'Forest';
    type: string = 'Resource';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;

    lumberCampConnected: boolean = false;
    private subscription: any;

    constructor(public pgd: PlayerGameDataService) {
        
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class Settlement implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 14;
    name: string = 'Settlement';
    type: string = 'Resource';
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;
    private subscription: any;


    constructor(public pgd: PlayerGameDataService) {
        
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}

export class EmptyTile implements Resource{
    x: number = 0;
    y: number = 0;
    image: number = 0;
    name: string = 'Empty Tile';
    type: string = 'Empty';
    private subscription: any;
    noOfQuestionsAnswered= 0;
    coolingTimeCurrent= 0;
    coolingTimeMax= 120;
    cooldownStart= false;



    constructor(public pgd: PlayerGameDataService) {
           
    }
    cooldownProgress(){
        
        if(this.cooldownStart && this.coolingTimeCurrent < this.coolingTimeMax){
            this.coolingTimeCurrent += 1;
        } else if (this.coolingTimeCurrent >= this.coolingTimeMax) {
            // this.level += 1; enable cooling button code
            this.cooldownStart = false;
            this.coolingTimeCurrent = 0;
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
            }
        }
    }
    
    // cooling time for quiz for all buildings
    startCooldownTimer(){
        this.cooldownStart = true;
        this.subscription = interval(1000) // Every second
            .subscribe(() => {
                this.cooldownProgress();
        });
    }
}