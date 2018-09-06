import {AbstractShootingStrategy} from "../interfaces/abstract-shooting-strategy";
import {coordinate} from "./coordinate";
import {GameService} from "../services/game.service";
import {Player} from "../interfaces/player";
import {PlayerService} from "../services/player.service";

export class StrategyEasy implements AbstractShootingStrategy {

    getShotCoordinate(): coordinate{
        let vCoordinate = new coordinate();
        while (true) {
            vCoordinate.x = this.GameService.getRandom(this.GameService.settings.fieldSize);
            vCoordinate.y = this.GameService.getRandom(this.GameService.settings.fieldSize);
            //Перебираем координаты рандомом пока не найдем не подстреллянную
            if (!(this.PlayerService.player1.player.field[vCoordinate.y][vCoordinate.x].isShot)) {
                return vCoordinate;
            }
        }
    }

    constructor(private GameService: GameService, private PlayerService: PlayerService) {

    }

    difficulty: number = 1;

}
