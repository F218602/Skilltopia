import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.scss']
})
export class QuestionPopupComponent {
  selectedOption!: string;
  questionNumber: number = 1;
  question: string = 'nd cdvdd md';
  option1: string = 'dd1';
  option2: string = 'dfd';
  option3: string = 'sd3';
  correctOption: string = 'option2';

  constructor(
    public dialogRef: MatDialogRef<QuestionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}
  
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
