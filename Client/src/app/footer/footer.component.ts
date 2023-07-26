import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
Level:number=1;
Age:string='Stone 1';
CurrentPopulation:number=20;
MaximumPopulation:number=100;
}
