import { Injectable } from "@angular/core";

import { Observable, Subject } from 'rxjs/Rx';

import { LobbyService } from "../lobby/lobby.service";
import { AuthService } from "../Auth/auth.service";
import { WebsocketService } from "../websocket.service";

import { Game } from "./game.model";

@Injectable()

export class GameListService {

    joinedGameSubject:Subject<any>;
    createdGameSubject:Subject<any>;
    gameListSubject:Subject<any>;
    newGameSubject:Subject<any>;
    removedGameSubject:Subject<any>;

    gameList:Array<Game> = [];

    initialized:boolean = false;
    serviceListeningInitialized:boolean = false;

    constructor(
        private lobbyService:LobbyService,
        private authService:AuthService,
        private websocketService:WebsocketService
    ){}

    init() {
        if(!this.initialized) {
            this.observeJoinedGame();
            this.observeCreatedGame();
            this.observeGameList();
            this.observeNewGame();
            this.observeRemovedGame();

            this.initialized = true;
        }
    }

    initServiceListening() {
        if(!this.serviceListeningInitialized) {
            this.serviceListenToJoinedGame();
            this.serviceListenToGameList();
            this.serviceListenToCreatedGame();
            this.serviceListenToNewGame();
            this.serviceListenToRemovedGame();

            this.getGames();

            this.serviceListeningInitialized = true;
        }
    }

    joinGame(gameId:string){
        this.websocketService.sendSocketEvent('joinGame', gameId);
    }

    createGame(gameName:string) {
        this.websocketService.sendSocketEvent('createGame', gameName);
    }

    getGames() {
        this.websocketService.sendSocketEvent('getGames', null);
    }

    serviceListenToGameList() {
        this.gameListSubject.subscribe((gameList) => {
            var serverGameList = JSON.parse(gameList);
            this.gameList = [];
            for(var i=0; i<serverGameList.length; i++) {
                this.gameList.push(new Game(
                    serverGameList[i].id,
                    serverGameList[i].name,
                    serverGameList[i].maxPlayers,
                    serverGameList[i].curPlayers
                ));
            }
        });
    }

    serviceListenToJoinedGame() {
        this.joinedGameSubject.subscribe( (gameId) => {
            var userdata = JSON.parse(localStorage.getItem('userdata'));
            userdata.curGame = gameId;
            localStorage.setItem('userdata', JSON.stringify(userdata));
            console.log('TODO: redirect to Lobby');
            console.log(gameId);
        });
    }

    serviceListenToCreatedGame() {
        this.createdGameSubject.subscribe((game) => {
            console.log('Created Game');
            console.log(game);
            this.joinGame(game._id);
        });
    }

    serviceListenToNewGame() {
        this.newGameSubject.subscribe((game) => {
            this.gameList.push(game);
        });
    }

    serviceListenToRemovedGame() {
        this.removedGameSubject.subscribe((game) => {
            var index = this.gameList.map((e)=>{return e.id;}).indexOf(game.id);
            this.gameList.splice(index, 1);
        });
    }

    observeJoinedGame() {
        this.joinedGameSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'joinedGame',
            function(data) {
                // console.log('passing message through chat service');
            }
        );
    }

    observeCreatedGame() {
        this.createdGameSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'createdGame',
            function(data) {
                // console.log('passing message through chat service');
            }
        );
    }

    observeGameList() {
        this.gameListSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'gameList',
            function(data) {
                // console.log('got gameList');
            }
        );
    }

    observeNewGame() {
        this.newGameSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'createdGame',
            function(data) {
                // console.log('passing message through chat service');
            }
        );
    }

    observeRemovedGame() {
        this.removedGameSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'removedGame',
            function(data) {
                // console.log('passing message through chat service');
            }
        );
    }
}
