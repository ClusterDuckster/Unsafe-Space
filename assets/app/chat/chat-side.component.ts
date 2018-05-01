import { Component } from "@angular/core";

@Component ({
    selector: 'app-roomAndGameInfo',
    host: {
        class:'box flexVertical chatSide'
    },
    template: `
        <div class="flexFull flexVertical">
            <ul class="tabs">
                <li [ngClass]="{activeTab: content==='chatroom'}"
                    (click)="onChatroom()"
                >
                    chatroom
                </li>
                <li [ngClass]="{activeTab: content==='gamelist'}"
                    (click)="onGamelist()"
                >
                    gamelist
                </li>
            </ul>
            <div class="tabContent flexFull flexVertical" [ngSwitch]="content">
                <chat-room *ngSwitchCase="'chatroom'"></chat-room>
                <game-list *ngSwitchCase="'gamelist'"></game-list>
            </div>
        </div>
    `
})

export class ChatSideComponent {
    content:String = 'chatroom';

    onChatroom() {
        this.content = 'chatroom';
    }

    onGamelist() {
        this.content = 'gamelist';
    }
}
