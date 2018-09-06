import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../../interfaces/player";
import {GameService} from "../../../../services/game.service";
import {ShipsService} from "../../../../services/ships.service";

@Component({
    selector: 'shipsList',
    templateUrl: './shipsList.component.html',
    styleUrls: ['./shipsList.component.css']
})
export class ShipsListComponent implements OnInit {

    @Input() player: Player;

    constructor(private GameService: GameService, private ShipsService: ShipsService) {
    }

    ngOnInit() {
    }

}
