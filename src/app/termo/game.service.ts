import { Injectable } from '@angular/core';
import { WordsService } from './words.service';
import { BoxService } from './box/box.service';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    wordlist: string[] | null;
    private _word: string | null;
    ended: boolean;

    constructor(
        private wordsService: WordsService,
        private boxService: BoxService
        ) {
        this.wordlist = wordsService.getWords();
        this._word = null;
        this.ended = false;
    }

    public newGame(): void {
        let randi: number = Math.floor(Math.random() * this.wordlist!.length);
        this._word = this.wordlist![randi].toUpperCase();
        console.log("Palavra: " + this._word);
    }

    public endGame(): void {
        this.ended = true;
    }

    get word(): string | null {
        return this._word;
    }
}