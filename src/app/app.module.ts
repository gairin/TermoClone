import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { TermoModule } from './termo/termo.module';
import { TermoComponent } from './termo/termo.component';

import { BoardModule } from './termo/board/board.module';
import { BoardComponent } from './termo/board/board.component';

import { KeyboardComponent } from './termo/keyboard/keyboard.component';
import { KeyboardModule } from './termo/keyboard/keyboard.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TermoComponent,
    BoardComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    TermoModule,
    BoardModule,
    KeyboardModule,
    HttpClientModule
  ],
  providers: [BoardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
