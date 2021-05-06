import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    HomeCardsComponent
    ],

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule
  ],

  exports: [
    HomeCardsComponent
  ]
})
export class SharedComponentModule { }
