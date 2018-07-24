import { Component, Input, OnInit } from "@angular/core";

import { AuthService } from "../Auth/auth.service";
import { LobbyService } from "./lobby.service";

import { Game } from "./game.model";

@Component({
    selector: 'lobby-settings',
    host: {
        class:'flexVertical box lobbySettings'
    },
    templateUrl: './lobby-settings.component.html'
})

export class LobbySettingsComponent implements OnInit {

    @Input() game:Game;

    constructor(
        private authService:AuthService,
        private lobbyService:LobbyService
    ){}

    ngOnInit() {

    }

}
