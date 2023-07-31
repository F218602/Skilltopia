import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPopupComponent } from '../question-popup/question-popup.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
})
export class QuizComponent {
  
  constructor(private dialogRef: MatDialogRef<QuizComponent>, private dialog: MatDialog) {}
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
  }
}
