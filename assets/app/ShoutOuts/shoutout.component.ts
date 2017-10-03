import { Component, Input } from "@angular/core";

import { ShoutOut } from "./shoutout.model";
import { ShoutOutService } from "./shoutout.service";

@Component({
    selector: 'ShoutOut',
    templateUrl: './shoutout.component.html',
    styles: [ `
        .ShoutOut {
            border: 2px solid rgb(20,20,20);
            background-color: rgb(30,40,50);
            text-align: left;
        }

        .ShoutOutContent {
            border: 1px solid rgb(20,20,20);
            background-color: rgb(30,50,60);

            padding: 15px;
        }

        .ShoutOutFooter {
            display: flex;
            font-weight: lighter;
        }

        .ShoutOutAuthor {
            flex-grow: 1;
        }

        .ShoutOutButtons {
            flex-grow: 1;
            text-align: right;
        }

        .ShoutOutButtons a {
            padding-left: 10px;
            color: rgb(230,250,255);
        }
    `]
})

export class ShoutOutComponent {
    @Input() shoutout: ShoutOut;

    constructor(private shoutoutService: ShoutOutService) {}

    onEdit() {
        this.shoutoutService.editShoutOut(this.shoutout);
    }

    onDelete() {
        this.shoutoutService.deleteShoutOut(this.shoutout)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }
}
