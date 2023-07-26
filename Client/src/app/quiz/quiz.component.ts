import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
})
export class QuizComponent {
  closeDialog() {
    // Close the dialog when the "Close" button is clicked
    this.dialogRef.close();
  }

  constructor(private dialogRef: MatDialogRef<QuizComponent>) {}
}
