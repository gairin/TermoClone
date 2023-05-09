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
    colorCodesToKeyboard: string[];

    constructor(
        private gameService: GameService,
        private verifyService: VerifyService
        ) {
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
        this.colorCodesToKeyboard = [];

        window.addEventListener('load', () => {
            const tableElement: HTMLTableElement = document.querySelector("#brdTable > tbody") as HTMLTableElement;
            
            if (tableElement) {
                this.boardHTML = tableElement;
            }
        });
    }

    public charHandle(letter: string): void {
        if (this.currentBox == (this.boardMatrix[0].length)) {
            return;
        }

        this.boardMatrix[this.currentRow][this.currentBox] = letter;

        this.updateBoard(letter);
    }
    
    private updateBoard(letter: string): void {
        let cell: Element = this.boardHTML!.children[this.currentRow].children[this.currentBox];
        cell.innerHTML = letter;

        this.currentBox++;
    }

    private paintSquares(colorArr: string[]) {
        for (let i = 0; i < this.boardMatrix[0].length; i++) {           
            let cell: HTMLTableCellElement = this.boardHTML!.children[this.currentRow].children[i] as HTMLTableCellElement;
            cell.style.backgroundColor = colorArr[i];
        }
    }

    public confirmAttempt(): void {
        if (this.gameService.ended == true) {
            return;
        }

        this.triedWord = '';

        for (let i = 0; i < this.boardMatrix[0].length; i++) {
            this.triedWord += this.boardMatrix[this.currentRow][i]
        }

        if (this.triedWord.includes(' ')) {
            return;
        }
        
        let colorArr: string[] = this.verifyService.verifyWord(this.triedWord);
        this.colorCodesToKeyboard = colorArr;
        this.paintSquares(colorArr);

        this.currentRow < 5 ? (this.currentRow++, this.currentBox = 0) : this.gameService.lose();
    }

    public backspace(): void {
        if (this.currentBox == 0 || this.gameService.ended == true) {
            return;
        }

        this.currentBox--;

        let cell: HTMLTableCellElement = this.boardHTML!.children[this.currentRow].children[this.currentBox] as HTMLTableCellElement; 
        cell.contentEditable = 'true';
        cell.innerHTML = ' ';

        this.boardMatrix[this.currentRow][this.currentBox] = ' ';
    }

    ngOnInit() { }
}