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
        // CHECKPOINT: O básico funciona.
        // Falta implementar a logica de verificação
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

    confirmAttempt(): void {
        // É necessário adicionar uma verificação de que se todas
        // as colunas foram preenchidas antes do ok.

        for (let i = 0; i < this.boardMatrix[0].length; i++) {
            this.triedWord += this.boardMatrix[this.currentRow][i]
        }
        
        this.verifyService.verifyWord(this.triedWord);

        // Desde já documentando, isto pode dar erro de out of index
        // no caso da última coluna. Uma possível solução é receber
        // um bool de retorno desta função acima, definindo se houve
        // a vitória ou não, e daí fazer algumas condicionais.
        this.currentRow++;
        this.currentBox = 0;
    }

    backspace(): void {
        if (this.currentBox == 0) {
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