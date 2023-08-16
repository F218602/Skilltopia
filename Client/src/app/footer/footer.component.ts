import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizComponent } from '../quiz/quiz.component';
import { interval } from 'rxjs';
import { CellInfo } from '../cell-info.interface';
import { objectImageMap } from '../object-image-map'; // Adjust the import path based on the actual location of the file
import { CellInteractionService } from '../cell-interaction.service';
import { PlayerGameDataService } from '../player-game-data.service';
import { Church, Dock, Factory, Farm, Hospital, LumberCamp, Market, MiningCamp, TownCentre, University } from '../game-object.interface';
import { Building, Materials } from '../game-object.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit{
Level: number = 1;
Age: string = 'Stone';
CurrentPopulation: number = 20;
TotalPopulation: number = 100;
PeopleInUse: number = 50;
showBuilding: boolean = true;

constructor(private dialog: MatDialog, public cellInterSer: CellInteractionService, public pgd: PlayerGameDataService) {}

ngOnInit(): void {
  // Calculate the increment value for each step
  const incrementValue = 100 / this.steps;

  // Use interval to update the progress value over time
  const updateInterval = interval(this.intervalDuration / this.steps);
  // (this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY] as TownCentre).level
  // Subscribe to the interval and update the progress value
  updateInterval.subscribe(() => {
    if (this.progress < 100) {
      this.progress += incrementValue;
    }
  });
}

  progress: number = 0;
  intervalDuration: number = 60000; // 1 minute in milliseconds
  steps: number = 100; // Number of steps to reach 100% progress

  openPopup() {
    // Open the popup when the button is clicked
    this.dialog.open(QuizComponent);
  }
  
  getImagePath(typeNumber: number) {
    return objectImageMap[typeNumber] || null;
  }

  //Buildings
  getLevel() { return (this.cellInterSer.selected as Building).level;}
  getProgress() { return (this.cellInterSer.selected as Building).upgradingTimeCurrent;}
  updateLevel() {(this.cellInterSer.selected as Building).updateLevel();}
  
  checkResources(buildingName: string): boolean {
    
    for (const resource in this.pgd.getRequiredMaterials[buildingName]) {
      if (this.pgd.getRequiredMaterials[buildingName][resource] > this.pgd.materials[resource]) {
        return false; // Disable the button if any resource is insufficient
      }
    }

    return true; // Enable the button if all resources are sufficient
  }

  buildBuilding(buildingName: string): void {
      if (this.checkResources(buildingName)) {
        // Subtract required resources from available resources
        const requiredMaterials = this.pgd.getRequiredMaterials[buildingName];
        for (const resource in requiredMaterials) {
          this.pgd.materials[resource] -= requiredMaterials[resource];
        }
        this.pgd.createTile(this.cellInterSer.selX, this.cellInterSer.selY, this.pgd.getBuildingId[buildingName]);
      }
  }
  //Town centre
  
  //Hospital
  getHospitalPeopleRequired() {return (this.cellInterSer.selected as Hospital).peopleRequired;}

  //university
  getUniversityPeopleRequired() {return (this.cellInterSer.selected as University).peopleRequired;}

  //church

  getChurchPeopleRequired() {return (this.cellInterSer.selected as Church).peopleRequired;}

  //market

  getMarketPeopleRequired() {return (this.cellInterSer.selected as Market).peopleRequired;}

  buy(materials: string) {(this.cellInterSer.selected as Market).buy(materials);}
  sell(materials: string) {(this.cellInterSer.selected as Market).sell(materials);}

  //dock

  getDockPeopleRequired() {return (this.cellInterSer.selected as Dock).peopleRequired;}

  //lumbercamp
  getLumberCampPeopleRequired() {return (this.cellInterSer.selected as LumberCamp).peopleRequired;}
  
  //farm
  getFarmPeopleRequired() {return (this.cellInterSer.selected as Farm).peopleRequired;}

  //miningcamp
  getMiningCampPeopleRequired() {return (this.cellInterSer.selected as MiningCamp).peopleRequired;}

  //factory
  getFactoryPeopleRequired() {return (this.cellInterSer.selected as Factory).peopleRequired;}

  //goldrock

  //pond

  //forest

  //settlement
}
