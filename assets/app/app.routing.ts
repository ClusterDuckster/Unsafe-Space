import  { Routes, RouterModule } from "@angular/router";

import { ShoutOutsComponent } from "./ShoutOuts/shoutouts.component";
import { AuthenticationComponent } from "./Auth/authentication.component";
import { ProfileComponent } from "./profile/profile.component";

import { AUTH_ROUTES } from "./Auth/auth.routes";
import { HOME_ROUTES } from "./home.routes";
import { HomeComponent } from "./home.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'shoutouts', component: ShoutOutsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'home', component: HomeComponent, children: HOME_ROUTES },
    { path: 'profile', component: ProfileComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
