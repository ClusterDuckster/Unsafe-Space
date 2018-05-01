import { Component } from "@angular/core";

import { AuthService } from "./Auth/auth.service";

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
                <div *ngIf="isLoggedIn(); then profile else welcome"></div>
                <ng-template #profile><app-profile></app-profile></ng-template>
                <ng-template #welcome><app-welcome></app-welcome></ng-template>
            </div>
            <div class="sideSpace"></div>
    `
})

export class HomeComponent {
    constructor(private authService: AuthService) {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
