import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SocketIOService } from '../socket-io.service';
import { QuizQuestion } from '../quizQuestion.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    // private snackBar: MatSnackBar,
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
        // Display "Try again" message or perform any other action
      }
    });
  } 
  checkAnswer() {
    if (this.selectedQuestion.correctOption === this.selectedOption) {
      // Proceed to next question
      this.selectedOption = 999;
      this.noOfQuestionsAnswered += 1; 
       if (this.noOfQuestionsAnswered <= 3) {
            this.socketIOService.getQuestion();
        }
        else {
          // Display "Try again" message
          this.dialogRef.close(true);
        }
   }
  }
  // quizCompleted(){
  //   this.snackBar.open('Quiz completed', 'Close', {
  //     duration: 3000, // Set the duration for the snackbar to be displayed (in milliseconds)
  //   });
  // }
  exitQuiz(){
    // Close the dialog when the "Exit" button is clicked
    this.dialogRef.close(true);
  }
}
