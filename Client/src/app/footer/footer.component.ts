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
import { Building } from '../game-object.interface';

class X {
  x1: string= '1';
  x2: string= '1';
}

class Y {
  y1: string= '1';
  y2: string= '1';
}

class Z {
  z1: string = '1';
  z2: string ='1';
}

// Create a custom union type
type CustomUnionType = X | Y | Z;



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
a: CustomUnionType = new Z; // Variable a can hold instances of X, Y, or Z
selectedCell: CellInfo = {
  row: 1,
  col: 1,
  image: 11,
  tile: {
    name: 'Forest Gold Mine',
    type: 'GoldMine',
    buildingsConnected: 0,
  },
  
};

constructor(private dialog: MatDialog, public cellInterSer: CellInteractionService, public pgd: PlayerGameDataService) {}

ngOnInit(): void {
  // Calculate the increment value for each step
  const incrementValue = 100 / this.steps;

  // Use interval to update the progress value over time
  const updateInterval = interval(this.intervalDuration / this.steps);
  (this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY] as TownCentre).level
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

  //Town centre

  //Hospital
  getHospitalPeopleRequired() {return (this.cellInterSer.selected as Hospital).peopleRequired;}

  //university
  getUniversityPeopleRequired() {return (this.cellInterSer.selected as University).peopleRequired;}

  //church

  getChurchPeopleRequired() {return (this.cellInterSer.selected as Church).peopleRequired;}

  //market

  getMarketPeopleRequired() {return (this.cellInterSer.selected as Market).peopleRequired;}

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
