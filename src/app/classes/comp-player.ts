import {Player} from "../interfaces/player";
import {field} from "../components/field/field";
import {ship} from "../components/ship/ship";

export class CompPlayer implements Player {
    ships: ship[];
    field: field;
    isComp: boolean = true;
    isEnemy: boolean = true;
    selectedShip: ship;
}
