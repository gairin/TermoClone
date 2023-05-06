import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit {
    currentRow: number;
    currentBox: number;
    boardHTML: HTMLTableElement | null;
    boardMatrix: string[][];

    constructor() {
        this.currentRow = 0;
        this.currentBox = 0;
        this.boardHTML = null;
        this.boardMatrix = [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
        ];

        window.addEventListener('load', () => {
            const tableElement = document.querySelector("#brdTable > tbody") as HTMLTableElement;
            
            if (tableElement) {
                this.boardHTML = tableElement;
            }
        });
    }

    charHandle(letter: string): void {
        // CHECKPOINT: O básico funciona.
        // Falta implementar a logica de verificação
        console.log(letter);
        if (this.currentBox == (this.boardMatrix[0].length)) {
            return;
        }

        this.boardMatrix[this.currentRow][this.currentBox] = letter;

        this.updateBoard(letter);
    }
    
    updateBoard(letter: string): void {
        var cell = this.boardHTML!.children[this.currentRow].children[this.currentBox];
        cell.innerHTML = letter;

        this.currentBox++;
    }

    ngOnInit() { }
}