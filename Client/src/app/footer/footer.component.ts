import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizComponent } from '../quiz/quiz.component';
import { interval } from 'rxjs';
import { CellInfo } from '../cell-info.interface';
import { objectImageMap } from '../object-image-map';
import { CellInteractionService } from '../cell-interaction.service';
import { PlayerGameDataService } from '../player-game-data.service';
import { Church, Dock, Factory, Farm, Hospital, LumberCamp, Market, MiningCamp, TownCentre, University } from '../game-object.interface';
import { Building, Materials } from '../game-object.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketIOService } from '../socket-io.service';

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

constructor(private dialog: MatDialog, public cellInterSer: CellInteractionService, public pgd: PlayerGameDataService, public socketIOService: SocketIOService) {}

capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

ngOnInit(): void {
  // Calculate the increment value for each step
  const incrementValue = 100 / this.steps;

  // Use interval to update the progress value over time
  const updateInterval = interval(this.intervalDuration / this.steps);
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
  getOwnerID() {return (this.cellInterSer.selected as Building).playerId;}
  getLevel() {return (this.cellInterSer.selected as Building).level;}
  getProgress() {return (this.cellInterSer.selected as Building).upgradingTimeCurrent;}
  updateLevel() {(this.cellInterSer.selected as Building).updateLevel();}
  progressStart() {return (this.cellInterSer.selected as Building).progressStart;}
  maxLevelCheck() {return (this.cellInterSer.selected as Building).level >= this.pgd.maxLevel;}
  checkResources(buildingName: string): boolean {
    
    for (const resource in this.pgd.getRequiredMaterials[buildingName]) {
      if (this.pgd.getRequiredMaterials[buildingName][resource] > this.pgd.materials[resource]) {
        return false; // Disable the button if any resource is insufficient
      }
    }

    return true; // Enable the button if all resources are sufficient
  }

  checkSpecialLocation(buildingName: string): boolean {
    let locationId: number  = 0;
    if (buildingName !== 'Mining Camp' && buildingName !== 'Dock' && buildingName !== 'Lumber Camp') {
      return true;
    }
    switch (buildingName) {
      case 'Mining Camp':
        locationId = 11;
        break;
      case 'Dock':
        locationId = 12;
        break;  
      case 'Lumber Camp':
        locationId = 13;
        break;
    }
    console.log(locationId);
    return ((this.pgd.numRows > this.cellInterSer.selX+1 &&  this.pgd.map[this.cellInterSer.selX+1][this.cellInterSer.selY].image == locationId)||
    (0 <= this.cellInterSer.selX-1 && this.pgd.map[this.cellInterSer.selX-1][this.cellInterSer.selY].image == locationId)||
    (this.pgd.numCols > this.cellInterSer.selY+1 && this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY+1].image == locationId)||
    (0 <= this.cellInterSer.selY-1 && this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY-1].image == locationId));    
    // return true; 
  }

  buildBuilding(buildingName: string): void {
      if (this.checkResources(buildingName)) {
        // Subtract required resources from available resources
        const requiredMaterials = this.pgd.getRequiredMaterials[buildingName];
        for (const resource in requiredMaterials) {
          this.pgd.materials[resource] -= requiredMaterials[resource];
        }
        this.socketIOService.syncBuildingSend(this.socketIOService.roomName, this.cellInterSer.selX, this.cellInterSer.selY, this.pgd.getBuildingId[buildingName], this.pgd.playerID);
        this.pgd.createTile(this.cellInterSer.selX, this.cellInterSer.selY, this.pgd.getBuildingId[buildingName], this.pgd.playerID);
      }
  }
  //Town centre
  getAgeProgress() {return (this.cellInterSer.selected as TownCentre).upgradingTimeCurrent;}
  updateAge() {(this.cellInterSer.selected as TownCentre).updateAge();}
  
  //Hospital
  getHospitalPeopleRequired() {return (this.cellInterSer.selected as Hospital).peopleRequired;}

  appointDoctor() {(this.cellInterSer.selected as Hospital).appointDoctor();}

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
