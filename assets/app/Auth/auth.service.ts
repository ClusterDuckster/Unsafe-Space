import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { ErrorService } from "../error/error.service";
import { WebsocketService } from "../websocket.service";
import { ChatService } from "../chat/chat.service";

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private authUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        '/auth';
    // private authUrl = 'http://localhost:3000/auth';

    constructor(
        private http: Http,
        private websocketService: WebsocketService,
        private chatService: ChatService,
        private errorService:ErrorService,
        private router:Router
    ) {}

    signup(user: User){

        const body = JSON.stringify(user);

        return this.http.post(this.authUrl + '/signup', body, {headers: this.headers})
            .toPromise()
            .then((res: Response) => res.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Promise.reject(error.json());
            });
    }

    signin(user: User){

        const body = JSON.stringify(user);

        return this.http.post(this.authUrl + '/signin', body, {headers: this.headers})
            .toPromise()
            .then((res: Response) => res.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Promise.reject(error.json());
            });
    }

    logout(reroute:String){
        this.websocketService.disconnect();
        this.chatService.disconnect();
        localStorage.clear();
        this.router.navigate([reroute]);
    }

    isLoggedIn():boolean {
        return localStorage.getItem('token') !== null;
    }

    getUsername():string {
        return localStorage.getItem('username');
    }

    getRoom():string {
        return  localStorage.getItem('defRoom');
    }

}
