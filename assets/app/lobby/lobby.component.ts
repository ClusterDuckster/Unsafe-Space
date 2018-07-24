import { Component, OnInit } from "@angular/core";

import { AuthService } from "../Auth/auth.service";
import { LobbyService } from "./lobby.service";

import { Game } from "./game.model";
import { Player } from "./player.model";

@Component({
    selector: 'app-lobby',
    host: {
        class:'flexFull flexVertical box lobby'
    },
    templateUrl: './lobby.component.html'
})

export class LobbyComponent implements OnInit {

    private game:Game;

    constructor(
        private authService:AuthService,
        private lobbyService:LobbyService
    ){}

    ngOnInit() {
        if(!this.game){
            let gameId = this.authService.getCurGame();
            this.lobbyService.getGameById(gameId)
                .then((game) => {
                    this.game = game;
                    console.log(game);
                });
        }
    }

}
