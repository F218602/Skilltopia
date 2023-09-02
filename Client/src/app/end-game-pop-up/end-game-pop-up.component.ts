import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerGameDataService } from '../player-game-data.service';

@Component({
  selector: 'app-end-game-pop-up',
  templateUrl: './end-game-pop-up.component.html',
  styleUrls: ['./end-game-pop-up.component.scss']
})
export class EndGamePopUpComponent {

  // @Input() winner: string = 'gomi';
  @Output() onClose = new EventEmitter<void>();

  constructor(public pgd : PlayerGameDataService) {console.log(this.pgd.winner);}

  closePopup(): void {
    this.onClose.emit();
  }

}
