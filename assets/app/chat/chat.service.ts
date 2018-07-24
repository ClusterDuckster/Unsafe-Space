import { Injectable } from "@angular/core";

import { Observable, Subject } from 'rxjs/Rx';

import { WebsocketService } from '../websocket.service';
import { ChatMessage } from "./chatMessage.model";
import { User } from "./user.model";

@Injectable()

export class ChatService {

    chatMessageSubject: Subject<any>;
    roomChangeSubject: Subject<any>;
    roomJoinSubject: Subject<any>;
    roomLeaveSubject: Subject<any>;

    //Chatrooms
    chatMessages: Array<ChatMessage> = [];
    curRoom: string;
    usersInRoom: Array<User> = [];

    //Lobby Chat
    lobbyChatMessages: Array<ChatMessage> = [];

    initialized:boolean = false;
    serviceListeningInitialized:boolean = false;

    constructor(
        private websocketService:WebsocketService,
    ){}

    //Initializing the rx Subjects
    init() {
        if(!this.initialized) {
            //Connect to namespace 'chat'
            if(this.websocketService.connect('chat')){
                //Initialize Rx Subjects
                this.observeMessages();
                this.observeRoomChanges();
                this.observeRoomJoins();
                this.observeRoomLeaves();
                this.initialized = true;
            }
        }
    }

    //let the Service listen to its own subjects
    initServiceListening() {
        if(!this.serviceListeningInitialized) {
            this.serviceListenToChat();
            this.serviceListenToRoomJoin();
            this.serviceListenToRoomLeave();
            this.serviceListenToRoomChange();
            this.serviceListeningInitialized = true;
        }
    }

    disconnect() {
        this.initialized = false;
        this.serviceListeningInitialized = false;
        this.chatMessages = [];
        this.curRoom = undefined;
        this.usersInRoom = [];
    }

    serviceListenToChat() {
        this.chatMessageSubject.subscribe( (msg) => {
            switch(msg.chatId) {
                case "chat": {
                    this.chatMessages.push(msg);
                }
                case "lobby": {
                    this.lobbyChatMessages.push(msg);
                }
            }
        });
    }

    serviceListenToRoomChange() {
        this.roomChangeSubject.subscribe( (data) => {
            var roomInfo = JSON.parse(data);
            this.curRoom = roomInfo.room;
            this.usersInRoom = roomInfo.usersInRoom;
            //Update localStorage userdata
            var userdata = JSON.parse(localStorage.getItem('userdata'));
            userdata.curRoom = this.curRoom;
            localStorage.setItem('userdata', JSON.stringify(userdata));
        });
    }

    serviceListenToRoomJoin() {
        this.roomJoinSubject.subscribe( (user) => {
            this.usersInRoom.push(user);
        });
    }

    serviceListenToRoomLeave() {
        this.roomLeaveSubject.subscribe( (user) => {
            var index = this.usersInRoom.map((e)=>{return e.id;}).indexOf(user.id);
            if(index !== -1){ this.usersInRoom.splice(index, 1); }
        });
    }

    sendMessage(message:ChatMessage) {
        this.websocketService.sendSocketEvent('chatMessage', message);
    }

    changeRoom(room:string) {
        this.websocketService.sendSocketEvent('changeRoom', room);
    }

    joinLobbyChat(id:string) {
        this.websocketService.sendSocketEvent('joinLobbyChat', id);
    }

    //===================================
    // Initializing Rx Subjects =========
    //===================================

    observeMessages() {
        this.chatMessageSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'chatMessage',
            function(data) {
                // console.log('passing message through chat service');
            }
        );
    }

    observeRoomChanges() {
        this.roomChangeSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'joinedRoom',
            function(data) {
                // console.log('passing roominfo through chat service');
            }
        );
    }

    observeRoomJoins() {
        this.roomJoinSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'userJoinedRoom',
            function(data) {
                // console.log('passing joining userinfo through chat service');
            }
        );
    }

    observeRoomLeaves() {
        this.roomLeaveSubject = <Subject<any>>this.websocketService
        .listenToSocketEvent(
            'userLeftRoom',
            function(data) {
                // console.log('passing leaving userinfo through chat service');
            }
        );
    }

}
