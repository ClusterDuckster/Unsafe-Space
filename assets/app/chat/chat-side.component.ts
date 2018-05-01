import { Component } from "@angular/core";

@Component ({
    selector: 'app-roomAndGameInfo',
    host: {
        class:'box flexVertical chatSide'
    },
    template: `
        <div class="flexFull flexVertical">
            <ul class="tabs">
                <li routerLinkActive="activeTab" [routerLink]="['chatroom']">chatroom</li>
                <li routerLinkActive="activeTab" [routerLink]="['gamelist']">gamelist</li>
            </ul>
            <div class="tabContent flexFull flexVertical">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})

export class ChatSideComponent {

}
