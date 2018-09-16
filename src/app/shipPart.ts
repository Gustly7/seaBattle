import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {ship} from "./components/ship/ship";

@Component({
    selector: 'shipPart',
    template: `<div [style.top.px]="y*40" [style.left.px]="x*40" class="shipPart"></div>`,
    styles: [`        
        .shipPart {
            /*background-image: url("./../assets/cartoon-sea-mine.png");*/
            background-color: green;
            width: 40px;
            height: 40px;
            position: absolute;
            background-size: contain;
            opacity: 0.5;
        }
    `]
})
export class shipPart {

    @Input() x: number;
    @Input() y: number;
    @Input() ship: ship;

    constructor() {
    }

    ngOnInit() {

    }
}