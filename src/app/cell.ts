import {Component, Input} from '@angular/core';

@Component({
    selector: 'cell',
    template: `
        <div class="cell" (click)="cellClick()">{{text}}
        </div>`,
    styles: [`

        .cell {
            width: 40px;
            height: 40px;
            border-width: 0px 1px 1px 0px;
            border-color: black;
            border-style: solid;
            text-align: center;
            position: relative;
            font-size: 20pt;
        }

    `]
})
export class cell {
    @Input() text: string;
    @Input() x: number;
    @Input() y: number;

    cellClick() {
        if (this.x == 0 || this.y == 0)
            return false;
        alert(this.x + '$' + this.y);
    }
}