import { Component } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    onTest() {
        console.log('check');
        this.http.patch('http://localhost:3000/shoutout/test', null, {headers: this.headers})
        .toPromise()
        .then(res => console.log(res))
        .catch(error => console.error(error));
    }

}
