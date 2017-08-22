import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { ShoutOut } from "./shoutout.model";

@Injectable ()

export class ShoutOutService {
    private shoutouts: ShoutOut[] = [];
    shoutoutIsEdit = new EventEmitter<ShoutOut>();

    private headers = new Headers({'Content-Type': 'application/json'});
    private shoutoutUrl = 'http://localhost:3000/shoutout';

    constructor(private http: Http) {}

    //Promises for getting one package back
    //Observables for getting back a stream or request-cancel-new-request sequences

    addShoutOut(shoutout: ShoutOut): Promise<ShoutOut> {
            const body = JSON.stringify(shoutout);
            return this.http.post(this.shoutoutUrl, body, {headers: this.headers})
                .toPromise()
                .then(res => {
                    const result = res.json();
                    const newShoutout = new ShoutOut(result.object.content, 'Dummy', result.object._id, null);
                    this.shoutouts.unshift(newShoutout);
                    return newShoutout;
                })
                .catch(error => Promise.reject(error.json()));
    }

    //Observable example:
    /*
    addShoutOut(shoutout: ShoutOut): Observable<JSON> {
        this.shoutouts.push(shoutout);
        const body = JSON.stringify(shoutout);
        return this.http.post('http://localhost:3000/shoutout', body)
            .map(response => response.json() as JSON)
            .catch(error => Observable.throw(error.json()));
    }
    */

    getShoutOuts(): Observable<ShoutOut[]> {
        return this.http.get(this.shoutoutUrl)
            .map(res => {
                const shoutouts = res.json().objects;
                let transformedShoutouts: ShoutOut[] = [];
                for (let shoutout of shoutouts) {
                    //unshift to put the latest shoutouts to the top
                    transformedShoutouts.unshift(new ShoutOut(shoutout.content, 'Dummy', shoutout._id, null ));
                }
                this.shoutouts = transformedShoutouts;
                return transformedShoutouts;
            })
            .catch(error => Observable.throw(error.json()));
    }

    deleteShoutOut(shoutout: ShoutOut) {
        return this.http.delete(this.shoutoutUrl + '/' + shoutout.shoutoutId, {headers: this.headers})
            .toPromise()
            .then(res => {
                this.shoutouts.splice(this.shoutouts.indexOf(shoutout), 1);
                return res.json() as JSON;
            })
            .catch(error => Promise.reject(error.json()));
    }

    editShoutOut(shoutout: ShoutOut) {
        this.shoutoutIsEdit.emit(shoutout);
    }

    updateShoutOut(shoutout: ShoutOut) {
        const body = JSON.stringify(shoutout);
        return this.http.patch(this.shoutoutUrl + '/' + shoutout.shoutoutId, body, {headers: this.headers})
            .toPromise()
            .then(res => {
                return res.json() as JSON;
            })
            .catch(error => Promise.reject(error.json()));
    }

}
