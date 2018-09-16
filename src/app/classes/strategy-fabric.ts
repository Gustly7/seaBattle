import {StrategyEasy} from "./strategy-easy";
import {AbstractShootingStrategy} from "../interfaces/abstract-shooting-strategy";
import {GameService} from "../services/game.service";
import {FieldService} from "../services/field.service";
import {StrategyNormal} from "./strategy-normal";

export class StrategyFabric {

    // тут мы сопоставили название типа и класс
    static StrategyTypes = {
        'easy': StrategyEasy
        , 'normal': StrategyNormal
    };

    static createStrategyByType(pType: string, pGameService: GameService, pFieldService: FieldService): AbstractShootingStrategy {
        if (this.StrategyTypes.hasOwnProperty(pType)) {
            return new this.StrategyTypes[pType](pGameService, pFieldService);
        }
    }

}