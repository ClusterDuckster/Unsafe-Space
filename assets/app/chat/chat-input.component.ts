import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../Auth/auth.service";
import { ChatService } from "./chat.service";
import { ChatMessage } from "./chatMessage.model";

@Component({
    selector: 'chat-input',
    host: {
        class: 'chatInput'
    },
    templateUrl: './chat-input.component.html'
})

export class ChatInputComponent implements OnInit, AfterViewInit {

    @Input() chatId:string;

    @ViewChild('chatInput') chatInput:ElementRef;
    chatMessageForm: FormGroup;

    constructor(
        private chatService:ChatService,
        private authService:AuthService
    ){}

    ngOnInit(): void {
        this.chatMessageForm = new FormGroup ({
            message: new FormControl(null, null)
        });
    }

    ngAfterViewInit(): void {
        this.chatInput.nativeElement.focus();
    }

    onSubmit() {
        let msg:ChatMessage = new ChatMessage(
            this.chatMessageForm.value.message,
            this.authService.getUsername(),
            this.chatId
        );
        this.chatService.sendMessage(msg);
        this.chatMessageForm.reset();
    }

}
