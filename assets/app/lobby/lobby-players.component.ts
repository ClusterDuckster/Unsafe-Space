import { Component, Input, OnInit } from "@angular/core";

import { AuthService } from "../Auth/auth.service";
import { LobbyService } from "./lobby.service";

import { Game } from "./game.model";
import { Player } from "./player.model";

@Component({
    selector: 'lobby-players',
    host: {
        class:'flexFull flexVertical box lobbySettings'
    },
    templateUrl: './lobby-players.component.html'
})

export class LobbyPlayersComponent implements OnInit {

    @Input() game:Game;
    private playerList:Player[];

    constructor(
        private authService:AuthService,
        private lobbyService:LobbyService
    ){}

    ngOnInit() {
        
    }

}
