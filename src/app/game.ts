import {Component} from '@angular/core';

@Component({
    selector: 'game',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-lg-1">
                    &nbsp;
                </div>
                <div class="col-lg-3">
                    <field width=11 height=11></field>
                </div>
                <div class="col-lg-4">
                    &nbsp;
                </div>
                <div class="col-lg-3">
                    <field width=11 height=11></field>
                </div>
                <div class="col-lg-1">
                    &nbsp;
                </div>
            </div>
        </div>
        `,
    styles: [``]
})
export class game {

}