import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent {

  map: number[][] = [];

  objectTypes = {
    farm: 0,
    goldMine: 1,
    building: 2,
    docks: 3,
    // Add more types as needed
  };
  
  ngOnInit() {
    // Generate a 2D map with random values
    const numRows = 20;
    const numCols = 20;

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
  

}