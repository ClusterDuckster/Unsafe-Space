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

    roomForm: FormGroup;

    constructor(
        private chatService:ChatService,
        private authService:AuthService
    ){}

    ngOnInit(): void {
        this.roomForm = new FormGroup ({
            room: new FormControl(null, null)
        });

        //Joins room on initializing
        this.chatService.changeRoom(this.authService.getRoom());
    }

    onSubmit() {
        this.chatService.changeRoom(this.roomForm.value.room);
        this.roomForm.reset();
    }

}
