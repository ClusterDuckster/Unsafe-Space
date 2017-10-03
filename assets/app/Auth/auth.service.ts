import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { User } from "./user.model";

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private authUrl = 'http://localhost:3000/auth';

    constructor(private http: Http) {}

    signup(user: User){

        const body = JSON.stringify(user);

        return this.http.post(this.authUrl + '/signup', body, {headers: this.headers})
            .toPromise()
            .then((res: Response) => res.json())
            .catch((err: Response) => Promise.reject(err));
    }

    signin(user: User){

        const body = JSON.stringify(user);

        return this.http.post(this.authUrl + '/signin', body, {headers: this.headers})
            .toPromise()
            .then((res: Response) => res.json())
            .catch((err: Response) => Promise.reject(err));
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getUsername() {
        console.log(localStorage.getItem('username'));
        return localStorage.getItem('username');
    }

}
