import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from "@angular/core";
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

export class ShoutOutInputComponent implements OnInit, AfterViewInit {

    @ViewChild("shoutoutInput") shoutoutInput: ElementRef;
    shoutout: ShoutOut;

    constructor(private shoutoutService: ShoutOutService){}

    ngOnInit(): void {
        this.shoutoutService.shoutoutIsEdit.subscribe(
            (shoutout: ShoutOut) => {
                this.shoutout = shoutout;
            }
        );
    }

    ngAfterViewInit(): void {
        this.shoutoutInput.nativeElement.focus();
    }

    onSubmit( form: NgForm ) {
        if(this.shoutout) {
            //Edit
            //Shallow copy of shoutout Object
            let updatedShoutout = Object.assign({}, this.shoutout);
            updatedShoutout.content = form.value.content;
            this.shoutoutService.updateShoutOut(updatedShoutout)
                .then(
                    data => {
                        this.shoutout.content = updatedShoutout.content;
                        console.log(data);
                        this.shoutout = null;
                    }
                )
                .catch(
                    error => {
                        console.error(error);
                        this.shoutout = null;
                    }
                );
        } else {
            //Create
            const shoutout = new ShoutOut(form.value.content, 'Dummy');
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
