import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ValidationService } from "../validation.service";

@Component({
  selector: "app-control-messages",
  template: `
    <mat-error *ngIf="errorMessage !== null">{{ errorMessage }}</mat-error>
  `,
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
