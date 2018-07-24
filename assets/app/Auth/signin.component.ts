import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component ({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent {

    signinForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.signinForm = new FormGroup ({
            username: new FormControl (null, Validators.required),
            password: new FormControl (null, Validators.required)
        });
    }

    onSubmit() {
        var user;
        if(this.signinForm.value.username.indexOf('@') != -1){
            user = new User(this.signinForm.value.password, undefined, this.signinForm.value.username);
        } else {
            user = new User(this.signinForm.value.password, this.signinForm.value.username);
        }
        this.authService.signin(user)
            .then(data => {
                this.router.navigateByUrl('/');
            })
            .catch(err => console.error(err));
        this.signinForm.reset();
    }
}
