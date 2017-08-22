import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component ({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent {

    signinForm: FormGroup;

    ngOnInit(): void {
        this.signinForm = new FormGroup ({
            //username or email
            username: new FormControl (null, Validators.required),
            password: new FormControl (null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signinForm);
        this.signinForm.reset();
    }
}
