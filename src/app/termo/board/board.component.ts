import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { VerifyService } from '../verify.service';
import { BoxComponent } from '../box/box.component';

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
        private verifyService: VerifyService,
        private boxComponent: BoxComponent
        ) {
        // indexadas em zero
        this.currentRow = 0;
        this.currentBox = 0;
        this.boardHTML = null;
        this.boardMatrix = Array.from({ length: 6 }, () => new Array(5).fill(" "));
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
        if (this.gameService.ended == true || this.currentBox == 0) {
            return;
        }

        this.triedWord = '';

        for (let i = 0; i < this.boardMatrix[0].length; i++) {
            this.triedWord += this.boardMatrix[this.currentRow][i]
        }

        if (this.triedWord.includes(' ')) {
            return;
        }
        
        let data: {colors: string[], code: number} = this.verifyService.verifyWord(this.triedWord);
        this.colorCodesToKeyboard = data.colors;
        let state: number = data.code;
        
        if (state == 1) {
            this.gameService.endGame();
            this.boxComponent.generateBox(state, this.currentRow + 1);
        } 
        
        this.paintSquares(data.colors);
        
        if (this.currentRow < 5) {
            this.currentRow++;
            this.currentBox = 0
        } 

        else if (this.currentRow == 5 && state == 0) {
            this.gameService.endGame();
            this.boxComponent.generateBox(state, 6);
        }
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