import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="field">
            <div class="bg"></div>
            <div class="fieldRow" *ngFor="let col of field; let y = index">
                <cell *ngFor="let row of field[y]; let x = index" text={{row}} x={{x}} y={{y}}></cell>
            </div>
        </div>`,
    styles: [`
        
        
        div.fieldRow {
            display: flex;
        }

        div.fieldRow:nth-child(1) {
            background-color: white;
        }

        div.bg {
            background-image: url("./assets/field-bg.jpg");
            background-size: contain;
            width: 200px;
            height: 200px;
            top: 20px;
            left: 20px;
            position: absolute;
            -webkit-animation: slide 80s linear infinite;
            opacity: 0.5;
            z-index: -1;
        }

        div.fieldRow cell:nth-child(1) {
            background-color: white;
        }

        @-webkit-keyframes slide {
            from {
                background-position: 0 0;
            }
            to {
                background-position: -200px -200px;
            }
        }
    `]
})
export class field {
    width: number;
    height: number;
    field: string[][] = [[]];

    constructor(public elementRef: ElementRef) {
    }

    ngOnInit() {
        this.width = 1 + +this.elementRef.nativeElement.getAttribute('field-width');
        this.height = 1 + +this.elementRef.nativeElement.getAttribute('field-height');
        for (let i = 0, row = []; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (i == 0 && j > 0)
                    row.push(String.fromCharCode(1040 + j - 1 > 1048 ? 1040 + j : 1040 + j - 1));
                else if (i > 0 && j == 0)
                    row.push(i);
                else
                    row.push('');
            }
            this.field.push(row);
            row = [];
        }
        this.field.shift();
    }
}