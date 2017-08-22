import { Component } from "@angular/core";

@Component ({
    selector: 'app-logout',
    template: `
        <div>
            <button class="button" (click)="onLogout()">Logout</button>
        </div>
    `
})

export class LogoutComponent {
    onLogout(){

    }
}
