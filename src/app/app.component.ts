import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h2>Количество кликов: {{clicks}}</h2>
    <child-comp (onChanged)="onChanged($event)"></child-comp>`
})
export class AppComponent {

    clicks: number = 0;

    onChanged(increased: any) {
        increased == true ? this.clicks++ : this.clicks--;
    }
}