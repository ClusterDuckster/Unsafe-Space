import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { ShoutOutComponent } from "./ShoutOuts/shoutout.component";
import { ShoutOutListComponent } from "./ShoutOuts/shoutout-list.component";
import { ShoutOutInputComponent } from "./ShoutOuts/shoutout-input.component"
import { ShoutOutsComponent } from "./ShoutOuts/shoutouts.component";
import { AuthenticationComponent } from "./Auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./Auth/logout.component";
import { SigninComponent } from "./Auth/signin.component";
import { SignupComponent } from "./Auth/signup.component";
import { HomeComponent } from "./home.component";
import { HttpModule } from "@angular/http";

@NgModule({
    declarations: [
        AppComponent,
        ShoutOutComponent,
        ShoutOutListComponent,
        ShoutOutInputComponent,
        ShoutOutsComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [  BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                routing,
                HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
