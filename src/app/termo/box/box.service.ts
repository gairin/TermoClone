import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BoxService {
    content: HTMLDivElement | null;
    winMode: HTMLElement | null;
    loseMode: HTMLElement | null;

    constructor() {
        this.content = null;
        this.winMode = null;
        this.loseMode = null;
    }

    stylize(element: HTMLParagraphElement) {
        element.style.backgroundColor = 'transparent';
        element.style.color = 'white';
        element.style.fontWeight = '300';
        element.style.fontSize = '110%'
    }

    show(
        mode: number,
        info: {
        tries: number;
        word: string | null;
        }
    ): void {
        
        
        this.winMode = document.querySelector("#win") as HTMLElement;
        this.loseMode = document.querySelector("#lose") as HTMLElement;
        this.content = document.querySelector("#rectangle") as HTMLDivElement;
    
        this.content.style.display = 'block';

        if (mode == 1) {
            const winText = document.createElement('p');
            winText.innerText = `VOCÊ ADIVINHOU A PALAVRA ${info.word} EM ${info.tries} TENTATIVAS`;
            this.winMode.insertBefore(winText, this.winMode.lastChild);
            this.stylize(winText);

            this.winMode.style.display = 'block';
            this.loseMode.style.display = 'none'
        }

        else {
            const loseText = document.createElement('p');
            loseText.innerText = `A PALAVRA ERA: ${info.word}`;
            this.loseMode.insertBefore(loseText, this.loseMode.lastChild);
            this.stylize(loseText);

            this.loseMode.style.display = 'block';
            this.winMode.style.display = 'none'
        }     
    }
}