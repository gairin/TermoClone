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
            const tableElement = document.querySelector("#brdTable > tbody") as HTMLTableElement;
            
            if (tableElement) {
                this.boardHTML = tableElement;
            }
        });
    }

    countOccurrences(str: string): {[key: string]: number} {
        var count: {[key: string]: number} = {}
        
        for (let char of str) {
            if (count[char]) {
                count[char]++;
            }

            else {
                count[char] = 1;
            }
        }
        
        return count;
    }

    verifyWord(triedWord: string): string[] {
        var word: string = this.gameService.word!;

        // acertou a palavra
        if (triedWord == word) {
            this.gameService.win();

            return ['green', 'green', 'green', 'green', 'green'];
        }

        var colorArr: string[] = new Array(5);

        // lógica de verificação
        for (let i = 0; i < triedWord.length; i++) {
            if (triedWord[i] == word![i]) {
                colorArr[i] = 'green';

                word = word.replace(triedWord[i], "-");
                console.log(word);
            }

            else if (word?.includes(triedWord[i])) {
                colorArr[i] = 'yellow';

                word = word.replace(triedWord[i], "-");
                console.log(word);
            }

            else {
                colorArr[i] = 'gray';
            }
        }

        return colorArr;
    }
}