import {coordinate} from "../classes/coordinate";

export interface AbstractShootingStrategy {
    difficulty: string;

    getShotCoordinate() : coordinate;
}