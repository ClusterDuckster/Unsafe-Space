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

    chatMessages: Array<ChatMessage> = [];
    curRoom: string;
    usersInRoom: Array<User> = [];

    initialized:boolean = false;
    serviceListeningInitialized:boolean = false;

    constructor(
        private websocketService:WebsocketService,
    ){}

    init() {
        if(!this.initialized) {
            //Connect to namespace 'chat'
            this.websocketService.connect('chat');
            //Initialize Rx Subjects
            this.observeMessages();
            this.observeRoomChanges();
            this.observeRoomJoins();
            this.observeRoomLeaves();
            this.initialized = true;
        }
    }

    initServiceListening(room:string) {
        if(!this.serviceListeningInitialized) {
            //this.serviceListenToChat();
            this.serviceListenToRoomJoin();
            this.serviceListenToRoomLeave();
            this.serviceListenToRoomChange();
            this.changeRoom(room);
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
            this.chatMessages.push(msg);
        });
    }

    serviceListenToRoomChange() {
        this.roomChangeSubject.subscribe( (data) => {
            var roomInfo = JSON.parse(data);
            this.curRoom = roomInfo.room;
            this.usersInRoom = roomInfo.usersInRoom;
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
        //console.log('send message!');
        //console.log(message);
    }

    changeRoom(room:string) {
        this.websocketService.sendSocketEvent('changeRoom', room);
        //console.log('changing room');
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
