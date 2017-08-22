import { Component } from "@angular/core";

@Component ({
    selector: 'app-home',
    host: {
        class: 'flexFull home box'
    },
    template: `
            <div class="sideSpace"></div>
            <div class="shoutout-container box flexVertical">
                <shoutouts></shoutouts>
            </div>
            <div class="auth-container box flexVertical">
                <authentication></authentication>
            </div>
            <div class="sideSpace"></div>
    `
})

export class HomeComponent {

}
