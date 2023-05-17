import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BoxService {
    content: HTMLDivElement | null;
    winMode: HTMLElement | null;
    loseMode: HTMLElement | null;
    winText: string;
    loseText: string;

    constructor() {
        this.content = null;
        this.winMode = null;
        this.loseMode = null;
        this.winText = '';
        this.loseText = '';
    }

    private stylize(element: HTMLParagraphElement) {
        element.style.backgroundColor = 'transparent';
        element.style.color = 'white';
        element.style.fontWeight = '300';
        element.style.fontSize = '110%'
    }

    public show(
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
            if (!document.querySelector('p')) {          
                const winText = document.createElement('p');
                this.winText = `VOCÊ ADIVINHOU A PALAVRA ${info.word} EM ${info.tries} TENTATIVAS`;
                winText.innerText = this.winText
                this.winMode.insertBefore(winText, this.winMode.lastChild);
                this.stylize(winText);
            }

            else {
                this.winText = `VOCÊ ADIVINHOU A PALAVRA ${info.word} EM ${info.tries} TENTATIVAS`;
                document.querySelector("p")!.innerText = this.winText
            }
                
            this.winMode.style.display = 'block';
            this.loseMode.style.display = 'none';
        }

        else {
            if (!document.querySelector('p')) {          
                const loseText = document.createElement('p');
                this.loseText = `A PALAVRA ERA: ${info.word}`;
                loseText.innerText = this.loseText
                this.loseMode.insertBefore(loseText, this.loseMode.lastChild);
                this.stylize(loseText);
            }

            else {
                this.loseText = `A PALAVRA ERA: ${info.word}`;
                document.querySelector("p")!.innerText = this.loseText
            }

            this.loseMode.style.display = 'block';
            this.winMode.style.display = 'none'
        }     
    }
}