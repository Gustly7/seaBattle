import {ship} from "../components/ship/ship";
import {Injectable} from "@angular/core";
import {GameService} from "./game.service";

@Injectable()
export class ShipsService {


    //Метод проверки коллизий
    checkCollision(pShips: ship[], pShip: ship): boolean {
        let x, y, kx, ky, shipSize, fromX, toX, fromY, toY;
        let fieldSize = this.GameService.getFieldSize();
        x = pShip.x;
        y = pShip.y;
        kx = pShip.kx;
        ky = pShip.ky;
        shipSize = pShip.shipSize;
        //fromY/X - откуда начинаем искать занятые клетки. Если корабль прилегает к краю, то начинаем с края, иначе с -1 клетки
        fromY = (y == 1) ? y : y - 1;

        // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
        // к нижней границе игрового поля
        // поэтому координата 'Y' последней палубы будет индексом конца цикла
        if (y + ky * shipSize == fieldSize + 1 && ky == 1) toY = y + ky * shipSize - 1;
        // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
        // одна строка, координата этой строки и будет индексом конца цикла
        else if (y + ky * shipSize <= fieldSize && ky == 1) toY = y + ky * shipSize;
        // корабль расположен горизонтально вдоль нижней границы игрового поля
        else if (y == fieldSize && ky == 0) toY = fieldSize;
        // корабль расположен горизонтально где-то по середине игрового поля
        else if (y < fieldSize && ky == 0) toY = y + 1;
        //Если вылезли за край
        else if (y + ky * shipSize > fieldSize + 1 && ky == 1) return true;

        // формируем индексы начала и конца цикла для оси X
        fromX = (x == 1) ? x : x - 1;
        if (x + kx * shipSize == fieldSize + 1 && kx == 1) toX = x + kx * shipSize - 1;
        else if (x + kx * shipSize <= fieldSize && kx == 1) toX = x + kx * shipSize;
        else if (x == fieldSize && kx == 0) toX = x;
        else if (x < fieldSize && kx == 0) toX = x + 1;
        else if (x + kx * shipSize > fieldSize + 1 && kx == 1) return true;

        // запускаем циклы и проверяем выбранный диапазон ячеек
        // возвращаем true если наткнулись на корабль
        for (let i = fromX; i <= toX; i++) {
            for (let j = fromY; j <= toY; j++) {
                for (let k in pShips) {
                    //Если это сам сравниваемый корабль, то идем дальше по циклу
                    if (pShips[k].id == pShip.id || pShips[k].x == -999)
                        continue;
                    for (let l in pShips[k].parts) {
                        if (pShips[k].parts[l].x == i && pShips[k].parts[l].y == j) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    //Метод случайно расстановки
    placeShipsRandom(ships: ship[]) {
        let success: boolean = true;
        while (success) {
            for (let i: number = 0; i < ships.length; i++) {
                /*Счетчик попыток расстановки, иногда рандомайзер загоняет себя в угол
                И не может подобрать оставшееся место для кораблей
                Если за 100000 попыток не получилось, начинаем заново
                */
                let j = 0;
                while (true) {
                    ships[i].x = this.GameService.getRandom(9);
                    ships[i].y = this.GameService.getRandom(9);
                    ships[i].kx = this.GameService.getRandom(2) - 1;
                    ships[i].ky = (ships[i].kx == 0) ? 1 : 0;
                    ships[i].rearrangeParts();
                    if (!this.checkCollision(ships, ships[i]))
                        break;
                    if (j > 100000) {
                        success = false;
                        break;
                    }
                    j++;
                }
            }
            //Если был успех, присваиваем false и выходим из цикла
            if (success) {
                success = false;
            }
            //Если рандомайзер загнал себя в угол, возвращаем true и расставляем заново
            else {
                success = true;
            }
        }
    }

    //Метод получения начальных кораблей
    getInitShips(): ship[] {
        //Создаем и возвращаем массив начальных кораблей
        let lShips: ship[] = [];
        let lShip: ship;
        //Счетчик ID кораблей. Нужен чтобы при поиске коллизий корабль не сравнивался сам с собой
        let n: number = 1;

        //i - количество балуб
        for (let i = 1; i <= 4; i++) {
            //j - количество кораблей - обратнопропорционально количеству палуб
            for (let j = 4; j >= i; j--) {
                lShip = new ship();
                lShip.shipSize = i;
                lShip.HP = lShip.shipSize;
                lShip.name = i + ' палубник';
                lShip.x = -999;
                lShip.id = n;
                lShip.fillParts();
                lShips.push(lShip);
                n++;
            }
        }
        return lShips;
    }

    constructor(private GameService: GameService) {

    }
}