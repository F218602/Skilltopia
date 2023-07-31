import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent {
  selectedOption!: string;
  questionNumber!: number;
  question!: string;
  option1!: string;
  option2!: string;
  option3!: string;
  dialog: any;

  constructor(
    public dialogRef: MatDialogRef<QuestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  openProceedPopup() {
    const dialogRef = this.dialog.open(QuestionPopupComponent, {
      data: {
        questionNumber: 1,
        question: 'Sample question 1?',
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        correctOption: 'option2', // Replace this with the correct option for the question
      },
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
    if (this.selectedOption === this.data.correctOption) {
      // Proceed to next question
      this.dialogRef.close(true);
    } else {
      // Display "Try again" message
      this.dialogRef.close(false);
    }
  }
  exitQuiz(){
    // Close the dialog when the "Exit" button is clicked
    this.dialogRef.close(true);
  }
}
