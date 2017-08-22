import { Component } from "@angular/core";

@Component ({
    selector: 'shoutouts',
    host: {
        class: 'shoutouts flexVertical flexFull'
    },
    template: `
        <div>
            <h2>Shout Outs</h2>
        </div>
        
        <shoutout-input></shoutout-input>
        <shoutout-list></shoutout-list>
    `
})

export class ShoutOutsComponent {

}
