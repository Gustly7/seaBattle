import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ship} from "../ship/ship";
import {shipPart} from "../../shipPart";
import {GameService} from "../../services/game.service";

@Component({
    selector: 'cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class cell {
    @Input() text: string;   //Текст ячейки, для границ поля
    @Input() x: number;      //Координата X
    @Input() y: number;      //Координата Y
    @Input() isShip: boolean = false; //В ячейке корабль
    @Input() isShot: boolean = false; //Подстрелена ли ячейка
    @Output() cellClickOut = new EventEmitter<cell>(); //Событие клика для эмитера
    @Input() ship: ship;     //Ссылка на корабль который прилегает к ячейке

    constructor(private GameService: GameService){

    }

    //Клик по ячейке
    cellClick() {
        //console.log('cellClick');
        if (!this.GameService.isFinished)
            this.cellClickOut.emit(this);
    }

}