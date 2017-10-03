import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Component ({
    selector: 'app-logout',
    template: `<button class="button" (click)="onLogout()">Logout</button>`
})

export class LogoutComponent {

    constructor(private authService: AuthService, private router: Router) {}

    onLogout(){
        console.log('logout called');
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}
