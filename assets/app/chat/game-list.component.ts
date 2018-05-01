import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { GameListService } from "./game-list.service";

import { Game } from "./game.model";

@Component({
    selector: 'game-list',
    host: {
        class: 'flexVertical flexFull'
    },
    templateUrl: './game-list.component.html',
    animations: [
        trigger('listElementState', [
            state('inactive', style({
                opacity: '0',
                height: '0',
                transform: 'scale(1)'
            })),
            state('active',   style({
                opacity: '1',
                height: '*',
                transform: 'scale(1)'
            })),
            transition('void => *', animate('0ms')),
            transition('inactive => active', animate('300ms ease-in')),
            transition('active => inactive', animate('300ms ease-out'))
        ])
    ]
})

export class GameListComponent implements OnInit {

    activeGame:Game;

    createGameForm:FormGroup;

    constructor(private gameListService:GameListService){}

    ngOnInit(): void {
        this.createGameForm = new FormGroup ({
            gameName: new FormControl(null, null)
        });

        this.gameListService.initServiceListening();
    }

    createGame() {
        this.gameListService.createGame(this.createGameForm.value.gameName);
        this.createGameForm.reset();
    }

    onClick() {
        console.log(this.gameListService.gameList);
        this.gameListService.getGames();
    }

    joinActiveGame(event) {
        this.gameListService.joinGame(this.activeGame.id);
        event.stopPropagation();
    }

    onSelect(selectedGame:Game) {
        selectedGame.toggleState();
        if(this.activeGame){
            if(this.activeGame.id === selectedGame.id) {
                this.activeGame = undefined;
            } else {
                this.activeGame.toggleState();
                this.activeGame = selectedGame;
            }
        } else {
            this.activeGame = selectedGame;
        }

        //Alte version
        // if( this.activeGame ?
        //     this.activeGame.id === game.id :
        //     false
        // ) {
        //     game.state = 'inactive';
        //     this.activeGame = undefined;
        // } else {
        //     if(this.activeGame){this.activeGame.state = 'inactive';}
        //     game.state = 'active';
        //     this.activeGame = game;
        // }
    }

    isSelected(game:Game): boolean {
        if(this.activeGame) {
            return this.activeGame.id === game.id;
        } else {
            return false;
        }
    }

}
