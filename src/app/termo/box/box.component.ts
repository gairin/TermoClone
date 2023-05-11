import { Component } from '@angular/core';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})

export class BoxComponent {
    mode: number | null;
    show: boolean;

    constructor() {
        // 0 = derrota / 1 = vitória
        this.mode = null;
        this.show = false;
    }

    showModal(mode: number): void {
        this.mode = mode;
        this.show = true;
    }
}
