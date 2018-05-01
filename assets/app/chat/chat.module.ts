import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { chatRouting } from "./chat.routes";

import { ChatComponent } from "./chat.component";
import { ChatMessagesComponent } from "./chat-messages.component";
import { ChatRoomComponent } from "./chat-room.component";
import { ChatInputComponent } from "./chat-input.component";
import { ChatService } from "./chat.service";
import { ChatSideComponent } from "./chat-side.component";

import { GameListComponent } from "./game-list.component";
import { GameListService } from "./game-list.service";

@NgModule({
    declarations: [
        ChatComponent,
        ChatMessagesComponent,
        ChatRoomComponent,
        ChatInputComponent,
        ChatSideComponent,
        GameListComponent,
    ],
    providers: [
        ChatService,
        GameListService,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        chatRouting
    ]
})

export class ChatModule {

}
