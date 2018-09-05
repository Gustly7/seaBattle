import {Component} from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class game {

    constructor(private GameService: GameService) {
    }

    ngOnInit() {
        return false;
    }

    //Метод кнопки начала игры
    startGame() {
        this.GameService.isStarted = true;
        this.GameService.field1.gameStart();
        this.GameService.field2.gameStart();
        this.GameService.showMessage('Игра началась!');
    }
}