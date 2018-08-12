import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="fieldRow" *ngFor="let col of field; let i = index">
            <cell *ngFor="let row of field[i]" (text)=row></cell>
        </div>`,
    styles: [`
        div.fieldRow {
            display: flex;
        }
    `]
})
export class field {
    width: number = 10;
    height: number = 10;
    //rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    field: string[][] = [[]];

    ngOnInit() {
        console.log('width=' + this.width);
        console.log('heigth=' + this.height);
        console.log(this.field);
        for (let i = 0, row = []; i < this.width; i++) {
            console.log('test01');
            for (let j = 0; j < this.height; j++) {
                if (i == 0)
                    row.push(String.fromCharCode(1040 + j));
                else
                    row.push('');
            }
            this.field.push(row);
            row = [];
        }
        this.field.shift();
        //window.q = this.field;
        console.log(window);
        console.log(field);
        console.log(this.field);
    }
}