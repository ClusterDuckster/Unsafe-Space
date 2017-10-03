import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-profile',
    host: {
        class: 'flexVertical flexFull profile'
    },
    templateUrl: './profile.component.html'
})

export class ProfileComponent {

    @Input() userID;

}
