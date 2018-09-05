export class coordinate {
    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _x: number;
    private _y: number;
}