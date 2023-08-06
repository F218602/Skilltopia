import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SocketIOService } from '../socket-io.service';
import { CellInteractionService } from '../cell-interaction.service';
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit{

  map: number[][] = [];
  constructor(public socketIOService: SocketIOService) {}
  ngOnInit() {
    this.socketIOService.Joined().subscribe(([arrayData]) => {
          console.log('Received 20x50 array:', arrayData);
          // this.socketIOService.Created = true;
          this.map = arrayData;
    });

    this.socketIOService.changed().subscribe(([i, j, val]) => {
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
  setValue(i: any, j: any): void {
    // this.map[i][j] =0;
    // this.socketIOService.change(this.socketIOService.roomName, i, j, 0);
    
    }

}