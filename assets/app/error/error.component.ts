import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../Auth/auth.service";
import { ErrorService } from "./error.service";
import { Error } from "./error.model";

@Component ({
    selector: 'app-error',
    templateUrl: './error.component.html',
    host: {
        class: ''
    },
    styles: [`
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content/Box */
        .modalContent {
            background-color: var(--third-bg-color);
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            padding-bottom: 50px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
        }

        .errorBody {
            margin-left: calc(var(--main-margin)*2);
        }
        `]
})

export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(
        private errorService:ErrorService,
        private router:Router,
        private authService:AuthService
    ){}

    ngOnInit() {
        this.errorService.errorOcured
            .subscribe((error: Error) => {
                this.error = error;
                this.display = 'block';
            });
    }

    onClose() {
        this.display = 'none';
        switch(this.error.title){
            case 'Authentication error':
                this.authService.logout('/auth/signin');
        }
    }
}
