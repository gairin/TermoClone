import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { KeyboardComponent } from './keyboard/keyboard.component';

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

    public verifyWord(triedWord: string): string[] {
        let word: string = this.gameService.word!;

        // acertou a palavra
        if (triedWord == word) {
            this.gameService.win();

            return ['green', 'green', 'green', 'green', 'green'];
        }

        let colorArr: string[] = new Array(5);

        // lógica de verificação
        for (let i = 0; i < triedWord.length; i++) {
            if (triedWord[i] == word![i]) {
                colorArr[i] = 'green';

                word = word.replace(triedWord[i], "-");
            }

            else if (word?.includes(triedWord[i])) {
                colorArr[i] = 'yellow';

                word = word.replace(triedWord[i], "-");
            }

            else {
                colorArr[i] = 'gray';
            }
        }

        
        return colorArr;
    }
}