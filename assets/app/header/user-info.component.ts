import { Component, Input, OnChanges } from "@angular/core";

import { AuthService } from "../Auth/auth.service";

@Component({
    selector: 'user-info',
    templateUrl: './user-info.component.html'
})

export class UserInfoComponent implements OnChanges{

    name = 'Anonymous';

    constructor(private authService: AuthService) {}

    ngOnChanges() {
        console.log('this.authService.getUsername');
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
