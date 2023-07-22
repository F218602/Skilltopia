import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit, OnDestroy{
  socket: Socket= io('http://localhost:3000');;

  map: number[][] = [];

  objectTypes = {
    farm: 0,
    goldMine: 1,
    building: 2,
    docks: 3,
    // Add more types as needed
  };
  
  ngOnInit() {
    // Connect to the server
    this.socket = io('http://localhost:3000');
    // Join a room
    const room = 'myRoom';
    this.socket.emit('join', room);

    // Listen for events
    this.socket.on('playerJoined', (playerId: string) => {
      console.log(`Player ${playerId} joined the room`);
    });

    this.socket.on('playerLeft', (playerId: string) => {
      console.log(`Player ${playerId} left the room`);
    });

    this.socket.on('roomFull', () => {
      console.log(`Room is full`);
    });

    this.socket.on('changed', (i:any,j:any,val:any) => {
      console.log(val);
      this.map[i][j] =val;
    });

    // Generate a 2D map with random values
    const numRows = 20;
    const numCols = 50;

    // Initialize the array with default values (e.g., -1)
    for (let i = 0; i < numRows; i++) {
      const row: number[] = Array(numCols).fill(-1);
      this.map.push(row);
    }
    // Place objects randomly in n locations
    let count = 0;
    while (count < 75) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numCols);

      if (this.map[randomRow][randomCol] === -1) {
        // Generate a random object type index from 0 to number of types - 1
        const randomTypeIndex = Math.floor(Math.random() * Object.keys(this.objectTypes).length);
        
        // Assign the object type to the location
        this.map[randomRow][randomCol] = randomTypeIndex;

        count++;
      }
    }
  }

  ngOnDestroy() {
    // Disconnect from the server
    this.socket.disconnect();
  }
  setValue(i: any, j: any): void {
    this.map[i][j] =0;
    this.socket.emit('change', 'myRoom', i, j, 0);
    throw new Error('Method not implemented.');
    }

}