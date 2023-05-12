import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
    selector: 'app-termo',
    templateUrl: './termo.component.html',
    styleUrls: ['./termo.component.css']
})
export class TermoComponent {

    constructor(gameService: GameService) {
        window.addEventListener('load', () => {
            gameService.newGame();
        });
    };   
}