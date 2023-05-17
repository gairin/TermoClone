import { Component, OnInit } from '@angular/core';
import { BoxService } from './box.service';
import { GameService } from '../game.service';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
    winMode: HTMLElement | null;
    loseMode: HTMLElement | null;
    content: HTMLDivElement | null;
    showcaseInfo: {
        tries: number;
        word: string | null;
    };

    constructor(
        private boxService: BoxService,
        private gameService: GameService
        ) {
        this.winMode = null;
        this.loseMode = null;
        this.content = null;
        this.showcaseInfo = {
            tries: 0,
            word: ''
        };
    }

    public generateBox(mode: number, tries: number) {
        this.showcaseInfo = {
            tries: tries,
            word: this.gameService.word
        }

        this.boxService.show(mode, this.showcaseInfo);

        document.querySelector(".restart-button")?.addEventListener('click', () => {
            window.location.reload();
        });
    }

    ngOnInit() {
        this.content = document.querySelector("#rectangle") as HTMLDivElement;
        this.content.style.display = 'none';
    }
}