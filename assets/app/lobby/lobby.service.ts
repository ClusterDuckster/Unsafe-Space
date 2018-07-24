import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

import { ErrorService } from "../error/error.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Game } from "./game.model";
import { Player } from "./player.model";

@Injectable()

export class LobbyService {

    public game:Game;

    initialized:boolean = false;

    private gameUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        '/game';

    constructor(
        private http:Http,
        private errorService:ErrorService
    ){}

    initLobby() {
        if(!this.initialized) {

            this.initialized = true;
        }
    }

    getGameById(gameId:string):Promise<Game> {
        if(this.game ? this.game.id !== gameId : true){
            const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

            return this.http.get(this.gameUrl + '/' + gameId + token)
                .toPromise()
                .then(res => {
                    const result = res.json();
                    const game = result.game;

                    this.game = new Game(
                        game._id,
                        game.name,
                        game.maxPlayers,
                        game.settings.map,
                        result.players
                    );
                    
                    return this.game;
                })
                .catch((error) => {
                    console.log(error.json());
                    this.errorService.handleError(error.json());
                });
        } else {
            return new Promise( (resolve) => {
                resolve(this.game);
            });
        }
    }

}
