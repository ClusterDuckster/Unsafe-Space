import { Routes } from "@angular/router";
import { SigninComponent } from "./Auth/signin.component";
import { SignupComponent } from "./Auth/signup.component";
import { LogoutComponent } from "./Auth/logout.component";

export const HOME_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent }
]
