import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChatModule } from "../chat/chat.module";

import { LobbyComponent } from "./lobby.component";
import { LobbyPlayersComponent } from "./lobby-players.component";
import { LobbyChatComponent } from "./lobby-chat.component";
import { LobbySettingsComponent } from "./lobby-settings.component";

import { LobbyService } from "./lobby.service";

@NgModule({
    declarations: [
        LobbyComponent,
        LobbyPlayersComponent,
        LobbyChatComponent,
        LobbySettingsComponent
    ],
    providers: [
        LobbyService
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ChatModule
    ]
})

export class LobbyModule {

}
