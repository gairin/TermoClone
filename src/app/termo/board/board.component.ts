import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { VerifyService } from '../verify.service';

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
    triedWord: string;

    constructor(private gameService: GameService, private verifyService: VerifyService) {
        // indexadas em zero
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
        this.triedWord = '';

        window.addEventListener('load', () => {
            const tableElement = document.querySelector("#brdTable > tbody") as HTMLTableElement;
            
            if (tableElement) {
                this.boardHTML = tableElement;
            }
        });
    }

    charHandle(letter: string): void {
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

    paintSquares(colorCodes: string[]) {
        for (let i = 0; i < this.boardMatrix[0].length; i++) {           
            var cell = this.boardHTML!.children[this.currentRow].children[i] as HTMLTableCellElement;
            cell.style.backgroundColor = colorCodes[i];
        }
    }

    confirmAttempt(): void {
        if (this.gameService.ended == true) {
            return;
        }

        this.triedWord = '';

        for (let i = 0; i < this.boardMatrix[0].length; i++) {
            // this.triedWord é potencialmente desnecessário
            // por ora vou mantê-la pois acho que será útil e
            // conveniente para motivos de exibição
            this.triedWord += this.boardMatrix[this.currentRow][i]
        }

        if (this.triedWord.includes(' ')) {
            return;
        }
        
        var colorCodes: string[] = this.verifyService.verifyWord(this.triedWord);
        this.paintSquares(colorCodes);

        if (this.currentRow < 5) {
            this.currentRow++;
            this.currentBox = 0;
        }

        else {
            this.gameService.lose();
        }
    }

    backspace(): void {
        if (this.currentBox == 0 || this.gameService.ended == true) {
            return;
        }

        this.currentBox--;

        var cell = this.boardHTML!.children[this.currentRow].children[this.currentBox] as HTMLTableCellElement; 
        cell.contentEditable = 'true';
        cell.innerHTML = ' ';

        this.boardMatrix[this.currentRow][this.currentBox] = ' ';
    }

    ngOnInit() { }
}