import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { GameService } from '../game.service';

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.css']
})

export class KeyboardComponent implements OnInit {
    keyboard: HTMLTableElement | null;
    keyboardChars: string[][];

    constructor(
        private boardComponent: BoardComponent,
        private gameService: GameService
        ) {
        this.keyboard = null;
        this.keyboardChars = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
            ["Z", "X", "C", "V", "B", "N", "M", "<-", "OK"]
        ];
    }

    ngAfterViewInit(): void {
        const lastCell: HTMLTableCellElement = document.querySelector("#kbTable > tbody > tr:nth-child(3) > td:nth-child(9)") as HTMLTableCellElement;

        lastCell.colSpan = 2;

        for (let i = 0; i < this.keyboardChars.length; i++) {
            for (let j = 0; j < this.keyboardChars[i].length; j++) {
                if (i == 2 && j == 7) {
                    break;
                }
                
                let key: HTMLElement = this.keyboard?.children[i].children[j] as HTMLElement;
                
                key?.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    this.charInput($event);
                });
            }
        }
        
        let keyboardTD: NodeListOf<HTMLTableCellElement> = this.keyboard!.querySelectorAll("td");
        let lastTwo: HTMLTableCellElement[] = Array.from(keyboardTD).slice(-2);

        const backspaceButton: HTMLTableCellElement = lastTwo[0];
        const okButton: HTMLTableCellElement = lastTwo[1];

        backspaceButton.addEventListener('click', () => {
            this.boardComponent.backspace();
        });

        okButton.style.backgroundColor = '#dc1b1b';
        okButton.addEventListener('click', () => {
            this.boardComponent.confirmAttempt();
            this.paintBoxes(this.boardComponent.colorCodesToKeyboard);
        });
    }

    private charInput(event: MouseEvent): void {
        if (this.gameService.ended == true) {
            return;
        }

        const target: HTMLElement = event.target as HTMLElement;
        let letter: string = target.innerText

        this.boardComponent.charHandle(letter);
    }

    private paintBoxes(colorKey: string[]): void {
        let x: number = 0;
        let letters: string = this.boardComponent.triedWord;

        for (let i = 0; i < this.keyboardChars.length; i++) {
            for (let j = 0; j < this.keyboardChars[0].length; j++) {
                let key: HTMLTableCellElement = this.keyboard!.children[i].children[j] as HTMLTableCellElement;
                
                if (letters.includes(key.innerHTML.replace(/\s/g, ''))) {
                    key.style.backgroundColor = colorKey[
                        letters.indexOf(key.innerHTML.replace(/\s/g, ''))
                    ];

                    x++
                    
                    if (x == 5) {
                        break;
                    }
                }
        
                if (j == 6 && i == 2) {
                    break;
                }
            }
            if (x == 5) {
                break;
            }
        } 
    }

    ngOnInit() {
        this.keyboard = document.querySelector('table#kbTable > tbody') as HTMLTableElement;
    }
}