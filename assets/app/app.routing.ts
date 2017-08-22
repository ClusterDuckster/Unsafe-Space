import  { Routes, RouterModule } from "@angular/router";

import { ShoutOutsComponent } from "./ShoutOuts/shoutouts.component";
import { AuthenticationComponent } from "./Auth/authentication.component";

import { AUTH_ROUTES } from "./Auth/auth.routes";
import { HOME_ROUTES } from "./home.routes";
import { HomeComponent } from "./home.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'shoutouts', pathMatch: 'full' },
    { path: 'shoutouts', component: ShoutOutsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'home', component: HomeComponent, children: HOME_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
