import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PlayerGameDataService } from '../player-game-data.service';
import { SocketIOService } from '../socket-io.service';
import { EndGamePopUpComponent } from '../end-game-pop-up/end-game-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
@Component({
  selector: 'app-toolbar-component',
  templateUrl: './toolbar-component.component.html',
  styleUrls: ['./toolbar-component.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ToolbarComponentComponent implements OnInit{
  // winner: string = 'baka';
  // timeStart: Date = new Date('2023-09-01T12:00:00');
  remainingTime: string = 'Time';

  constructor(public pgd: PlayerGameDataService, public socketIOService: SocketIOService, public dialog: MatDialog) { }
  
  ngOnInit(): void {

    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);

    this.socketIOService.gameOver().subscribe(([rankedPlayers]) => {
      console.log(rankedPlayers);
      this.pgd.rankedPlayers = rankedPlayers;
      console.log(this.pgd.rankedPlayers);
      this.socketIOService.Created = false;
      this.openPopup();
    });
  }

  // Function to open the popup
  openPopup(): void {
    const dialogRef = this.dialog.open(EndGamePopUpComponent);

  dialogRef.afterClosed().subscribe(() => {
    // Add any logic you want to perform when the popup is closed
    console.log('Popup closed');
  });
}

updateRemainingTime(): void {
  const currentTime = new Date();
  const elapsedTimeInSeconds = (currentTime.getTime() - this.pgd.timeStart.getTime()) / 1000;

  const remainingSeconds = 3 * 60 * 60 - elapsedTimeInSeconds;
  if (remainingSeconds <= 0) {
    this.remainingTime = ''; // Game has ended
  } else {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    // Format the remaining time as "HH:mm:ss"
    this.remainingTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
openHelpDialog(): void {
  const dialogRef = this.dialog.open(HelpDialogComponent, {
    width: '70vw',
    height: '70vh',
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
  });
}

}
