import {ship} from "../components/ship/ship";
import {Injectable} from "@angular/core";
import {shipClass} from "../classes/shipClass";
import {cell} from "../components/cell/cell";
import {GameService} from "./game.service";
import {Player} from "../interfaces/player";

@Injectable()
export class ShipsService {

    constructor(private GameService: GameService) {
    }

    //Метод получения координаты границы проверяемых ячеек
    getEdge(pAxis: number, pAxisK: number, pShipSize: number) {
        let fieldSize = this.GameService.getFieldSize();
        // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
        // к нижней границе игрового поля
        // поэтому координата 'pAxis' последней палубы будет индексом конца цикла
        if (pAxis + pAxisK * pShipSize == fieldSize + 1 && pAxisK == 1) return pAxis + pAxisK * pShipSize - 1;
        // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
        // одна строка, координата этой строки и будет индексом конца цикла
        else if (pAxis + pAxisK * pShipSize <= fieldSize && pAxisK == 1) return pAxis + pAxisK * pShipSize;
        // корабль расположен горизонтально вдоль нижней границы игрового поля
        else if (pAxis == fieldSize && pAxisK == 0) return pAxis;
        // корабль расположен горизонтально где-то по середине игрового поля
        else if (pAxis < fieldSize && pAxisK == 0) return pAxis + 1;
        //Если вылезли за край
        else if (pAxis + pAxisK * pShipSize > fieldSize + 1 && pAxisK == 1) return -1;
    };

    //Метод проверки коллизий кораблей
    checkCollision(pShips: ship[], pShip: shipClass): boolean {
        let x, y, kx, ky, shipSize, fromX, toX, fromY, toY;
        x = pShip.x;
        y = pShip.y;
        kx = pShip.kx;
        ky = pShip.ky;
        shipSize = pShip.shipSize;
        //fromY/X - откуда начинаем искать занятые клетки. Если корабль прилегает к краю, то начинаем с края, иначе с -1 клетки

        fromX = (x == 1) ? x : x - 1;
        toX = this.getEdge(x, kx, shipSize);
        if (toX == -1)
            return true;
        fromY = (y == 1) ? y : y - 1;
        toY = this.getEdge(y, ky, shipSize);
        if (toY == -1)
            return true;
        // запускаем циклы и проверяем выбранный диапазон ячеек
        // возвращаем true если наткнулись на корабль
        for (let i = fromX; i <= toX; i++) {
            for (let j = fromY; j <= toY; j++) {
                for (let k in pShips) {
                    //Если это сам сравниваемый корабль, то идем дальше по циклу
                    if (pShips[k].ship.id == pShip.id || pShips[k].ship.x == -999)
                        continue;
                    for (let l in pShips[k].ship.parts) {
                        if (pShips[k].ship.parts[l].x == i && pShips[k].ship.parts[l].y == j) {
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
                    ships[i].ship.x = this.GameService.getRandom(9);
                    ships[i].ship.y = this.GameService.getRandom(9);
                    ships[i].ship.kx = this.GameService.getRandom(2) - 1;
                    ships[i].ship.ky = (ships[i].ship.kx == 0) ? 1 : 0;
                    ships[i].ship.rearrangeParts();
                    if (!this.checkCollision(ships, ships[i].ship))
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
        //Счетчик ID кораблей. Нужен чтобы при поиске коллизий корабль не сравнивался сам с собой
        let n: number = 1;

        //i - количество балуб
        for (let i = 1; i <= 4; i++) {
            //j - количество кораблей - обратнопропорционально количеству палуб
            for (let j = 4; j >= i; j--) {
                let lShip: ship = new ship();
                let lShipClass: shipClass = new shipClass();
                lShipClass.shipSize = i;
                lShipClass.HP = lShipClass.shipSize;
                lShipClass.name = i + ' палубник';
                lShipClass.x = -999;
                lShipClass.id = n;
                lShipClass.fillParts();
                lShip.ship = lShipClass;
                lShips.push(lShip);
                n++;
            }
        }
        console.log(lShips);
        return lShips;
    }

    placeShip(pPlayer: Player, pCell: cell) {

        console.log(pPlayer);
        //Если в селект листе ничего не выбрано, ругаемся
        if (pPlayer.selectedShip == undefined) {
            alert('Выберите корабль');
            return false;
        }
        //Присваиваем выбранному кораблю стартовые X и Y
        let oldX = pPlayer.selectedShip.ship.x;
        let oldY = pPlayer.selectedShip.ship.y;

        pPlayer.selectedShip.ship.x = pCell.x;
        pPlayer.selectedShip.ship.y = pCell.y;
        pPlayer.selectedShip.ship.rearrangeParts();
        if (this.checkCollision(pPlayer.ships, pPlayer.selectedShip.ship)) {
            pPlayer.selectedShip.ship.x = oldX;
            pPlayer.selectedShip.ship.y = oldY;
            pPlayer.selectedShip.ship.rearrangeParts();
            alert('Коллизия');
            return false;
        }
    }

}