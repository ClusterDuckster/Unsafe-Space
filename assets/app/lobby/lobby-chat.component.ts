import { Component, OnInit } from "@angular/core";

import { LobbyService } from "./lobby.service";
import { ChatService } from "../chat/chat.service";

@Component({
    selector: 'lobby-chat',
    host: {
        class:'flexFull flexVertical box lobbyChat'
    },
    templateUrl: './lobby-chat.component.html'
})

export class LobbyChatComponent implements OnInit {

    private chatId = 'lobby';

    constructor(
        private chatService:ChatService
    ){}

    ngOnInit() {
        this.chatService.init();
    }

}
