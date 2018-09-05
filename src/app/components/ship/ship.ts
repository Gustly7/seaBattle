import {Component, Input, OnInit} from '@angular/core';
import {shipPart} from "../../shipPart";
import {coordinate} from "../../classes/coordinate";

@Component({
    selector: 'ship',
    templateUrl: './ship.component.html',
    styleUrls: ['./ship.component.css']
})
export class ship implements OnInit {

    @Input() x: number;  //Координата X
    @Input() y: number;  //Координата Y
    @Input() shipSize: number; //Размер корабля
    @Input() name: string;     //Имя
    @Input() parts: shipPart[] = []; //Массив палуб
    @Input() kx: number = 0;         //Коэффициент X, если =1, а ky=0 то корабль горизонтальный
    @Input() ky: number = 0;         //Коэффициент Y, если =1, а kx=0 то корабль вертикальный
    id: number;                      //id корабля
    isAlive: boolean = true;         //Флаг что корабль живой
    firstHit: coordinate;            //Координата первого попадания, нужно для логики компьютера
    nextHit: coordinate;             //Координата следующего попадания, нужно для логики компьютера
    @Input() HP: number;             //Количество жизней

    constructor() {
        //console.log('shipConstructor');
        //console.log(this);
    }

    ngOnInit() {
        this.HP = this.shipSize;
    }

    //Метод заполнения массива палуб
    fillParts() {
        //Преобразование в number, иначе там строка
        this.x = +this.x;
        this.y = +this.y;

        //Проходимся по размеру
        for (let i = 0; i < this.shipSize; i++) {
            //   while (i < this.shipSize) {
            let lPart: shipPart = new shipPart();
            lPart.x = (this.x + i * this.kx);
            lPart.y = (this.y + i * this.ky);
            this.parts.push(lPart);
        }
    }

    //Метод перестройки палуб
    rearrangeParts() {
        //Преобразование в number, иначе там строка
        this.x = +this.x;
        this.y = +this.y;

        for (let i = 0; i < this.parts.length; i++) {
            this.parts[i].x = (this.x + i * this.kx);
            this.parts[i].y = (this.y + i * this.ky);
        }
    }
}