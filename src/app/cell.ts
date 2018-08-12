import {Component} from '@angular/core';

@Component({
    selector: 'cell',
    template: `
        <div class="cell">{{text}}</div>`,
    styles: [`
        .cell:hover {
            background-color: rgba(170, 187, 204, 0.5);
        }

        .cell {
            width: 20px;
            height: 20px;
            background-color: #00c00d;
            border: 1px;
            border-color: black;
            border-style: solid;
            text-align: center;
        }
    `]
})
export class cell {
    text: string;
}