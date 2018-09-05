import {ShipsService} from "../../services/ships.service";
import {GameService} from "../../services/game.service";
import {Component, Input, OnInit} from '@angular/core';
import {ship} from "../ship/ship";
import {cell} from "../cell/cell";
import {coordinate} from "../../classes/coordinate";
import {CompLogicService} from "../../services/comp-logic.service";

@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

    ships: ship[] = []; //Массив кораблей
    selectedShip: ship; //Выбранный корабль из селект листа для ручной расстановки
    @Input() isComp: boolean = false; //Флаг что игрок - комрьютер
    @Input() isEnemy: boolean = false;//Флаг что игрок - враг

    difficulties: object[] = this.GameService.getDifficulties(); //Массив сложностей для селект листа для копьютера
    selectedDifficulty: number = this.GameService.settings.difficulty; //Выбранная сложность, используется в CompLogicService для расчета координаты выстрела компьютера

    constructor(private GameService: GameService, private ShipsService: ShipsService, private CompLogicService: CompLogicService) {
    }

    ngOnInit() {
        //Вставляем в массив изначальные корабли.
        this.ships = this.ShipsService.getInitShips();

        //Кладем в сервис ссылки на игроков, для игрока 2 рандомно расставляем корабли
        if (this.isEnemy) {
            this.GameService.player2 = this;
            this.ShipsService.placeShipsRandom(this.ships);
        }
        else {
            this.GameService.player1 = this;
        }
    }

    //Вызывается через эмитер по клику ячейки->полю->игроку
    playerFieldCellClick(pCell: cell) {

        //Если клик по вражескому полю то стреляем
        if (this.isEnemy) {
            //Только если игра началась и ячейка не подстреленная
            if (this.GameService.gameStarted() && pCell.isShot == false) {

                let vCoordinate: coordinate = new coordinate();
                vCoordinate.x = pCell.x;
                vCoordinate.y = pCell.y;
                if (this.GameService.fire(this.GameService.field2, vCoordinate)) {
                    //Если человек попал в корабль, ничего не делаем
                }
                //Иначе стреляет компьютер
                else {
                    while (true) {
                        vCoordinate = this.CompLogicService.getCompCoordinates(this.selectedDifficulty);
                        //Если промахнулись, выходим
                        if (!this.GameService.fire(this.GameService.field1, vCoordinate)) {
                            break;
                        }
                    }
                }
            }
        }
        //По клик по своему полю, то ставим корабль, если игра еще не началась.
        else {
            if (!this.GameService.gameStarted()) {
                this.placeShip(pCell);
            }
        }
    }

    placeShip(pCell: cell) {

        //Если в селект листе ничего не выбрано, ругаемся
        if (this.selectedShip == undefined) {
            alert('Выберите корабль');
            return false;
        }
        //Присваиваем выбранному кораблю стартовые X и Y
        let oldX = this.selectedShip.x;
        let oldY = this.selectedShip.y;
        this.selectedShip.x = pCell.x;
        this.selectedShip.y = pCell.y;
        this.selectedShip.rearrangeParts();
        if (this.ShipsService.checkCollision(this.ships, this.selectedShip)) {
            this.selectedShip.x = oldX;
            this.selectedShip.y = oldY;
            this.selectedShip.rearrangeParts();
            alert('Коллизия');
            return false;
        }
        //Перераспределяем палубы
    }

    //Метод рандомной расстановки кораблей
    placeShipRandom() {
        this.ShipsService.placeShipsRandom(this.ships);
    }

}
