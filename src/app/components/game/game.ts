import {Component} from '@angular/core';
import {GameService} from "../../services/game.service";
import {HumanPlayer} from "../../classes/human-player";
import {CompPlayer} from "../../classes/comp-player";
import {FieldService} from "../../services/field.service";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class game {

    player1 = new HumanPlayer();
    player2 = new CompPlayer();

    constructor(private GameService: GameService, private FieldService: FieldService) {
    }

    ngOnInit() {
        return false;
    }

    //Метод кнопки начала игры
    startGame() {
        this.GameService.isStarted = true;
        this.FieldService.field1.gameStart();
        this.FieldService.field2.gameStart();
        this.GameService.showMessage('Игра началась!');
    }
}