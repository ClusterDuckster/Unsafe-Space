import { Component } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { AuthService } from "../Auth/auth.service";

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private authService: AuthService
    ) {}

    onTest() {
        console.log(this.getCurGame());
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isIngame() {
        return JSON.parse(localStorage.getItem('userdata')).curGame ? true : false;
    }

    getCurGame() {
        return JSON.parse(localStorage.getItem('userdata')).curGame;
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

}
