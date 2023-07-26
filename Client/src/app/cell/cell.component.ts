import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() value: number = 0 ;
  numberToImageMapping: any = {
    1: '/assets/Image/Buildings/House.gif',
    // 2: 'image2.jpg',
    // 3: 'image3.jpg',
    // Add more mappings as needed
  };
  
  getImageUrl(number: number) {
    return this.numberToImageMapping[number] || null; // Use a default image if mapping not found
  }
}

