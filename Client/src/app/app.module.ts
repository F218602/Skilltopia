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
import { ToolbarComponentComponent } from './toolbar-component/toolbar-component.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { QuizComponent } from './quiz/quiz.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [
        AppComponent,
        MapComponentComponent,
        CellComponent,
        TabComponentComponent,
        FooterComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        ToolbarComponentComponent,
        MatProgressBarModule,
        // MatListModule
        MatDialogModule,
        MatButtonModule  
    ]
})
export class AppModule { }
