import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerGameDataService } from '../player-game-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-end-game-pop-up',
  templateUrl: './end-game-pop-up.component.html',
  styleUrls: ['./end-game-pop-up.component.scss'],
})
export class EndGamePopUpComponent {

  @Output() onClose = new EventEmitter<void>();
  playerScoresDescending: { playerId: string, score: number }[] = [];

  constructor(private dialogRef: MatDialogRef<EndGamePopUpComponent>, private dialog: MatDialog, public pgd: PlayerGameDataService) {
    console.log(this.pgd.rankedPlayers);
    // this.calculatePlayerScoresDescending();
  }

  closeDialog() {
    // Close the dialog when the "Close" button is clicked
    this.dialogRef.close();
  }

  // calculatePlayerScoresDescending() {
  //   // Assuming you have an array of player IDs in playerIds
  //   const playerIds = this.pgd.playerID;
  
  //   // Sort player scores in descending order
  //   playerIds.sort((a, b) => {
  //     const scoreA = this.pgd.playerScore[a];
  //     const scoreB = this.pgd.playerScore[b];
  //     return scoreB - scoreA;
  //   });
  
  //   // Create an array with player scores and player IDs
  //   this.playerScoresDescending = playerIds.map((playerId) => {
  //     return { playerId: playerId, score: this.pgd.playerScore[playerId] };
  //   });
  // }
  
  
}
