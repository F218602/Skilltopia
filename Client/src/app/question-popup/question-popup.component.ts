import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SocketIOService } from '../socket-io.service';
import { QuizQuestion } from '../quizQuestion.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CellInteractionService } from '../cell-interaction.service';
import { PlayerGameDataService } from '../player-game-data.service';
import { Building, TownCentre } from '../game-object.interface';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent implements OnInit {

  selectedOption!: number;
  selectedQuestion: QuizQuestion = {
    questionNo: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin'],
    correctOption: 1,
  };
  noOfQuestionsAnswered: number = 0;
  QuestionPopupComponent: any;

  constructor(
    public dialogRef: MatDialogRef<QuestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private socketIOService: SocketIOService,
    public cellInterSer: CellInteractionService,
    public pgd: PlayerGameDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.socketIOService.getQuestion();

    this.socketIOService.returnQuestion().subscribe(([sQ]) => {
      console.log(`Question Data: ${sQ}`);
      this.selectedQuestion = sQ;
    });
  }
  
  openProceedPopup() {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {

    });
    
    dialogRef.afterClosed().subscribe((proceed: any) => {
      if (proceed) {
        // Proceed to the next question popup or perform any other action
      } else {
        
      }
    });
  } 

  checkAnswer() {
    if (this.selectedQuestion.correctOption === this.selectedOption) {
      // Proceed to next question
      this.selectedOption = 999;
      this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY].noOfQuestionsAnswered += 1; 
      if (this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY].noOfQuestionsAnswered < 3) {
        this.socketIOService.getQuestion();
      }
      else {
        this.showNotification('You have successfully completed the Quiz');
        this.updateLevel();
        this.dialogRef.close(true);
      }
    }
    else {
      this.showNotification('Oops!! Try taking the quiz after some time')
      this.dialogRef.close(true);
      this.pgd.map[this.cellInterSer.selX][this.cellInterSer.selY].startCooldownTimer();
    }
  }
  
  exitQuiz(){
    // Close the dialog when the "Exit" button is clicked
    this.dialogRef.close(true);
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000, // Time in milliseconds (e.g., 3000ms = 3 seconds)
      panelClass: ['mat-toolbar', 'mat-primary'] // Optional custom CSS classes
    });
  }
  
  updateLevel() {(this.cellInterSer.selected as Building).updateLevel();}
}
