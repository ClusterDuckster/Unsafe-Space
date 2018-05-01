import { Component, OnInit} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../Auth/auth.service";
import { ChatService } from "./chat.service";
import { ChatMessage } from "./chatMessage.model";

@Component({
    selector: 'chat-room',
    host: {
        class: 'flexFull flexVertical box chatRoom'
    },
    templateUrl: './chat-room.component.html'
})

export class ChatRoomComponent implements OnInit{

    // curRoom:string;
    // usernames:Array<string>;
    roomForm: FormGroup;

    constructor(
        private chatService:ChatService,
        private authService:AuthService
    ){}

    ngOnInit(): void {
        this.roomForm = new FormGroup ({
            room: new FormControl(null, null)
        });

        //Lets the chatService listen on changes in the room
        this.chatService.initServiceListening(this.authService.getRoom());

        // this.chatService.roomChangeSubject.subscribe( (data) => {
        //     var roomInfo = JSON.parse(data);
        //     this.curRoom = roomInfo.room;
        //     this.usernames = roomInfo.usersInRoom;
        //     console.log(roomInfo);
        // });
    }

    onSubmit() {
        this.chatService.changeRoom(this.roomForm.value.room);
        this.roomForm.reset();
    }

}
