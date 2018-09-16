import {Player} from "../interfaces/player";
import {ship} from "../components/ship/ship";
import {field} from "../components/field/field";

export class HumanPlayer implements Player{
    ships: ship[];
    field: field;
    isComp: boolean = false;
    isEnemy: boolean = false;
    selectedShip: ship;
}
