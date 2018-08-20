import {ship} from "../ship";

export class ShipsService {

    static checkCollision(pShips: ship[], pShip: ship): boolean {
        //Каждая часть сравниваемого корабля
        for (let i in pShip.parts) {
            //В каждом корабле массива
            for (let j in pShips) {
                let lShip = pShips[j];
                //В каждой части каждого корабля массива
                for (let k in lShip.parts) {
                    let lPart = lShip.parts[k];
                    //Все точки от части корабля с радиусе 1 клетки
                    for (let y = -1; y < 2; y++) {
                        //console.log('004');
                        for (let x = -1; x < 2; x++) {
                            if (pShip.parts[i].x == lPart.x + x && pShip.parts[i].y == lPart.y + y) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    placeShipsRandom(ships: ship[]) {
        for (let i: number = 0; ships.length < 10; i++) {
            if (i>1000){
                console.log('Слишком много коллизий');
                return false;
            }
            let lShip: ship = new ship(undefined, undefined);
            lShip.x = Math.round(Math.random() * 8 + 1);
            lShip.y = Math.round(Math.random() * 8 + 1);
            lShip.fillParts();
            if (!ShipsService.checkCollision(ships, lShip))
                ships.push(lShip);
        }
    }
}