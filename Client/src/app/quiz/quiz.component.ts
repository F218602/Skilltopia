import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPopupComponent } from '../question-popup/question-popup.component';
import { SocketIOService } from '../socket-io.service';
import { Quiz } from '../quizQuestion.interface';
import { PlayerGameDataService } from '../player-game-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
})
export class QuizComponent {

  selectedModule: Quiz = {
    moduleID: 999,
    moduleName: 'Loading...',
    questionCount: 0,
    questions: []
  };

  selectedDifficulty: string = 'Default';
  selectedBuilding: string = 'House';
  selectedLevel: number = 2000;
  
  constructor(private dialogRef: MatDialogRef<QuizComponent>, private dialog: MatDialog, public socketIOService: SocketIOService, public pgd: PlayerGameDataService) {}


  ngOnInit() {
    this.selectedDifficulty = this.pgd.difficulty;
    this.selectedBuilding = this.pgd.quizBuilding;
    this.selectedLevel = this.pgd.quizLevel;

    this.socketIOService.getQuiz(this.selectedDifficulty, this.selectedBuilding, this.selectedLevel);

    this.socketIOService.returnQuiz().subscribe(([sM]) => {
      console.log(`Quiz Data: ${sM}`);
      this.selectedModule = sM;
      this.pgd.selectedQuiz = sM;
    });
  }
  
   

  closeDialog() {
    // Close the dialog when the "Close" button is clicked
    this.dialogRef.close();
  }

  openProceedPopup() {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      width: '1200px', // Adjust the width as per your requirement
      height: '600px', // Adjust the height as per your requirement
      disableClose: true, // To prevent closing the popup by clicking outside
    });
    this.dialogRef.close();
  }
}
