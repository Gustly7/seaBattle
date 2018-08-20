import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {shipPart} from "./shipPart";

@Component({
    selector: 'ship',
    template: `
        <shipPart *ngFor="let vShipPart of parts" x={{vShipPart.x}} y={{vShipPart.y}}></shipPart>`,
    styles: [`
    `]
})
export class ship {

    @Input() x: number;
    @Input() y: number;
    @Input() parts: shipPart[] = [];

    constructor(private host: ElementRef, private renderer: Renderer2) {
        //this.x = x;
        //this.y = y;
    }

    ngOnInit() {
        this.fillParts();
    }

    fillParts() {
        //Преобразование в number
        this.x = +this.x;
        this.y = +this.y;
        for (let i: number = 0; i < 2; i++) {
            let lPart: shipPart = new shipPart(undefined, undefined);
            lPart.x = this.x;
            lPart.y = (this.y + i);
            this.parts.push(lPart);
        }
    }
}