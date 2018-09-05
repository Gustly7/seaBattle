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

    //constructor(private host: ElementRef, private renderer: Renderer2) {
    constructor() {
        //this.x = x2;
        //this.y = y2;
        //console.log('PartCreated');
    }

    ngOnInit() {
        //console.log(this);
        //this.renderer.setStyle(this.host.nativeElement.children[0], 'left', (this.x*40)+'px');
        //this.renderer.setStyle(this.host.nativeElement.children[0], 'top', (this.y*40)+'px');
    }
}