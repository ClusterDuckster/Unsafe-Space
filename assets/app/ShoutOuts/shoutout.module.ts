import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ShoutOutComponent } from "./shoutout.component";
import { ShoutOutListComponent } from "./shoutout-list.component";
import { ShoutOutInputComponent } from "./shoutout-input.component"
import { ShoutOutsComponent } from "./shoutouts.component";
import { ShoutOutService } from "./shoutout.service";

@NgModule({
    declarations: [
        ShoutOutComponent,
        ShoutOutListComponent,
        ShoutOutInputComponent,
        ShoutOutsComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        ShoutOutService
    ],
    exports: [
        ShoutOutsComponent
    ]
})

export class ShoutoutModule {

}
