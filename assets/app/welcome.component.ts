import { Component } from "@angular/core";

@Component ({
    selector: 'app-welcome',
    host: {
        class: 'flexFull box'
    },
    template: `
        <h2>Welcome</h2>
        <div class="flexVertical flexFull box">
            <div class="flexHorizontal">
                <p>Peace joa</p>
                <p>whaddup</p>
            </div>
        </div>
    `
})

export class WelcomeComponent {
    constructor() {}
}
