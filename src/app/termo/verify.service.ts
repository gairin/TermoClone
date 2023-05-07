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

    verifyWord(triedWord: string) {
        // acertou a palavra
        if (triedWord == this.gameService.word) {
            this.gameService.win();

            return;
        }

        if (this.gameService.word!.includes(triedWord)) {
            // insira lógica de verificação aqui
            // ou em outro método
        }
    }
}