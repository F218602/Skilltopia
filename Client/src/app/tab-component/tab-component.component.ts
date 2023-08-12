import { Component } from '@angular/core';
import { PlayerGameDataService } from '../player-game-data.service';
import { BuildingDetails } from '../game-object.interface';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrls: ['./tab-component.component.scss']
})
export class TabComponentComponent {
  
constructor(public pgd: PlayerGameDataService) {}
}
