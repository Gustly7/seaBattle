import {Component, Input} from '@angular/core';

@Component({
    selector: 'cell',
    template: `
        <div class="cell" (click)="cellClick()">{{text}}</div>`,
    styles: [`
        .cell2:nth-child(2n):hover {
            background-color: rgba(0, 183, 20, 0.8);
        }

        .cell {
            width: 20px;
            height: 20px;
            border-width: 0px 1px 1px 0px;
            border-color: black;
            border-style: solid;
            text-align: center;
        }
    `]
})
export class cell {
    @Input() text: string;
    @Input() x: number;
    @Input() y: number;

    cellClick() {
        alert(this.x + '$' + this.y);
    }
}