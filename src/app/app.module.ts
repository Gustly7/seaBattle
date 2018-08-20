import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {field} from './field';
import {cell} from './cell';
import {game} from './game';
import {ship} from './ship';
import {shipPart} from "./shipPart";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [game, cell, field, ship, shipPart],
    bootstrap: [game]
})
export class AppModule {
}