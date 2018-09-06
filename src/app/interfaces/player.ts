import {ship} from "../components/ship/ship";
import {field} from "../components/field/field";

export interface Player {
    ships: ship[];
    field: field;

    isComp: boolean;
    isEnemy: boolean;
}
