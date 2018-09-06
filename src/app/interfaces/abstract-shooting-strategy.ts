import {coordinate} from "../classes/coordinate";

export interface AbstractShootingStrategy {
    difficulty: number;

    getShotCoordinate() : coordinate;
}