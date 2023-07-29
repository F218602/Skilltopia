import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent {
  lobbyCode!: string;
  errorMessage!: string;

  constructor(private router: Router) {}

  onSubmit() {
    // Check if the lobby code exists and has at least 2 players
    const room = this.checkLobbyCode(this.lobbyCode);

    if (room && room.players.length >= 2) {
      // Navigate to the main page
      this.router.navigate(['/main']);
    } else {
      // Show an error message
      this.errorMessage = 'Lobby code is invalid or does not have enough players.';
    }
  }

  // Function to check the lobby code and return the room details if found
  checkLobbyCode(lobbyCode: string): any {
    // Implement the logic to check the lobby code and retrieve the room details
    // You can use a service or any other method to validate the lobby code and fetch the room data
    // For demonstration purposes, let's assume you have a hardcoded list of rooms:

    const rooms = [
      {
        code: 'ABC123',
        players: ['Player1', 'Player2'],
      },
      {
        code: 'XYZ789',
        players: ['Player3', 'Player4', 'Player5'],
      },
      // Add more rooms as needed
    ];

    return rooms.find((room) => room.code === lobbyCode);
  }
}
