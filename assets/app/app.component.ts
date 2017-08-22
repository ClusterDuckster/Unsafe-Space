import { Component } from '@angular/core';

import { ShoutOutService } from "./ShoutOuts/shoutout.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [ShoutOutService]
})
export class AppComponent {

}
