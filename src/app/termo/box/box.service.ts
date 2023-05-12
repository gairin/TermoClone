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

    show(mode: number): void {
        this.winMode = document.querySelector("#win") as HTMLElement;
        this.loseMode = document.querySelector("#lose") as HTMLElement;
        this.content = document.querySelector("#rectangle") as HTMLDivElement;
    
        this.content.style.display = 'block';

        if (mode == 1) {
            this.winMode.style.display = 'block';
            this.loseMode.style.display = 'none'
        }

        else {
            this.loseMode.style.display = 'block';
            this.winMode.style.display = 'none'
        }
    }
}