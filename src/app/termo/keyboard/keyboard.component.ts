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

    constructor(
        private boardComponent: BoardComponent,
        private gameService: GameService
        ) {
        this.keyboard = null;
    }

    keyboardChars: string[][] = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
        ["Z", "X", "C", "V", "B", "N", "M", "<-", "OK"]
    ];
     

    ngAfterViewInit(): void {
        const lastCell = document.querySelector("#kbTable > tbody > tr:nth-child(3) > td:nth-child(9)") as HTMLTableCellElement;

        lastCell.colSpan = 2;

        for (let i = 0; i < this.keyboardChars.length; i++) {
            for (let j = 0; j < this.keyboardChars[i].length; j++) {
                if (i == 2 && j == 7) {
                    break;
                }
                
                var cell = this.keyboard?.children[i].children[j] as HTMLElement;
                
                cell?.addEventListener('click', ($event) => {
                    $event.preventDefault();
                    this.charInput($event);
                });
            }
        }
        
        let keyboardTD = this.keyboard!.querySelectorAll("td");
        let lastTwo = Array.from(keyboardTD).slice(-2);

        const backspaceButton = lastTwo[0];
        const okButton = lastTwo[1];

        backspaceButton.addEventListener('click', () => {
            this.boardComponent.backspace();
        });

        okButton.style.backgroundColor = '#dc1b1b';
        okButton.addEventListener('click', () => {
            this.boardComponent.confirmAttempt();
        });
    }

    charInput(event: MouseEvent): void {
        if (this.gameService.ended == true) {
            return;
        }

        const target: HTMLElement = event.target as HTMLElement;
        var letter: string = target.innerText

        this.boardComponent.charHandle(letter);
    }

    ngOnInit() {
        this.keyboard = document.querySelector('table#kbTable > tbody') as HTMLTableElement;
    }
}