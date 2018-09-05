import {Injectable} from '@angular/core';
import {coordinate} from "../classes/coordinate";
import {GameService} from "./game.service";
import {ship} from "../components/ship/ship";

@Injectable({
    providedIn: 'root'
})
export class CompLogicService {

    tempShip: ship = new ship();  //Временный корабль для расчета следующего выстрела

    shootMatrixAround: coordinate[] = []; //Массив координат для обстрела вокруг первого попадания по кораблю

    constructor(private GameService: GameService) {
        //Расширяем временный корабль атрибутами первого удара и следующего ударов
        //Тайпскрипту это не нравится. Пришлось добавить атрибуты, но я не хотел ради одного места это делать.
        //Как поступить?
        this.tempShip.firstHit = new coordinate();
        this.tempShip.firstHit.x = -1;
        this.tempShip.nextHit = new coordinate();
        this.tempShip.nextHit.x = -1;
    }

    //Метод вычисления координаты выстрела компьютером
    getCompCoordinates(pDifficulty: number): coordinate {

        let vCoordinate = new coordinate();
        switch (pDifficulty) {
            //Простая сложность
            case 1:
                while (true) {
                    vCoordinate.x = this.GameService.getRandom(10);
                    vCoordinate.y = this.GameService.getRandom(10);
                    //Перебираем координаты рандомом пока не найдем не подстреллянную
                    if (!(this.GameService.field1.field[vCoordinate.y][vCoordinate.x].isShot)) {
                        return vCoordinate;
                    }
                }
            //Нормальная сложность
            case 2:

                //Если в массиве обстрела вокруг предыдущего попадания есть точки
                if (this.shootMatrixAround.length > 0) {
                    vCoordinate = this.shootMatrixAround.pop();
                }
                //Иначе стреляем рандомно
                else {
                    vCoordinate = this.getCompCoordinates(1);
                }

                //Если попали в корабль
                if (this.GameService.field1.field[vCoordinate.y][vCoordinate.x].isShip) {
                    //, то метим также ячейки расположенные рядом по диагонали
                    this.GameService.markEmptyCells(this.GameService.field1.field[vCoordinate.y][vCoordinate.x]);

                    //Если первого попадания не было, то пишем в него координаты
                    if (this.tempShip.firstHit.x == -1) {
                        this.tempShip.firstHit = vCoordinate;
                    } else {
                        // запишем координаты второго попадания в объект 'nextHit'
                        this.tempShip.nextHit = vCoordinate;
                        // вычисляем коэффициенты определяющие положения корабля
                        // разность между соответствующими координатами первого и второго
                        // попадания не может быть больше 1, в противном случае будем
                        // считать, что второе попадание было по другому кораблю
                        this.tempShip.kx = (Math.abs(this.tempShip.firstHit.x - this.tempShip.nextHit.x) == 1) ? 1 : 0;
                        this.tempShip.ky = (Math.abs(this.tempShip.firstHit.y - this.tempShip.nextHit.y) == 1) ? 1 : 0;
                    }

                    //Заполняем массив обстрела вокруг

                    // корабль расположен вертикально
                    if (vCoordinate.x > 1 && this.tempShip.ky == 0) {
                        //Координата для обстрела вокруг попадания
                        let vC = new coordinate();
                        vC.x = vCoordinate.x - 1;
                        vC.y = vCoordinate.y;
                        if (!this.GameService.field1.field[vC.y][vC.x].isShot) {
                            this.shootMatrixAround.push(vC);
                        }
                    }
                    if (vCoordinate.x < 10 && this.tempShip.ky == 0) {
                        let vC = new coordinate();
                        vC.x = vCoordinate.x + 1;
                        vC.y = vCoordinate.y;
                        if (!this.GameService.field1.field[vC.y][vC.x].isShot) {
                            this.shootMatrixAround.push(vC);
                        }
                    }
                    // корабль расположен горизонтально
                    if (vCoordinate.y > 1 && this.tempShip.kx == 0) {
                        let vC = new coordinate();
                        vC.x = vCoordinate.x;
                        vC.y = vCoordinate.y - 1;
                        if (!this.GameService.field1.field[vC.y][vC.x].isShot) {
                            this.shootMatrixAround.push(vC);
                        }
                    }
                    if (vCoordinate.y < 10 && this.tempShip.kx == 0) {
                        let vC = new coordinate();
                        vC.x = vCoordinate.x;
                        vC.y = vCoordinate.y + 1;
                        if (!this.GameService.field1.field[vC.y][vC.x].isShot) {
                            this.shootMatrixAround.push(vC);
                        }
                    }
                }

                return vCoordinate;
            case 3:
                //TO DO :(
                break;
            default:
                break;
        }
    }
}
