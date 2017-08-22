import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component ({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    ngOnInit(): void {
        this.signupForm = new FormGroup ({
            username: new FormControl (null, Validators.required),
            email: new FormControl (null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl (null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signupForm);
        this.signupForm.reset();
    }

}
