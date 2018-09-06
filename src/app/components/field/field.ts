import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ship} from "../ship/ship";
import {cell} from "../cell/cell";
import {ShipsService} from "../../services/ships.service";
import {GameService} from "../../services/game.service";
import {FieldService} from "../../services/field.service";
import {Player} from "../../interfaces/player";

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.css']
})
export class field {
    @Input() width: number;
    @Input() height: number;
    field: cell[][] = [[]];
    @Output() fieldCellClickOut = new EventEmitter<cell>();
    @Input() selectedShip: ship;
    @Input() player: Player;

    constructor(private GameService: GameService, private ShipsService: ShipsService, private FieldService: FieldService) {

    }

    ngOnInit() {
        //Кладем в сервис игры ссылки на поля
        if (this.player.isEnemy)
            this.FieldService.field2 = this;
        else
            this.FieldService.field1 = this;

        //Перебираем размер поля и заполняем атрибут field ячейками
        for (let i = 0, row: cell[] = []; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let lCell = new cell(this.GameService);
                lCell.text = '';
                lCell.x = j;
                lCell.y = i;
                //Если это первый ряд, то заполяем буквами
                if (i == 0 && j > 0) {
                    //1048 - буква Й, пропускаем
                    lCell.text = String.fromCharCode(1040 + j - 1 > 1048 ? 1040 + j : 1040 + j - 1);
                    row.push(lCell);
                }
                //Если это 1я ячейка строки, то заполяем цифрой
                else if (i > 0 && j == 0) {
                    lCell.text = i.toString();
                    row.push(lCell);
                }
                else
                    row.push(lCell);
            }
            this.field.push(row);
            row = [];
        }
        this.field.shift();
    }

    //Метод добавления корабля в массив
    addShip(x: number, y: number) {
        let lShip = new ship();
        //Можно ли задать x и y в конструктуре?
        lShip.x = x;
        lShip.y = y;
        lShip.shipSize = 2;
        lShip.fillParts();
        if (this.ShipsService.checkCollision(this.player.ships, lShip)) {
            alert('Коллизия');
            return false;
        }
        this.player.ships.push(lShip);
        //console.log(this.ships);
    }

    //Клик по ячейке поля, эммитим наверх.
    fieldCellClick(pCell: cell) {
        //console.log('fieldCellClick');
        this.fieldCellClickOut.emit(pCell);
    }

    //Двойной клик по кораблю, чтобы развернуть его
    shipDblClk(pShip: ship) {
        //Если игра началась, ничего не делаем
        if (this.GameService.gameStarted()){
            return false;
        }

        //selectedShip не пробасывается наверх как ships, почему?
        this.selectedShip = pShip;
        pShip.kx = pShip.kx == 0 ? 1 : 0;
        pShip.ky = pShip.kx == 0 ? 1 : 0;
        pShip.rearrangeParts();
        if (this.ShipsService.checkCollision(this.player.ships, pShip)) {
            alert('коллизия');
            pShip.kx = pShip.kx == 0 ? 1 : 0;
            pShip.ky = pShip.kx == 0 ? 1 : 0;
            pShip.rearrangeParts();
        }
    }

    //Метод начала игры. Перебирает все коробли поля и заполняет каждую ячейку поля значением isShip true если там корабль
    gameStart() {

        for (let s in this.player.ships) {

            let lShip = this.player.ships[s];
            //Пропускаем корабли которые не поставили
            if (lShip.x == -999)
                continue;
            for (let p in lShip.parts) {
                let lPart = this.player.ships[s].parts[p];
                let lCell = this.field[lPart.y][lPart.x];
                //Кладем в ячейку флаг что это корабль
                lCell.isShip = true;
                //Ссылка на корабль для ячейки
                lCell.ship = lShip;
            }
        }
    }

    qwe(){
        console.log(this.player.ships);
    }
}