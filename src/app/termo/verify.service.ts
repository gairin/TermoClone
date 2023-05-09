import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})

export class VerifyService {
    gameService: GameService;
    boardHTML: HTMLTableElement | null;

    constructor(gameService: GameService) {
        this.gameService = gameService;
        this.boardHTML = null;
        
        window.addEventListener('load', () => {
            const tableElement: HTMLTableElement = document.querySelector("#brdTable > tbody") as HTMLTableElement;
            
            if (tableElement) {
                this.boardHTML = tableElement;
            }
        });
    }

    colorKeys = {
        doesNotContain: '#696969',
        containsWrongSpot: '#FFCC00',
        containsRightSpot: '#006600'
    }

    public verifyWord(triedWord: string): string[] {
        let word: string = this.gameService.word!;

        if (triedWord == word) {
            this.gameService.win();

            return new Array(5).fill(this.colorKeys.containsRightSpot);
        }

        let colorArr: string[] = new Array(5);

        // lógica de verificação
        for (let i = 0; i < triedWord.length; i++) {
            // certo no certo
            if (triedWord[i] == word![i]) {
                colorArr[i] = this.colorKeys.containsRightSpot;

                word = word.replace(triedWord[i], "-");
            }

            // certo no errado
            else if (word?.includes(triedWord[i])) {
                colorArr[i] = this.colorKeys.containsWrongSpot;

                word = word.replace(triedWord[i], "-");
            }

            // não tem
            else {
                colorArr[i] = this.colorKeys.doesNotContain;
            }
        }

        return colorArr;
    }
}