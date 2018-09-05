import {ShipsService} from "./services/ships.service";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {field} from './components/field/field';
import {cell} from './components/cell/cell';
import {game} from './components/game/game';
import {ship} from './components/ship/ship';
import {shipPart} from "./shipPart";
import {PlayerComponent} from './components/player/player.component';
import {GameService} from "./services/game.service";
import {SettingsService} from "./services/settings.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule],
    declarations: [game, cell, field, ship, shipPart, PlayerComponent],
    bootstrap: [game],
    providers: [ShipsService, GameService, SettingsService]
})
export class AppModule {
}