import  { Routes, RouterModule } from "@angular/router";

import { ShoutOutsComponent } from "./ShoutOuts/shoutouts.component";
import { AuthenticationComponent } from "./Auth/authentication.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChatComponent } from "./chat/chat.component";

import { HomeComponent } from "./home.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'shoutouts', component: ShoutOutsComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './Auth/auth.module#AuthModule' },
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'chat', component: ChatComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
