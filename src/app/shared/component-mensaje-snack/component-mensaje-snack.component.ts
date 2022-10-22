import { Component, Inject } from "@angular/core";
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-component-mensaje-snack",
  templateUrl: "./component-mensaje-snack.component.html",
  styleUrls: ["./component-mensaje-snack.component.scss"],
})
export class ComponentMensajeSnackComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ComponentMensajeSnackComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
