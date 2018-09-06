import {Injectable} from '@angular/core';
import {PlayerComponent} from "../components/player/player.component";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    player1: PlayerComponent;    //Ссылка на 1 игрока
    player2: PlayerComponent;    //Ссылка на 2 игрока

    constructor() {
    }
}
