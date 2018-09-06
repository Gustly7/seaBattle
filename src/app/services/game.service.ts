import {Injectable} from '@angular/core';
import {field} from "../components/field/field";
import {SettingsService} from "./settings.service";
import {settings} from "../classes/settings";
import {coordinate} from "../classes/coordinate";
import {cell} from "../components/cell/cell";
import {FieldService} from "./field.service";
import {PlayerService} from "./player.service";

@Injectable({
    providedIn: 'root'
})
export class GameService {

    isStarted: boolean = false;  //Флаг начала игры
    isFinished: boolean = false; //Флаг конца игры
    isReady: boolean = false;    //Флаг готовности отрисовки приложения. Ставится после скачивания настроек
    settings: settings;          //Настройки, качаются из JSON
    difficulties: object[] = [{
        "name": 'Easy',
        "id": 1,
        "discr": "Компьютер всегда стреляет случайным образом"
    }, {
        "name": 'Normal',
        "id": 2,
        "discr": "Компьютер стреляет случайно, но пытается добить корабли и помечает клетки где кораблей быть не может"
    }, {"name": 'Hard', "id": 3, "discr": "Как и normal, но стреляет разумно"}];
    screenText: string;

    constructor(private SettingsService: SettingsService, private FieldService: FieldService, private PlayerService: PlayerService) {
        this.SettingsService.getData().subscribe((data: any) => this.settings = data, null, () => {
            this.isReady = true;
        });
    }

    //Случайное число от 1 до n
    getRandom(n: number): number {
        return Math.floor(Math.random() * (n) + 1);
    }

    getFieldSize(): number {
        return this.settings.fieldSize;
    }

    getDifficulties(): object[] {
        return this.difficulties;
    }

    gameStarted(): boolean {
        return this.isStarted;
    }


    //Метод выстрела. Возвращает true если попали в корабль
    fire(pField: field, pCoordinates: coordinate): boolean {
        let vCell = pField.field[pCoordinates.y][pCoordinates.x];

        //Метим ячейку подстреленной.
        vCell.isShot = true;

        //Если корабль
        if (vCell.isShip) {
            //Уменьшаем ХП на 1
            vCell.ship.HP--;

            //Если ХП 0 то убиваем корабль
            if (vCell.ship.HP == 0) {
                vCell.ship.isAlive = false;
                this.showMessage('Убил');
            } else {
                this.showMessage('Ранил');
            }
            //console.log(this.field2.ships);
            this.checkWinner();
            return true;
        }
        return false;
    }

    //Метод пометки рядом стоящих по диагонали ячеек как подстрелянных
    markEmptyCells(pCell: cell) {
        console.log('markEmptyCells');
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                if (pCell.x + i > 0 && pCell.x + i < 11 && pCell.y + j > 0 && pCell.y + j < 11) {
                    this.FieldService.field1.field[pCell.y + j][pCell.x + i].isShot = true;
                }
            }
        }
    }

    //Метод показа сообщения в textArea
    showMessage(pText: string) {
        this.screenText = pText;
    }

    //Метод проверки победителя
    checkWinner(): void {
        for (let i: number = 0; i < this.PlayerService.player1.player.ships.length; i++) {
            if (this.PlayerService.player1.player.ships[i].isAlive)
                break;
            //Если дошли до последнего корабля
            if (i == this.PlayerService.player1.player.ships.length - 1) {
                this.showMessage('Выиграл компьютер');
                this.isFinished = true;
            }
        }
        for (let i: number = 0; i < this.PlayerService.player2.player.ships.length; i++) {
            if (this.PlayerService.player2.player.ships[i].isAlive)
                break;
            //Если дошли до последнего корабля
            if (i == this.PlayerService.player2.player.ships.length - 1) {
                this.showMessage('Выиграл игрок');
                this.isFinished = true;
            }
        }
    }

}