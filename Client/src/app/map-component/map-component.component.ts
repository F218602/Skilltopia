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
  ngOnInit() {
    // Connect to the server
    this.socket = io('http://localhost:3000');
    // Join a room
    const room = 'myRoom';
    this.socket.emit('join', room);
    // Getting map data from the server
    this.socket.on('Joined', (arrayData) => {
      console.log('Received 20x50 array:', arrayData);

      this.map = arrayData;
    });
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
      const row: number[] = Array(numCols).fill(33);
      this.map.push(row);
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