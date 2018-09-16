import {coordinate} from "./coordinate";
import {shipPart} from "../shipPart";

export class shipClass {
    x: number;  //Координата X
    y: number;  //Координата Y
    shipSize: number; //Размер корабля
    name: string;     //Имя
    parts: shipPart[] = []; //Массив палуб
    kx: number = 1;         //Коэффициент X, если =1, а ky=0 то корабль горизонтальный
    ky: number = 0;         //Коэффициент Y, если =1, а kx=0 то корабль вертикальный
    id: number;                      //id корабля
    isAlive: boolean = true;         //Флаг что корабль живой
    firstHit: coordinate;            //Координата первого попадания, нужно для логики компьютера
    nextHit: coordinate;             //Координата следующего попадания, нужно для логики компьютера
    HP: number;             //Количество жизней

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