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

    constructor(private http: Http, private authService: AuthService) {}

    onTest() {
        console.log('check');
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
