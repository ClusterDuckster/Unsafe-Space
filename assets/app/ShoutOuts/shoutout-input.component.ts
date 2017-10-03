import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ShoutOutService } from "./shoutout.service";
import { ShoutOut } from "./shoutout.model";

@Component({
    selector: 'shoutout-input',
    templateUrl: 'shoutout-input.component.html',
    styles: [`
        .inputBox {
            padding-top: 0px;
            margin-top: 0px;
        }
    `]
})

export class ShoutOutInputComponent implements OnInit {

    shoutout: ShoutOut;

    constructor(private shoutoutService: ShoutOutService){}

    ngOnInit(): void {
        this.shoutoutService.shoutoutIsEdit.subscribe(
            (shoutout: ShoutOut) => {
                this.shoutout = shoutout;
            }
        );
    }

    onSubmit( form: NgForm ) {
        if(this.shoutout) {
            //Edit
            this.shoutoutService.updateShoutOut(this.shoutout)
                .then(
                    data => {
                        this.shoutout.content = form.value.content;
                        console.log(data);
                    }
                )
                .catch(error => console.error(error));
            this.shoutout = null;
        } else {
            //Create
            const shoutout = new ShoutOut(form.value.content, 'Olli');
            this.shoutoutService.addShoutOut(shoutout)
                .then(
                    data => console.log(data)
                )
                .catch(error => console.error(error));
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        form.resetForm();
        this.shoutout = null;
    }
}
