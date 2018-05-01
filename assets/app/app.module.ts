import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoutoutModule } from "./ShoutOuts/shoutout.module";
import { ChatModule } from "./chat/chat.module";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { WebsocketService } from "./websocket.service";
import { ErrorComponent } from "./error/error.component";
import { ErrorService } from "./error/error.service";

import { HomeComponent } from "./home.component";
import { WelcomeComponent } from "./welcome.component";

import { AuthenticationComponent } from "./Auth/authentication.component";
import { AuthService } from "./Auth/auth.service";

import { HeaderComponent } from "./header/header.component";
import { UserInfoComponent } from "./header/user-info.component";

import { ProfileComponent } from "./profile/profile.component";


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        HomeComponent,
        UserInfoComponent,
        ProfileComponent,
        ErrorComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule,
        BrowserAnimationsModule,
        ShoutoutModule,
        ChatModule
    ],
    providers: [
        AuthService,
        WebsocketService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
