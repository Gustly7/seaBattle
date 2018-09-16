import {Injectable} from '@angular/core';
import {coordinate} from "../classes/coordinate";
import {GameService} from "./game.service";
import {FieldService} from "./field.service";
import {StrategyFabric} from "../classes/strategy-fabric";

@Injectable({
    providedIn: 'root'
})
export class CompLogicService {

    strategies = {
        'easy': StrategyFabric.createStrategyByType('easy', this.GameService, this.FieldService),
        'normal': StrategyFabric.createStrategyByType('normal', this.GameService, this.FieldService)
    };

    constructor(private GameService: GameService, private FieldService: FieldService) {

    }

    //Метод вычисления координаты выстрела компьютером
    getCompCoordinates(pDifficulty: string): coordinate {
        return this.strategies[pDifficulty].getShotCoordinate();
    }
}
