import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizComponent } from '../quiz/quiz.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit{
Level: number = 1;
Age: string = 'Stone 1';
CurrentPopulation: number = 20;
MaximumPopulation: number = 100;
PeopleInUse: number = 50;
showBuilding: boolean = true;

constructor(private dialog: MatDialog) {}
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
}
