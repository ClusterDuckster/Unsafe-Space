import { Component, OnInit } from "@angular/core";

import { ChatService } from "./chat.service";
import { GameListService } from "./game-list.service";

@Component({
    selector: 'app-chat',
    host: {
        class: 'flexVertical flexFull box chat'
    },
    templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {

    constructor(private chatService: ChatService, private gameListService:GameListService) {}

    ngOnInit(): void {
        this.chatService.init();
        this.gameListService.init();
    }

}
