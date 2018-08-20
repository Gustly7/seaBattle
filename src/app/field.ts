import {Component, Input} from '@angular/core';
import {ship} from "./ship";
import {ShipsService} from './services/ships.service';

@Component({
    selector: 'field',
    providers: [ShipsService],
    template: `
        <div class="field">
            <div class="bg"></div>
            <div class="fieldRow" *ngFor="let col of field; let y = index">
                <cell *ngFor="let row of field[y]; let x = index" text={{row}} x={{x}} y={{y}} (click)=addShip(x,y)></cell>
            </div>
            <ship *ngFor="let ship of ships" x={{ship.x}} y={{ship.y}}></ship>
        </div>`,
    styles: [`

        div.field {
            position: relative;
        }

        div.fieldRow {
            display: flex;
        }

        div.bg {
            background-size: contain;
            width: 400px;
            height: 400px;
            top: 40px;
            left: 40px;
            position: absolute;
            overflow: hidden;
            z-index: -1;
        }

        div.bg:before {
            background-image: url("./../assets/field-bg.jpg");
            opacity: 0.6;
            z-index: -1;
            -webkit-animation: slide 40s linear infinite;
            content: "";
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            z-index: -1;
        }

        @-webkit-keyframes slide {
            from {
                background-position: 0 0;
                transform: rotate(0deg);
            }
            to {
                background-position: 200px 200px;
                transform: rotate(60deg);
            }
        }
    `]
})
export class field {
    @Input() width: number;
    @Input() height: number;
    field: string[][] = [[]];
    ships: ship[] = [];


    constructor(private ShipsService: ShipsService) {
    }

    ngOnInit() {
        //this.ships = this.ShipsService.getData();
        //this.width = 1 + +this.elementRef.nativeElement.getAttribute('field-width');
        //this.height = 1 + +this.elementRef.nativeElement.getAttribute('field-height');
        for (let i = 0, row: string[] = []; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (i == 0 && j > 0)
                    row.push(String.fromCharCode(1040 + j - 1 > 1048 ? 1040 + j : 1040 + j - 1));
                else if (i > 0 && j == 0)
                    row.push(i.toString());
                else
                    row.push('');
            }
            this.field.push(row);
            row = [];
        }
        this.field.shift();
        window['ships'] = this.ships;
        //this.ShipsService.addShip(1,2);
        this.ShipsService.placeShipsRandom(this.ships);

        let qwe = new ship(null, null);
        qwe.x = 1;
        window['qwe'] = qwe;
    }

    addShip(x: number, y: number) {
        console.log('addShip');
        let lShip = new ship(undefined, undefined);
        //Можно ли задать x и y в конструктуре?
        lShip.x = x;
        lShip.y = y;
        lShip.fillParts();
        if (ShipsService.checkCollision(this.ships, lShip)) {
            alert('Коллизия');
            return false;
        }
        console.log('qwe');
        this.ships.push(lShip);
        //this.ShipsService.checkCollision(this.ships[this.ships.length-1]);
        window['ships'] = this.ships;
        window['parts'] = this.ships[this.ships.length - 1].parts;
    }
}