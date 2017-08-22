import { Component } from "@angular/core";

@Component ({
    selector: 'authentication',
    host: {
        class:'authContent flexFull flexVertical'
    },
    template: `
        <h2>Authentication</h2>
        <div class="flexFull flexVertical">
            <ul class="tabs">
                <li routerLinkActive="activeTab" [routerLink]="['signin']">Signin</li>
                <li routerLinkActive="activeTab" [routerLink]="['signup']">Signup</li>
                <li routerLinkActive="activeTab" [routerLink]="['logout']">Logout</li>
            </ul>
            <div class="homeContent flexFull flexVertical">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})

export class AuthenticationComponent {

}
