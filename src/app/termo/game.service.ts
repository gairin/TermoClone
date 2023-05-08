import { Injectable } from '@angular/core';
import { WordsService } from './words.service';
import { OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GameService implements OnInit {
    wordlist: string[];
    word: string | null;

    constructor(wordsService: WordsService) {
        this.wordlist = wordsService.getWords();
        this.word = null;
    }

    newGame(): void {
        var randi = Math.floor(Math.random() * this.wordlist!.length);
        this.word = this.wordlist[randi].toUpperCase();

        console.log(this.word);
    }

    win(): void {
        // placeholder
        alert('GANHOU');
    }

    ngOnInit() {
        this.newGame();
    }

}
