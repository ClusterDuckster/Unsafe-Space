import { Component, OnInit } from "@angular/core";

import { ShoutOut } from "./shoutout.model"
import { ShoutOutService } from "./shoutout.service";

@Component ({
    selector: 'shoutout-list',
    host: {
        class: 'shoutoutList flexFull'
    },
    template: `
        <ShoutOut
            [shoutout]="shoutout"
            *ngFor="let shoutout of this.shoutoutService.shoutouts">
        </ShoutOut>

    `
})

export class ShoutOutListComponent implements OnInit{

    shoutouts: ShoutOut[];

    constructor(private shoutoutService: ShoutOutService) {}

    ngOnInit(): void {
        this.shoutoutService.getShoutOuts()
            .subscribe(shoutouts => {
                this.shoutouts = shoutouts;
            });
    }

}
