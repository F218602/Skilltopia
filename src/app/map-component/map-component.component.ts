import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent {

  map: number[][] = [];

  ngOnInit() {
    // Generate a 2D map with random values
    const numRows = 20;
    const numCols = 20;

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(Math.floor(Math.random() * 10)); // Generate a random value (0-9)
      }
      this.map.push(row);
    }
  }

}