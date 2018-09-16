import {Component, Input, OnInit} from '@angular/core';
import {shipClass} from "../../classes/shipClass";

@Component({
    selector: 'ship',
    templateUrl: './ship.component.html',
    styleUrls: ['./ship.component.css']
})
export class ship implements OnInit {

    @Input() ship: shipClass;

    constructor() {
        this.ship = new shipClass();
    }

    ngOnInit() {
        //this.shipOb.HP = this.shipOb.shipSize;
    }

}