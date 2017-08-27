import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";

import { User } from "./user.model";

@Component ({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

    constructor(private authService: AuthService) {}

    signupForm: FormGroup;

    ngOnInit(): void {
        this.signupForm = new FormGroup ({
            username: new FormControl (null, Validators.required),
            email: new FormControl (null, Validators.required),
            password: new FormControl (null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(
            this.signupForm.value.username,
            this.signupForm.value.email,
            this.signupForm.value.password
        );
        this.authService.signup(user)
            .then( res => console.log(res) )
            .catch( err => console.error(err._body) );
        this.signupForm.reset();
    }

}
