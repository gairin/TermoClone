import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.css']
})

export class KeyboardComponent implements OnInit {
    keyboard: HTMLTableElement | null;

    constructor(private boardComponent: BoardComponent) {
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
        
        let kbTd = this.keyboard!.querySelectorAll("td");
        let lastTwo = Array.from(kbTd).slice(-2);

        const backspaceButton = lastTwo[0];
        const okButton = lastTwo[1];

        // Por ora, placeholders para implementar depois
        backspaceButton.addEventListener('click', () => {
            console.log('Funcionou');
        });

        okButton.style.backgroundColor = '#dc1b1b';
        okButton.addEventListener('click', () => {
            console.log('Funcionou');
        });
    }

    // BUG: selecionar várias teclas (segurar o botão do mouse) faz bugar tudo lol
    charInput(event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        var letter: string = target.innerText

        this.boardComponent.charHandle(letter);
    }

    ngOnInit() {
        this.keyboard = document.querySelector('table#kbTable > tbody') as HTMLTableElement;
    }
}