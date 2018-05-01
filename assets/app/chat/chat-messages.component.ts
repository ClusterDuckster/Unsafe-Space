import { Component, OnInit } from "@angular/core";

import { ChatMessage } from "./chatMessage.model";
import { ChatService } from "./chat.service";

@Component({
    selector: 'chat-messages',
    host: {
        class: 'flexVertical flexFull'
    },
    templateUrl: './chat-messages.component.html'
})

export class ChatMessagesComponent implements OnInit{

    //chatMessages: Array<Object> = [];

    constructor(private chatService: ChatService){}

    ngOnInit() {
        // Let the chatService save chatMessages,
        // so they are preserved when switching components

        // this.chatService.chatMessageSubject.subscribe( (msg) => {
        //     this.chatMessages.push(msg);
        // });
    }

}
