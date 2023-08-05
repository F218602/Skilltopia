import { Component } from '@angular/core';
import { SocketIOService } from '../socket-io.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'], // Check if the filename and path are correct
})
export class LobbyComponent {
  userName: string = ''; // Variable to store the user name
  roomName: string = ''; // Variable to store Room name

  constructor(private socketIOService: SocketIOService) {} 
  
  ngOnInit() {

    // Listen for events
    this.socketIOService.playerJoined().subscribe(([playerId]) => {
      console.log(`Player ${playerId} joined the room`);
      
      this.socketIOService.Created = true;
      console.log(this.socketIOService.Created);
    });
    this.socketIOService.playerLeft().subscribe(([playerId]) => {
      console.log(`Player ${playerId} left the room`);
    });
  
    this.socketIOService.roomFull().subscribe(([])=> {
      console.log(`Room is full`);
    });

  }
  joinGame() {
   console.log(this.userName, this.roomName);
   this.socketIOService.join(this.userName, this.roomName)
  }
}