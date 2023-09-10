import { Component } from '@angular/core';
import { SocketIOService } from './socket-io.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skilltopia';

  constructor(public socketIOService: SocketIOService) {}
  
  getCreated() {
   return this.socketIOService.getCreated();
  }
}
