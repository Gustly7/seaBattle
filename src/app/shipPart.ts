import {Component, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
    selector: 'shipPart',
    template: `
        <div class="shipPart"></div>`,
    styles: [`        
        .shipPart {
            background-image: url("./../assets/cartoon-sea-mine.png");
            width: 40px;
            height: 40px;
            position: absolute;
            background-size: contain;
        }
    `]
})
export class shipPart {

    @Input() x: number;
    @Input() y: number;
    constructor(private host: ElementRef, private renderer: Renderer2) {
        //this.x = x;
        //this.y = y;
    }

    ngOnInit() {
        window['q'] = this.host;
        //window['z'] = this.renderer;
        //window['w'] = this.host.nativeElement;
        //console.log(this);
        this.renderer.setStyle(this.host.nativeElement.children[0], 'left', (this.x*40)+'px');
        this.renderer.setStyle(this.host.nativeElement.children[0], 'top', (this.y*40)+'px');
    }
}