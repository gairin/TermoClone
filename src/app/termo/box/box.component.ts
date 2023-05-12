import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})

export class BoxComponent implements OnInit {
    winMode: HTMLElement | null;
    loseMode: HTMLElement | null;
    content: HTMLDivElement | null;
    showcaseInfo: {
        "tries": number;
        "word": string | null;
    };

    constructor(private boardComponent: BoardComponent) {
        this.winMode = null;
        this.loseMode = null;
        this.content = null;
        this.showcaseInfo = {
            "tries": 0,
            "word": ''
        }
    }

    ngOnInit() {
        this.content = document.querySelector("#rectangle") as HTMLDivElement;

        this.content.style.display = 'none';
    }
}
