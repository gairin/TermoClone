import { Injectable } from '@angular/core';
import { WordsService } from './words.service';
import { OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GameService implements OnInit {
    wordlist: string[];
    word: string | null;
    ended: boolean;

    constructor(wordsService: WordsService) {
        this.wordlist = wordsService.getWords();
        this.word = null;
        this.ended = false;
    }

    public newGame(): void {
        let randi: number = Math.floor(Math.random() * this.wordlist!.length);
        this.word = this.wordlist[randi].toUpperCase();
        console.log("Palavra: " + this.word);
    }

    public win(): void {
        // placeholder
        alert('GANHOU');
        this.ended = true;
    }

    public lose(): void {
        //placeholder
        alert('PERDEU');
        this.ended = true;
    }

    ngOnInit() {
        this.newGame();
    }
}
