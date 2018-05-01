import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as Rx from 'rxjs/Rx';

import { ErrorService } from "./error/error.service";

@Injectable()
export class WebsocketService {

    private url =
        window.location.protocol +
        '//' +
        window.location.host +
        '/';
    // private url = 'http://localhost:3000/';
    private socket;

    constructor(private errorService:ErrorService) {}

    connect(namespace:string): void {
        //If namespaces not equal or no socket exists: create new socket
        if( this.socket ?
            this.socket.nsp.substring(1) !== namespace :
            true
        ) {
            this.socket = io(
                this.url+namespace,
                {
                    query: 'token='+localStorage.getItem('token')
                }
            );
            this.socket.on('error', (err) => {
                this.errorService.handleError(JSON.parse(err));
                throw new Error(err);
            });
        }
    }

    disconnect(): void {
        if(this.socket) {
            this.socket.disconnect();
            this.socket = undefined;
        }
    }

    listenToSocketEvent(
        eventName:string,
        callback:(data) => any
    ): Rx.Subject<Event> {

        let observable = new Observable(observer => {
            this.socket.on(eventName, (data) => {
                //console.log('message a troi');
                callback(data);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });

        let observer:Observer<Object> = {
            next: (data: Object) => {
                return data;
            },
            error: (err: any) => {
                this.errorService.handleAnyError({
                    title: 'Observer Error',
                    error: err
                });
                throw new Error(err);
            },
            complete: () => {
                console.log('Websocket-Observable completed?! This should not happen');
            }
        };

        return Rx.Subject.create(observer, observable);;
    }

    sendSocketEvent(
        eventName:String,
        eventContent:any
    ) {
        this.socket.emit(eventName, eventContent);
    }

}
