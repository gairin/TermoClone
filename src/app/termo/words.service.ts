import { Injectable } from '@angular/core'

// Banco de palavras temporário. Eu eventualmente pretendo usar um banco de dados
import wordlist from '../../assets/wordlist.json';

@Injectable({
    providedIn: 'root'
})

export class WordsService {
    words: string[];

    constructor() {
        this.words = wordlist;
    }
    
    getWords(): string[] {
        return this.words;
    }

}
