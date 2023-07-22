import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { CellComponent } from './cell/cell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabComponentComponent } from './tab-component/tab-component.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    CellComponent,
    TabComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
